import csv
import json

from parserr import parser_translations
from utils import pgutil


def parse(cursor, ies, version):
    cursor_args = {
        'table': pgutil.table_name(ies),
        'table_columns': ','.join(['ClassID', 'ClassName', 'Entry_Created', 'Entry_Updated', 'IES']),
        'version': version if version else 0,
    }

    try:
        # Create corresponding table and staging area
        cursor.execute('BEGIN TRANSACTION')
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS %(table)s (
                ClassID         INTEGER PRIMARY KEY,
                ClassName       TEXT,
                Entry_Created   INTEGER,
                Entry_Updated   INTEGER,
                IES             TEXT
            );
            
            CREATE INDEX IF NOT EXISTS idx_%(table)s_classname ON %(table)s(ClassName);
            CREATE TABLE IF NOT EXISTS %(table)s_staging AS SELECT %(table_columns)s FROM %(table)s WHERE FALSE;
        """ % cursor_args)

        with open(ies) as ies:
            rows = []

            for row in csv.DictReader(ies, dialect='ies'):
                # Convert fields to ints/floats if possible and remove double quotes from strings
                for key in [key for key in row.keys() if type(row[key]) is not list]:
                    row[key] = unicode(row[key], 'utf-8') if not isinstance(row[key], unicode) else row[key]

                    if key != 'ClassName':
                        try:
                            row[key] = int(row[key])
                        except TypeError:
                            pass
                        except ValueError:
                            try:
                                row[key] = float(row[key])
                            except ValueError:
                                pass

                # Extract ClassID and ClassName
                ClassID = row['ClassID']
                ClassName = row['ClassName'] if 'ClassName' in row else None

                if None in row:         del row[None]  # HotFix: when csv fails to read something
                if 'ClassID' in row:    del row['ClassID']
                if 'ClassName' in row:  del row['ClassName']

                # Add header
                if len(rows) == 0:
                    rows.append(parse_row(
                        ClassID=-1,
                        ClassName=None,
                        IES=json.dumps(row.keys(), separators=(',', ':'))
                    ))

                # Add row
                rows.append(parse_row(
                    ClassID=ClassID,
                    ClassName=ClassName,
                    IES=json.dumps([parser_translations.translate(value) for value in row.values()], separators=(',', ':'))
                ))

            # Insert rows into staging area
            pgutil.executemany(cursor, """
                INSERT INTO %(table)s_staging (%(table_columns)s)
                VALUES ($1, $2, %(version)s, NULL, $3)
            """ % cursor_args, rows)

            # Insert rows into table (and delete obsolete entities)
            cursor.execute("""
                DELETE FROM %(table)s WHERE ClassID NOT IN (SELECT ClassID FROM %(table)s_staging);
            
                INSERT INTO %(table)s (%(table_columns)s) SELECT %(table_columns)s FROM %(table)s_staging
                ON CONFLICT(ClassID) DO UPDATE SET
                    Entry_Updated = CASE
                        WHEN %(table)s.Entry_Created < excluded.Entry_Created THEN  excluded.Entry_Created
                        ELSE                                                        %(table)s.Entry_Updated
                    END,
                    IES = excluded.IES
                ;
                
                DROP TABLE %(table)s_staging;
            """ % cursor_args)
            cursor.execute('COMMIT')
    except:
        cursor.execute('ROLLBACK')
        raise


def parse_row(ClassID, ClassName, IES):
    return ClassID, ClassName, IES

class ParserRow:
    def __init__(self, ClassID, ClassName, IES):
        self.ClassID = ClassID
        self.ClassName = ClassName
        self.IES = IES

    def to_row(self):
        return self.ClassID, self.ClassName, self.IES