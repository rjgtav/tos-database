import csv
import logging
import os

from ipf_parser import constants, globals


def parse():
    parse_recipes()


def parse_recipes():
    logging.debug('Parsing recipes...')

    for recipe_id in globals.recipes:
        obj = globals.recipes[recipe_id]

        # Clean useless fields from Item
        del obj['Description']
        del obj['TimeCoolDown']
        del obj['TimeLifeTime']
        del obj['Weight']

        # Add additional fields
        obj['Link_Ingredients'] = []
        obj['Link_Target'] = []


def parse_links():
    parse_links_items()


def parse_links_items():
    logging.debug('Parsing items for recipes...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'recipe.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        recipe = globals.recipes_by_name[row['ClassName']]
        recipe['Link_Target'] = globals.get_item_link(row['TargetItem'])
        recipe['Name'] = 'Recipe - '

        if recipe['Link_Target'] is not None:
            recipe['Name'] += recipe['Link_Target']['Name']

        # Parse ingredients
        for i in range(1, 6):
            if row['Item_' + str(i) + '_1'] == '':
                continue

            obj = {}
            obj['Item'] = globals.get_item_link(row['Item_' + str(i) + '_1'])
            obj['Quantity'] = int(row['Item_' + str(i) + '_1_Cnt'])

            recipe['Link_Ingredients'].append(obj)

    ies_file.close()


def parse_links_items_bonus_stat(stat):
    return {
        'CON_BM': 'CON',
        'DEX_BM': 'DEX',
        'INT_BM': 'INT',
        'MNA_BM': 'SPR',
        'STR_BM': 'STR',

        'CRTATK_BM': 'Critical Attack',
        'CRTHR_BM': 'Critical Rate',
        'CRTDR_BM': 'Critical Defense',

        'MHP_BM': 'Maximum HP',
        'MSP_BM': 'Maximum SP',
        'RHP_BM': 'HP Recovery',
        'RSP_BM': 'SP Recovery',

        'DEF_BM': 'Defense',
        'MDEF_BM': 'Magic Defense',
        'MATK_BM': 'Magic Attack',
        'PATK_BM': 'Physical Attack',

        'DR_BM': 'Evasion',
        'HR_BM': 'Accuracy',
        'MHR_BM': 'Magic Amplification',  # ???

        'ResDark_BM': 'Dark Property Resistance',
        'ResEarth_BM': 'Earth Property Resistance',
        'ResHoly_BM': 'Holy Property Resistance',

        'MaxSta_BM': 'Stamina',
        'MaxAccountWarehouseCount': 'Team Storage Slots',
        'MaxWeight_Bonus': 'Weight Limit',
    }[stat]