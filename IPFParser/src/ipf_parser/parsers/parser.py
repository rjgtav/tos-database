import csv
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations, parser_items


def csv_write(data, path):
    file = open(path, 'w')
    writer = csv.DictWriter(
        file,
        delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL, fieldnames=sorted(data[0].keys())
    )
    writer.writeheader()
    writer.writerows(data)
    file.close()


def parse():
    logging.debug('Parsing...')

    # Parse data
    parser_translations.parse()
    parser_items.parse()

    logging.debug('Writing CSVs...')

    # Write parsed data to CSV
    csv_write(globals.items.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, 'items.csv'))