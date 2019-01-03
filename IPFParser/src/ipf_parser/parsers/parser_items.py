import csv
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations, parser_assets
from ipf_parser.parsers.parser_items_equipment import TOSEquipmentType, TYPE_EQUIPMENT_COSTUME_LIST
from ipf_parser.utils.tosenum import TOSEnum


class TOSItemGroup(TOSEnum):
    ARMBAND = 0
    ARMOR = 1
    BOOK = 2
    CARD = 3
    COLLECTION = 4
    CUBE = 5
    DRUG = 6
    EQUIPMENT = 7
    EVENT = 8
    EXPORB = 9
    FISHINGROD = 10
    GEM = 11
    HELMET = 12
    ICOR = 13
    MAGICAMULET = 14
    MATERIAL = 15
    PASTEBAIT = 16
    PETARMOR = 17
    PETWEAPON = 18
    PREMIUM = 19
    QUEST = 20
    RECIPE = 21
    SEAL = 22
    SUBWEAPON = 23
    UNUSED = 24
    WEAPON = 25

    @staticmethod
    def value_of(string):
        return {
            'ARMBAND': TOSItemGroup.ARMBAND,
            'ARMOR': TOSItemGroup.ARMOR,
            'BOOK': TOSItemGroup.BOOK,
            'CARD': TOSItemGroup.CARD,
            'COLLECTION': TOSItemGroup.COLLECTION,
            'CUBE': TOSItemGroup.CUBE,
            'DRUG': TOSItemGroup.DRUG,
            'EQUIPMENT': TOSItemGroup.EQUIPMENT,
            'EVENT': TOSItemGroup.EVENT,
            'EXPORB': TOSItemGroup.EXPORB,
            'FISHINGROD': TOSItemGroup.FISHINGROD,
            'GEM': TOSItemGroup.GEM,
            'HELMET': TOSItemGroup.HELMET,
            'ICOR': TOSItemGroup.ICOR,
            'MAGICAMULET': TOSItemGroup.MAGICAMULET,
            'MATERIAL': TOSItemGroup.MATERIAL,
            'PASTEBAIT': TOSItemGroup.PASTEBAIT,
            'PETARMOR': TOSItemGroup.PETARMOR,
            'PETWEAPON': TOSItemGroup.PETWEAPON,
            'PREMIUM': TOSItemGroup.PREMIUM,
            'QUEST': TOSItemGroup.QUEST,
            'RECIPE': TOSItemGroup.RECIPE,
            'SEAL': TOSItemGroup.SEAL,
            'SUBWEAPON': TOSItemGroup.SUBWEAPON,
            'UNUSED': TOSItemGroup.UNUSED,
            'WEAPON': TOSItemGroup.WEAPON,
        }[string.upper()]


ITEM_GROUP_ITEM_WHITELIST = [
    TOSItemGroup.DRUG,
    TOSItemGroup.EVENT,
    TOSItemGroup.EXPORB,
    TOSItemGroup.FISHINGROD,
    TOSItemGroup.ICOR,
    TOSItemGroup.MATERIAL,
    TOSItemGroup.PASTEBAIT,
    TOSItemGroup.PREMIUM,
    TOSItemGroup.QUEST
]

ITEM_GROUP_EQUIPMENT_WHITELIST = [
    TOSItemGroup.ARMOR,
    TOSItemGroup.EQUIPMENT,
    TOSItemGroup.SEAL,
    TOSItemGroup.SUBWEAPON,
    TOSItemGroup.WEAPON
]

ITEM_GROUP_FASHION_WHITELIST = [
    TOSItemGroup.ARMBAND,
    TOSItemGroup.HELMET,
    TOSItemGroup.PREMIUM,
]


def parse():
    parse_items('item.ies')
    parse_items('item_colorspray.ies')
    parse_items('item_gem.ies')
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
        item_type = TOSItemGroup.RECIPE if file_name == 'recipe.ies' else TOSItemGroup.value_of(row['GroupName'])
        item_type_equipment = TOSEquipmentType.value_of(row['ClassType']) if 'ClassType' in row else None

        #logging.debug('Parsing item: %s :: %s', row['ClassID'], row['ClassName'])

        obj = {}
        obj['$ID'] = int(row['ClassID'])
        obj['$ID_NAME'] = row['ClassName']
        obj['Description'] = parser_translations.translate(row['Desc']) if 'Desc' in row else None
        obj['Icon'] = parser_assets.parse_entity_icon(row['Icon'])
        obj['Name'] = parser_translations.translate(row['Name']) if 'Name' in row else None

        obj['Price'] = row['SellPrice']
        obj['TimeCoolDown'] = float(int(row['ItemCoolDown']) / 1000) if 'ItemCoolDown' in row else None
        obj['TimeLifeTime'] = float(int(row['LifeTime'])) if 'LifeTime' in row else None
        obj['Tradability'] = '%s%s%s%s' % (
            'T' if row['MarketTrade'] == 'YES' else 'F',    # Market
            'T' if row['UserTrade'] == 'YES' else 'F',      # Players
            'T' if row['ShopTrade'] == 'YES' else 'F',      # Shop
            'T' if row['TeamTrade'] == 'YES' else 'F',      # Team Storage
        )
        obj['Type'] = item_type
        obj['Weight'] = float(row['Weight']) if 'Weight' in row else None

        obj['Link_Collections'] = []
        obj['Link_Cubes'] = []
        obj['Link_MonsterDrops'] = []
        obj['Link_RecipeTarget'] = []
        obj['Link_RecipeMaterial'] = []

        if item_type == TOSItemGroup.BOOK:
            globals.books[obj['$ID']] = obj
            globals.books_by_name[obj['$ID_NAME']] = obj
        elif item_type == TOSItemGroup.CARD:
            globals.cards[obj['$ID']] = obj
            globals.cards_by_name[obj['$ID_NAME']] = obj
        elif item_type == TOSItemGroup.COLLECTION:
            globals.collections[obj['$ID']] = obj
            globals.collections_by_name[obj['$ID_NAME']] = obj
        elif item_type == TOSItemGroup.CUBE:
            globals.cubes[obj['$ID']] = obj
            globals.cubes_by_name[obj['$ID_NAME']] = obj
            globals.cubes_by_stringarg[row['StringArg']] = obj
        elif item_type == TOSItemGroup.GEM:
            globals.gems[obj['$ID']] = obj
            globals.gems_by_name[obj['$ID_NAME']] = obj
        elif item_type == TOSItemGroup.RECIPE:
            globals.recipes[obj['$ID']] = obj
            globals.recipes_by_name[obj['$ID_NAME']] = obj
        elif item_type in ITEM_GROUP_ITEM_WHITELIST and file_name != 'item_Equip.ies':
            globals.items[obj['$ID']] = obj
            globals.items_by_name[obj['$ID_NAME']] = obj
        elif item_type in ITEM_GROUP_FASHION_WHITELIST\
                or item_type_equipment in TYPE_EQUIPMENT_COSTUME_LIST or row['ClassType2'] == 'Premium':
            globals.equipment[obj['$ID']] = obj
            globals.equipment_by_name[obj['$ID_NAME']] = obj
        elif item_type in ITEM_GROUP_EQUIPMENT_WHITELIST and item_type_equipment is not None:
            globals.equipment[obj['$ID']] = obj
            globals.equipment_by_name[obj['$ID_NAME']] = obj

    ies_file.close()


def parse_links():
    for xx_by_name in globals.all_items_by_name:
        parse_links_collections(xx_by_name)
        parse_links_cubes(xx_by_name)
        parse_links_monster_drops(xx_by_name)
        parse_links_recipes(xx_by_name)


def parse_links_collections(items_by_name):
    logging.debug('Parsing collections for items...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'collection.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        if row['ClassName'] not in globals.collections_by_name:
            continue

        collection = globals.get_collection_link(row['ClassName'])

        for i in range(1, 10):
            item_name = row['ItemName_' + str(i)]

            if item_name == '' or item_name not in items_by_name:
                continue

            item = items_by_name[item_name]
            item['Link_Collections'].append(collection)


def parse_links_cubes(items_by_name):
    logging.debug('Parsing cubes for items...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'reward_indun.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        if row['Group'] not in globals.cubes_by_stringarg:
            continue
        if row['ItemName'] not in items_by_name:
            continue

        cube = globals.cubes_by_stringarg[row['Group']]
        cube = globals.get_cube_link(cube['$ID_NAME'])

        item = items_by_name[row['ItemName']]
        item['Link_Cubes'].append(cube)


def parse_links_monster_drops(items_by_name):
    logging.debug('Parsing monster drops for items...')

    for id_monster in globals.monsters:
        monster = globals.monsters[id_monster]
        monster_name = monster['$ID_NAME']

        try:
            ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, "ies_drop.ipf", monster_name + '.ies')
            ies_file = open(ies_path, 'rb')
            ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

            # Parse monster drops (i.e. which monsters drop us)
            for row in ies_reader:
                item_name = row['ItemClassName']

                if item_name == 'Moneybag1' or item_name not in items_by_name:
                    continue

                obj = {}
                obj['Chance'] = int(row['DropRatio']) / 100.0
                obj['Map'] = None
                obj['Monster'] = globals.get_monster_link(monster_name)

                item = items_by_name[item_name]
                item['Link_MonsterDrops'].append(obj)

            ies_file.close()
        except IOError:
            continue


def parse_links_recipes(items_by_name):
    logging.debug('Parsing recipes for items...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'recipe.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        recipe = globals.get_recipe_link(row['ClassName'])

        # Parse recipe materials (i.e. which recipes require us)
        for i in range(1, 6):
            item_name = row['Item_' + str(i) + '_1']

            if item_name == '' or item_name not in items_by_name:
                continue

            item = items_by_name[item_name]

            if recipe not in item['Link_RecipeMaterial']:
                item['Link_RecipeMaterial'].append(recipe)

        # Parse recipe target (i.e. which recipe produces us)
        item_name = row['TargetItem']

        if item_name == '' or item_name not in items_by_name:
            continue

        item = items_by_name[item_name]
        item['Link_RecipeTarget'].append(recipe)
