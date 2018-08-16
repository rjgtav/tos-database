import csv
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations, parser_assets
from ipf_parser.parsers.parser_items_equipment import TYPE_EQUIPMENT_COSTUME_LIST, parse_equipment_type_equipment
from ipf_parser.utils.enum import enum

ITEM_GROUP = enum(
    'ARMBAND',
    'ARMOR',
    'BOOK',
    'CARD',
    'COLLECTION',
    'CUBE',
    'DRUG',
    'EQUIPMENT',
    'EVENT',
    'EXPORB',
    'FISHINGROD',
    'GEM',
    'HELMET',
    'ICOR',
    'MAGICAMULET',
    'MATERIAL',
    'PASTEBAIT',
    'PETARMOR',
    'PETWEAPON',
    'PREMIUM',
    'QUEST',
    'RECIPE',
    'SUBWEAPON',
    'UNUSED',
    'WEAPON'
)

ITEM_GROUP_WHITELIST = [
    ITEM_GROUP.BOOK,
    ITEM_GROUP.COLLECTION,
    ITEM_GROUP.CUBE,
    ITEM_GROUP.DRUG,
    ITEM_GROUP.EVENT,
    ITEM_GROUP.EXPORB,
    ITEM_GROUP.FISHINGROD,
    ITEM_GROUP.ICOR,
    ITEM_GROUP.MATERIAL,
    ITEM_GROUP.PASTEBAIT,
    ITEM_GROUP.RECIPE,
    ITEM_GROUP.QUEST
]

ITEM_GROUP_EQUIPMENT_WHITELIST = [
    ITEM_GROUP.ARMBAND,
    ITEM_GROUP.ARMOR,
    ITEM_GROUP.EQUIPMENT,
    ITEM_GROUP.HELMET,
    ITEM_GROUP.SUBWEAPON,
    ITEM_GROUP.WEAPON
]


def parse():
    parse_items('item.ies')
    parse_items('item_colorspray.ies')
    parse_items('item_Equip.ies')
    parse_items('item_premium.ies')
    parse_items('item_Quest.ies')
    parse_items('recipe.ies')


def parse_items(file_name):
    logging.debug('Parsing %s...', file_name)

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, "ies.ipf", file_name)
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        item_type = ITEM_GROUP.RECIPE if file_name == 'recipe.ies' else ITEM_GROUP.value_of[row['GroupName'].upper()]
        item_type_equipment = parse_equipment_type_equipment(row['ClassType'].upper()) if 'ClassType' in row else None

        if item_type not in ITEM_GROUP_WHITELIST and item_type not in ITEM_GROUP_EQUIPMENT_WHITELIST:
            continue

        #logging.debug('Parsing item: %s :: %s', row['ClassID'], row['ClassName'])

        obj = {}
        obj['$ID'] = int(row['ClassID'])
        obj['$ID_NAME'] = row['ClassName']
        obj['Description'] = parser_translations.parse_translation_key(row['Desc']) if 'Desc' in row else None
        obj['Icon'] = parser_assets.parse_entity_icon(row['Icon'])
        obj['Name'] = parser_translations.parse_translation_key(row['Name']) if 'Name' in row else None

        obj['Price'] = row['SellPrice']
        obj['TimeCoolDown'] = float(int(row['ItemCoolDown']) / 1000) if 'ItemCoolDown' in row else None
        obj['TimeLifeTime'] = float(int(row['LifeTime'])) if 'LifeTime' in row else None
        obj['Tradability'] = '%s%s%s%s' % (
            1 if row['MarketTrade'] == 'YES' else 0,    # Market
            1 if row['UserTrade'] == 'YES' else 0,      # Players
            1 if row['ShopTrade'] == 'YES' else 0,      # Shop
            1 if row['TeamTrade'] == 'YES' else 0,      # Team Storage
        )
        obj['Type'] = item_type
        obj['Weight'] = float(row['Weight']) if 'Weight' in row else None

        obj['Link_Collections'] = []
        obj['Link_Drops'] = []
        obj['Link_Recipes'] = []

        if item_type == ITEM_GROUP.BOOK:
            globals.books[obj['$ID']] = obj
            globals.books_by_name[obj['$ID_NAME']] = obj
        elif item_type == ITEM_GROUP.COLLECTION:
            globals.collections[obj['$ID']] = obj
            globals.collections_by_name[obj['$ID_NAME']] = obj
        elif item_type in ITEM_GROUP_EQUIPMENT_WHITELIST\
            and item_type_equipment is not None and item_type_equipment not in TYPE_EQUIPMENT_COSTUME_LIST\
            and row['ClassType2'] != 'Premium':
            globals.equipment[obj['$ID']] = obj
            globals.equipment_by_name[obj['$ID_NAME']] = obj
        elif item_type == ITEM_GROUP.RECIPE:
            globals.recipes[obj['$ID']] = obj
            globals.recipes_by_name[obj['$ID_NAME']] = obj
        elif item_type in ITEM_GROUP_WHITELIST:
            globals.items[obj['$ID']] = obj
            globals.items_by_name[obj['$ID_NAME']] = obj

    ies_file.close()


def parse_links():
    parse_links_collections(globals.collections_by_name)
    parse_links_collections(globals.equipment_by_name)
    parse_links_collections(globals.items_by_name)
    parse_links_collections(globals.recipes_by_name)

    parse_links_drops(globals.collections_by_name)
    parse_links_drops(globals.equipment_by_name)
    parse_links_drops(globals.items_by_name)
    parse_links_drops(globals.recipes_by_name)

    parse_links_recipes(globals.collections_by_name)
    parse_links_recipes(globals.equipment_by_name)
    parse_links_recipes(globals.items_by_name)
    parse_links_recipes(globals.recipes_by_name)


def parse_links_collections(items_by_name):
    logging.debug('Parsing collections for items...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'collection.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        collection = globals.get_collection_link(row['ClassName'])

        if collection is None:
            continue

        for i in range(1, 10):
            item_name = row['ItemName_' + str(i)]

            if item_name == '' or item_name not in items_by_name:
                continue

            item = items_by_name[item_name]
            item['Link_Collections'].append(collection)


def parse_links_drops(items_by_name):
    logging.debug('Parsing drops for items...')

    for id_monster in globals.monsters:
        monster = globals.monsters[id_monster]
        monster_name = monster['$ID_NAME']

        try:
            ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, "ies_drop.ipf", monster_name + '.ies')
            ies_file = open(ies_path, 'rb')
            ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

            # logging.debug('Parsing monster: %s :: %s', monster['$ID'], monster['$ID_NAME'])
            for row in ies_reader:
                item_name = row['ItemClassName']

                if item_name == 'Moneybag1' or item_name not in items_by_name:
                    continue

                obj = {}
                obj['Chance'] = int(row['DropRatio']) / 100.0
                obj['Map'] = None
                obj['Monster'] = globals.get_monster_link(monster_name)

                item = items_by_name[item_name]
                item['Link_Drops'].append(obj)

            ies_file.close()
        except IOError:
            continue


def parse_links_recipes(items_by_name):
    logging.debug('Parsing recipes for items...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'recipe.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:

        # Parse recipes
        for i in range(1, 6):
            item_name = row['Item_' + str(i) + '_1']

            if item_name == '' or item_name not in items_by_name:
                continue

            recipe = globals.get_recipe_link(row['ClassName'])

            item = items_by_name[item_name]
            item['Link_Recipes'].append(recipe)
