import csv
import datetime
import logging
import multiprocessing
import os
import shutil
import threading

import constants
from parserr import parser_ies, parser_assets
from patcherr import patcher_ipf, patcher_pak
from utils import pgutil, listutil, fileutil, jsonutil

META_TABLE = '__meta__'
META_KEY_VERSION = 'tos-parser/version'

threads = []
threads_error = False
threads_semaphore = threading.Semaphore(multiprocessing.cpu_count() * 2)


def parse(region, update):
    global threads_error, threads, threads_semaphore

    # Initialize csv dialects
    csv.register_dialect('ies', delimiter=',', doublequote=False, escapechar=None, lineterminator='\r\n', quotechar='"', quoting=csv.QUOTE_MINIMAL, skipinitialspace=False)
    csv.register_dialect('tsv', delimiter='\t', doublequote=False, escapechar=None, lineterminator='\r\n', quotechar='', quoting=csv.QUOTE_NONE, skipinitialspace=False)

    # Initialize schema
    schema = pgutil.schema(region)
    pgutil.execute('CREATE SCHEMA IF NOT EXISTS %(schema)s' % { 'schema': schema }, None)

    # Initialize version
    version_data, version_release = version_read(schema)
    version_data_list = [TOSVersion(file) for file in fileutil.walk(constants.PATH_INPUT_PATCH_DATA_PARTIAL, '*.ipf')]
    version_release_list = [TOSVersion(file) for file in fileutil.walk(constants.PATH_INPUT_PATCH_RELEASE, '*.pak')]

    # Update data to the latest version, one version at a time
    for version_data_new in version_data_list:
        if version_data_new <= version_data:
            continue

        # Patch the full game (in case it's the first time we're running)
        ies_list = []

        if version_data is None:
            shutil.rmtree(constants.PATH_INPUT_DATA)

            for ipf in [file for file in fileutil.walk(constants.PATH_INPUT_PATCH_DATA_FULL, '*.ipf')]:
                for ies in [ies for ies in patcher_ipf.unpack(ipf) if ies.endswith('.ies')]:
                    ies_list.append(ies)

        # Update data
        version_data = version_data_new
        version_data_next = version_data_list.index(version_data)
        version_data_next = version_data_list[version_data_next + 1] if version_data_next + 1 < len(version_data_list) else None

        for ies in [ies for ies in patcher_ipf.unpack(version_data.version) if ies.endswith('.ies')]:
            ies_list.append(ies)

        # Update release to the corresponding version (i.e. right before the next data version)
        for version_release_new in version_release_list:
            if version_release_new <= version_release:
                continue
            if version_release_new >= version_data_next:
                break

            version_release = version_release_new

            patcher_pak.unpack(version_release.version)

        # If nothing changed, continue
        if ies_list:

            # Parse each extracted ies
            threads = []

            for ies in parse_ies_list(ies_list):
                threads_semaphore.acquire()
                thread = ParseThread(ies, schema, version_data.version, version_data.modified)
                thread.start()
                threads.append(thread)

            # Wait for all threads to finish
            for thread in threads:
                thread.join()

            if threads_error:
                break

        # Save new version
        version_write(schema, version_data, version_release)

    if threads_error:
        raise Exception

    # Parse assets
    parser_assets.parse(region, update)


def parse_ies_list(ies_list):
    # HotFix: ignore broken files
    # HotFix: ignore duplicate files (e.g. smartgen are located in ies_mongen and ies_mongen/smartgen)
    ies_list = [ies for ies in ies_list if os.path.basename(ies) not in ['loadingfaq.ies', 'sessionobject_main.ies']]
    ies_list = listutil.unique(ies_list, lambda x: os.path.basename(x))

    return ies_list


def version_read(schema):
    version = pgutil.storage_get(schema, pgutil.STORAGE_KEY_VERSION)
    version = jsonutil.loads(version[0][0]) if version else None

    if version is None:
        return None, None

    return version['version_data'], version['version_release']


def version_write(schema, version_data, version_release):
    version = {
        'version_data': int(str(version_data)),
        'version_release': int(str(version_release)),
    }

    pgutil.storage_set(schema, pgutil.STORAGE_KEY_VERSION, jsonutil.dumps(version))


class ParseThread(threading.Thread):
    def __init__(self, ies, schema, version, version_modified):
        threading.Thread.__init__(self)

        self.ies = ies
        self.schema = schema
        self.version = version
        self.version_modified = version_modified

    def run(self):
        global threads_error, threads_semaphore
        connection = None
        cursor = None

        try:
            connection, cursor = pgutil.cursor(self.schema)
            parser_ies.parse(cursor, self.ies, self.schema, self.version_modified)
        except:
            logging.error('Failed to parse ies: %s, schema: %s, version: %s', self.ies, self.schema, self.version)
            threads_error = True
            raise
        finally:
            if cursor:      cursor.close()
            if connection:  connection.close()

            threads_semaphore.release()


class TOSVersion:
    def __init__(self, path):
        self.modified = datetime.datetime.fromtimestamp(os.path.getmtime(path))
        self.version = int(os.path.basename(path).split('_')[0])

    def __cmp__(self, other):
        if isinstance(other, TOSVersion):
            return cmp(self.version, other.version)

        return cmp(self.version, other)

    def __eq__(self, other):
        if isinstance(other, TOSVersion):
            return self.version == other.version

        return self.version == other

    def __str__(self):
        return str(self.version)
