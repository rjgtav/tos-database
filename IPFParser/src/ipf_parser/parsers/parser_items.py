# coding=utf-8
import csv
import os

from ipf_parser import constants, globals


def parse():
    parse_items()


def parse_items():
    globals_items = globals.items
    globals_translations = globals.translations[constants.PARSER_TRANSLATIONS.ITEMS]

    ies_item_path = os.path.join(constants.PATH_IPF_PARSER_OUTPUT, "ies.ipf", "item.ies")
    ies_item_file = open(ies_item_path, 'rb')
    ies_item_reader = csv.DictReader(ies_item_file, delimiter=',', quotechar='"')

    for row in ies_item_reader:
        obj = {}
        obj['$ID'] = int(row['ClassID'])
        obj['$ID_Name'] = row['ClassName']
        obj['Description'] = globals_translations[unicode(row['Desc'], 'utf-8')] if row['Desc'] != '' else ''
        obj['Icon'] = row['Icon']
        obj['Icon_Tooltip'] = row['TooltipImage']
        obj['Link_Collection'] = []
        obj['Link_Monster'] = []
        obj['Name'] = globals_translations[unicode(row['Name'], 'utf-8')]
        obj['Type'] = constants.PARSER_ITEM_GROUP.value_of[row['GroupName'].upper()]
        obj['Weight'] = int(row['Weight'])

        # Find whether or not an item is tradeable, based on its Type and blacklist
        obj['Tradable'] = '%d%d%d' % (
            0,  # Market
            0,  # Players
            0,  # Team Storage
        )

        globals_items[obj['$ID']] = obj

        # print 'Type: %s' % (constants.PARSER_ITEM_GROUP.to_string[obj['Type']])
        # if row['TooltipImage'] != row['Icon']:
        #    print 'ClassID: %s, ClassName: %s, Icon: %s, TooltipImage: %s' % (row['ClassID'], row['ClassName'], row['Icon'], row['TooltipImage'])

        # if row['GroupName'] == 'Material':
        #
        #    print 'ClassID: %s, ClassName: %s, Icon: %s' % (row['ClassID'], row['ClassName'], row['Icon'])

    ies_item_file.close()