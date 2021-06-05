import csv
import logging
import os

import constants
import globals
import codecs

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
        obj['Link_Materials'] = []


def parse_links():
    parse_links_items()


def parse_links_items():
    logging.debug('Parsing items for recipes...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'recipe.ies')
    ies_file = codecs.open(ies_path,'r','utf-8',errors='replace')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        recipe = globals.recipes_by_name[row['ClassName']]
        recipe['Link_Target'] = globals.get_item_link(row['TargetItem'])
        recipe['Name'] = 'Recipe - Unknown'

        if recipe['Link_Target'] is not None:
            recipe['Name'] = 'Recipe - ' + recipe['Link_Target']['Name']

        # Parse ingredients
        for i in range(1, 6):
            if row['Item_' + str(i) + '_1'] == '':
                continue

            obj = {}
            obj['Item'] = globals.get_item_link(row['Item_' + str(i) + '_1'])
            obj['Quantity'] = int(row['Item_' + str(i) + '_1_Cnt'])

            recipe['Link_Materials'].append(obj)

    ies_file.close()
