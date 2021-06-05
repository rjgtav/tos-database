import csv
import logging
import os

import constants
import codecs

def load(ies_name):
    ies_data = []
    ies_path = os.path.join(constants.PATH_INPUT_DATA, "ies.ipf", ies_name.lower())

    if not os.path.exists(ies_path):
        logging.warn('Missing ies file: %s', ies_path)
        return []

    with codecs.open(ies_path, 'r','utf-8',errors="replace") as ies_file:
        ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

        for row in ies_reader:
            # auto cast to int/float if possible
            for key in list(row.keys()):
                try:
                    row[key] = int(row[key])
                except ValueError:
                    try:
                        row[key] = float(row[key])
                    except ValueError:
                        row[key] = row[key]
                except TypeError:
                    r="".join(row[key])
                    try:
                        row[key] = int(r)
                    except ValueError:
                        try:
                            row[key] = float(r)
                        except ValueError:
                            row[key] = r

            ies_data.append(row)

    return ies_data
