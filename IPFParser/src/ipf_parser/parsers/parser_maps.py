import csv
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations


def parse():
    parse_maps()


def parse_maps():
    logging.debug('Parsing maps...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'map.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        obj = {}
        obj['$ID'] = int(row['ClassID'])
        obj['$ID_NAME'] = row['ClassName']
        obj['Icon'] = ''
        obj['Name'] = parser_translations.translate(row['Name'])

        # TODO: parse remaining properties

        globals.maps[obj['$ID']] = obj
        globals.maps_by_name[obj['$ID_NAME']] = obj

    ies_file.close()


def parse_links():
    # TODO: maps are coming soon (tm)
    # TODO: use GenType_ + ClassName + .ies for spawn information (monster type, population and respawn time)
    # TODO: use Anchor_ + ClassName + .ies for spawn location information (x, y coordinates for each monster)
    return
