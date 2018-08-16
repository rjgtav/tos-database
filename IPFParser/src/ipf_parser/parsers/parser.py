import csv
import json
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.globals import Link
from ipf_parser.parsers import parser_translations, parser_items, parser_monsters, parser_items_collections, \
    parser_items_recipes, parser_items_equipment, parser_assets, parser_items_books


def csv_write(data, path):
    # Clean data
    for row in range(len(data)):
        for col in data[row]:
            cell = data[row][col] = Link.to_dict(data[row][col])

            # Clean lists and convert to JSON
            if isinstance(cell, (list,)):
                data[row][col] = filter(lambda x: x is not None, cell)

                if len(cell) == 0:
                    data[row][col] = None
                else:
                    data[row][col] = json.dumps(cell)

    # Write to CSV
    file = open(path, 'w')
    writer = csv.DictWriter(
        file,
        delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL, fieldnames=sorted(data[0].keys())
    )
    writer.writeheader()
    writer.writerows(sorted(data, key=lambda k: k['$ID']))
    file.close()


def parse():
    # Parse assets
    logging.debug('Parsing assets...')
    parser_assets.parse()

    # Parse data
    logging.debug('Parsing data...')
    parser_translations.parse()
    parser_items.parse()
    parser_items_books.parse()
    parser_items_equipment.parse()
    parser_items_recipes.parse()
    parser_monsters.parse()

    # Parse links
    logging.debug('Parsing links...')
    parser_items.parse_links()
    parser_items_collections.parse_links()
    parser_items_recipes.parse_links()
    parser_monsters.parse_links()

    logging.debug('Writing CSVs...')

    # Write parsed data to CSV
    csv_write(globals.books.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, 'books.csv'))
    csv_write(globals.collections.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, 'collections.csv'))
    csv_write(globals.equipment.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, 'equipment.csv'))
    csv_write(globals.items.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, 'items.csv'))
    csv_write(globals.monsters.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, 'monsters.csv'))
    csv_write(globals.recipes.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, 'recipes.csv'))