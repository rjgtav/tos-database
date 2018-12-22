import csv
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations


def parse():
    parse_equipment_sets('setitem.ies')
    # parse_equipment_sets('legend_setitem.ies') # TODO: seems to work a bit different than traditional sets.. postpone for now


def parse_equipment_sets(file_name):
    logging.debug('Parsing equipment sets...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', file_name)
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        obj = {}
        obj['$ID'] = int(row['ClassID'])
        obj['$ID_NAME'] = row['ClassName']
        obj['Name'] = parser_translations.translate(row['Name']) if 'Name' in row else None

        obj['Link_Items'] = []

        # Parse bonus
        obj['Bonus2'] = parser_translations.translate(row['EffectDesc_2']) if row['EffectDesc_2'] != '' else None
        obj['Bonus3'] = parser_translations.translate(row['EffectDesc_3']) if row['EffectDesc_3'] != '' else None
        obj['Bonus4'] = parser_translations.translate(row['EffectDesc_4']) if row['EffectDesc_4'] != '' else None
        obj['Bonus5'] = parser_translations.translate(row['EffectDesc_5']) if row['EffectDesc_5'] != '' else None
        obj['Bonus6'] = parser_translations.translate(row['EffectDesc_6']) if row['EffectDesc_6'] != '' else None
        obj['Bonus7'] = parser_translations.translate(row['EffectDesc_7']) if row['EffectDesc_7'] != '' else None

        globals.equipment_sets[obj['$ID']] = obj
        globals.equipment_sets_by_name[obj['$ID_NAME']] = obj


def parse_links():
    parse_links_items('setitem.ies')
    # parse_links_items('legend_setitem.ies') # TODO: seems to work a bit different than traditional sets.. postpone for now


def parse_links_items(file_name):
    logging.debug('Parsing items for equipment sets: %s...', file_name)

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', file_name)
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        equipment_set = globals.equipment_sets_by_name[row['ClassName']]

        # Parse items
        for i in range(1, 8):
            item_name = row['ItemName_' + str(i)]

            if item_name == '':
                continue

            item = globals.get_item_link(item_name)

            if item is not None:
                equipment_set['Link_Items'].append(item)

    ies_file.close()
