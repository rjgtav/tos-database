import csv
import logging
import os

import constants


def load(ies_name):
    ies_data = []
    ies_path = os.path.join(constants.PATH_INPUT_DATA, "ies.ipf", ies_name.lower())

    if not os.path.exists(ies_path):
        logging.warn('Missing ies file: %s', ies_path)
        return []

    with open(ies_path, 'rb') as ies_file:
        ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

        for row in ies_reader:
            # auto cast to int/float if possible
            for key in row.keys():
                try:
                    row[key] = int(row[key])
                except ValueError:
                    try:
                        row[key] = float(row[key])
                    except ValueError:
                        row[key] = row[key]

            ies_data.append(row)

    return ies_data
