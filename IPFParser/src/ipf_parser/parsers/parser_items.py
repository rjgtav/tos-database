# coding=utf-8
import csv
import logging
import os

from ipf_parser import constants, globals

WHITELIST_ITEMS = [
    'BOOK',
    'CUBE',
    'DRUG',
    'EVENT',
    'EXPORB',
    'FISHINGROD',
    'ICOR',
    'MATERIAL',
    'PASTEBAIT',
    'QUEST',
    'UNUSED'
]


def parse():
    parse_items('item.ies')
    parse_items('item_colorspray.ies')
    parse_items('item_premium.ies')
    parse_items('item_Quest.ies')


def parse_translation(key):
    key = unicode(key.replace('"', ''), 'utf-8')

    if key != '' and key not in globals.translations:
        logging.warn('Missing translation for key: %s', key)

    return globals.translations[key] if key in globals.translations else key


def parse_items(file_name):
    logging.debug('Parsing %s...', file_name)
    globals_items = globals.items

    ies_item_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, "ies.ipf", file_name)
    ies_item_file = open(ies_item_path, 'rb')
    ies_item_reader = csv.DictReader(ies_item_file, delimiter=',', quotechar='"')

    for row in ies_item_reader:
        if row['GroupName'].upper() not in WHITELIST_ITEMS:
            continue

        #logging.debug('Parsing item: %s :: %s', row['ClassID'], row['ClassName'])

        obj = {}
        obj['$ID'] = int(row['ClassID'])
        obj['$ID_Name'] = row['ClassName']
        obj['Description'] = parse_translation(row['Desc'])
        obj['Icon'] = row['Icon'].lower()
        obj['Icon_Tooltip'] = row['TooltipImage'].lower()
        obj['Link_Collection'] = []
        obj['Link_Monster'] = []
        obj['Name'] = parse_translation(row['Name'])
        obj['Price'] = row['SellPrice']
        obj['TimeCoolDown'] = float(int(row['ItemCoolDown']) / 1000)
        obj['TimeLifeTime'] = float(int(row['LifeTime']))
        obj['Tradable'] = '%s%s%s%s' % (
            1 if row['MarketTrade'] == 'YES' else 0,    # Market
            1 if row['UserTrade'] == 'YES' else 0,      # Players
            1 if row['ShopTrade'] == 'YES' else 0,      # Shop
            1 if row['TeamTrade'] == 'YES' else 0,      # Team Storage
        )
        obj['Type'] = constants.PARSER_ITEM_GROUP.value_of[row['GroupName'].upper()]
        obj['Weight'] = float(row['Weight'])

        globals_items[obj['$ID']] = obj

    ies_item_file.close()