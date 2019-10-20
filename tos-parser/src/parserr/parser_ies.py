import csv
import re

from utils import pgutil

COLUMN_ENTRY_CREATED = '__Entry_Created'
COLUMN_ENTRY_HASH = '__Entry_Hash'
COLUMN_ENTRY_UPDATED = '__Entry_Updated'


def parse(cursor, ies, schema, version_modified):

    try:
        with open(ies) as ies_file:
            reader = csv.DictReader(ies_file, dialect='ies')
            rows = [row for row in reader]

            # Hotfix: in case the file is empty, ignore
            if len(reader.fieldnames) == 0:
                return

            columns = sorted(set(reader.fieldnames))
            columns = [parse_column(column, columns, rows) for column in columns]
            columns.append(ParserIESColumn(COLUMN_ENTRY_CREATED, 'DATE', ''))
            columns.append(ParserIESColumn(COLUMN_ENTRY_HASH, 'BIGINT', ''))
            columns.append(ParserIESColumn(COLUMN_ENTRY_UPDATED, 'DATE', ''))

            # Start transaction
            cursor.execute('BEGIN TRANSACTION')
            cursor_args = {
                'columns': ','.join([column.name for column in columns]),
                'columns_created': ','.join(column.name for column in columns if COLUMN_ENTRY_CREATED == column.key),
                'columns_hash': ','.join(column.name for column in columns if COLUMN_ENTRY_HASH == column.key),
                'columns_primary': ','.join(column.name for column in columns if 'PRIMARY' in column.constraint),
                'columns_updated': ','.join(column.name for column in columns if COLUMN_ENTRY_UPDATED == column.key),
                'schema': schema,
                'table': pgutil.table_name(ies),
                'table_old': pgutil.table_name(ies) + '__$old$',
                'table_columns': ','.join([str(column) for column in columns]),
            }

            # Rename old table (thanks https://stackoverflow.com/a/24089729)
            table_exists = cursor.execute("""SELECT * FROM to_regclass('%(schema)s.%(table)s')""" % cursor_args) or cursor.fetchall()[0][0] is not None

            if table_exists:
                cursor.execute("""
                    ALTER TABLE IF EXISTS %(table)s RENAME TO %(table_old)s;
                """ % cursor_args)

            # Create table
            # Note: we always have to create a new table, as the table schema is constantly changing
            cursor.execute("""
                CREATE TABLE %(table)s (%(table_columns)s);
            """ % cursor_args)

            # Insert rows
            pgutil.executemany(cursor, ("""
                INSERT INTO %(table)s (%(columns)s)
                VALUES (""" + ','.join(['$' + str(i + 1) for i in range(len(columns))]) + """)
            """) % cursor_args, [parse_row(columns, row, version_modified) for row in rows])

            if table_exists:
                # Update Entry_Created and Entry_Updated for existing entries
                cursor.execute("""
                    UPDATE %(table)s NEW SET
                        %(columns_created)s = OLD.%(columns_created)s,
                        %(columns_updated)s = CASE
                            WHEN NEW.%(columns_hash)s = OLD.%(columns_hash)s THEN OLD.%(columns_updated)s
                            ELSE NEW.%(columns_updated)s
                        END
                    FROM %(table_old)s OLD
                    WHERE NEW.%(columns_primary)s = OLD.%(columns_primary)s
                """ % cursor_args)

                # Delete old table
                cursor.execute("""DROP TABLE %(table_old)s""" % cursor_args)

            # Create indexes
            if 'ClassName' in reader.fieldnames:
                cursor.execute("""CREATE INDEX idx_%(table)s_classname ON %(table)s("ClassName")""" % cursor_args)

            # Commit Transaction
            cursor.execute("""COMMIT""")
    except:
        cursor.execute('ROLLBACK')
        raise


def parse_column(column, columns, rows):
    # Parse column type
    type = None
    types = [
        (re.compile('^[0-9]+$'), 'INTEGER'),
        (re.compile('^[0-9]+(\\.[0-9]+)?$'), 'NUMERIC'),
    ]

    for row in rows:
        cell = row[column]
        types = [t for t in types if t[0].match(cell)]

        if len(types) == 0:
            type = 'TEXT'
            break

    if len(types) > 0:
        type = types[0][1]

    # Parse column constraint
    constraint = ''
    constraint = 'PRIMARY KEY' if column == 'ClassID' or column == 'ClassName' and 'ClassID' not in columns else constraint

    return ParserIESColumn(column, type, constraint)


def parse_row(columns, row, version_modified):
    result = []

    for column in columns:
        type = column.type
        column = column.key

        if column == COLUMN_ENTRY_CREATED or column == COLUMN_ENTRY_UPDATED:
            result.append(version_modified.date())
        elif column == COLUMN_ENTRY_HASH:
            result.append(hash(tuple([row[column.key] for column in columns if column.key not in [COLUMN_ENTRY_CREATED, COLUMN_ENTRY_HASH, COLUMN_ENTRY_UPDATED]])))
        else:
            if type == 'INTEGER':
                result.append(int(row[column]))
            elif type == 'NUMERIC':
                result.append(float(row[column]))
            elif type == 'TEXT':
                result.append(str(row[column]))

    return result


class ParserIESColumn:
    def __init__(self, name, type, constraint):
        self.key = name
        self.name = '"' + name + '"'
        self.type = type
        self.constraint = constraint

    def __str__(self):
        return ' '.join([self.name, self.type, self.constraint])
