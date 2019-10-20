import os
import random
import re
import sys
from threading import Semaphore

import psycopg2
from psycopg2.extras import execute_batch

import environment
from utils.enumutil import TOSRegion

STORAGE_TABLE = '__storage__'
STORAGE_KEY_VERSION = 'tos-parser/version'

semaphore = Semaphore(30)
pool = None


def cursor(schema):
    connection = Connection()
    cursor = connection.cursor()
    cursor.execute("SET SCHEMA '%(schema)s'" % { 'schema': schema })

    return connection, cursor


def execute(query, vars):
    connection = Connection()
    connection.autocommit = True

    cursor = connection.cursor()
    cursor.execute(query, vars)
    result = cursor.fetchall() if cursor.description else None

    cursor.close()
    connection.close()

    return result


# More information: http://initd.org/psycopg/docs/extras.html#fast-execution-helpers
def executemany(cursor, query, values):
    if len(values) == 0:
        return

    stmt = 'stmt_%s' % random.randrange(sys.maxint)

    cursor.execute('PREPARE ' + stmt + ' AS ' + query)
    execute_batch(cursor, 'EXECUTE ' + stmt + ' (' + ','.join(['%s' for i in values[0]]) + ')', values)
    cursor.execute('DEALLOCATE ' + stmt)


# Same as tos-web-server/service/database-service.ts > sanitize
def sanitize(param):
    return re.sub(r'[^a-zA-Z0-9_]+', '_', param)  # Remove suspicious characters to prevent SQL injection


# Same as tos-web-server/service/database-service.ts > schema
def schema(region):
    return ('%(region)s' % {
        'region': TOSRegion.to_string(region)
    }).lower()


def storage_init(schema):
    execute("CREATE TABLE IF NOT EXISTS %(schema)s.%(table)s (key TEXT PRIMARY KEY, value TEXT)" % { 'schema': schema, 'table': STORAGE_TABLE }, None)


def storage_get(schema, key):
    storage_init(schema)
    return execute("SELECT value FROM %(schema)s.%(table)s " % { 'schema': schema, 'table': STORAGE_TABLE } + "WHERE key=%s", [key])


def storage_set(schema, key, value):
    storage_init(schema)
    execute("INSERT INTO %(schema)s.%(table)s VALUES " % { 'schema': schema, 'table': STORAGE_TABLE } + "(%s, %s) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value", [key, value])


# Same as tos-web-server/service/database-service.ts > tableName
def table_name(table):
    table = os.path.basename(table).split('.')[0]
    table = re.sub(r'-', '_', table)
    table = table.replace('statbase', 'stat')
    table = sanitize(table)

    return table.lower()


class Connection(object):
    def __init__(self):
        global semaphore

        postgres = environment.postgres()
        semaphore.acquire()

        self._cursor = None
        self._connection = psycopg2.connect(
            dbname=postgres['database'],
            host=postgres['host'],
            user=postgres['username'],
            password=postgres['password']
        )

    @property
    def autocommit(self):
        return self._connection.autocommit

    @autocommit.setter
    def autocommit(self, value):
        self._connection.autocommit = value

    def close(self):
        global semaphore

        if self._cursor:        self._cursor.close()
        if self._connection:    self._connection.close()

        self._cursor = None
        self._connection = None
        semaphore.release()

    def cursor(self):
        self._cursor = self._cursor if self._cursor else self._connection.cursor()

        return self._cursor
