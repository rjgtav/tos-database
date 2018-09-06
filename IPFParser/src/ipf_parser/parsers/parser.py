import csv
import json
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.globals import Link
from ipf_parser.parsers import parser_translations, parser_items, parser_monsters, parser_items_collections, \
    parser_items_recipes, parser_items_equipment, parser_assets, parser_items_books, parser_maps, \
    parser_items_equipment_sets, parser_items_cubes, parser_items_cards, parser_items_gems


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
            elif isinstance(cell, (dict,)):
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


def parse(version_new):
    # Parse assets
    parser_assets.parse(version_new)

    # Parse data
    logging.debug('Parsing data...')
    parser_translations.parse()
    parser_items.parse()
    parser_items_books.parse()
    parser_items_cards.parse()
    parser_items_collections.parse()
    parser_items_cubes.parse()
    parser_items_gems.parse()
    parser_items_equipment.parse()
    parser_items_equipment_sets.parse()
    parser_items_recipes.parse()
    parser_maps.parse()
    parser_monsters.parse()

    # Parse links
    logging.debug('Parsing links...')
    parser_items.parse_links()
    parser_items_cards.parse_links()
    parser_items_collections.parse_links()
    parser_items_cubes.parse_links()
    parser_items_gems.parse_links()
    parser_items_equipment.parse_links()
    parser_items_equipment_sets.parse_links()
    parser_items_recipes.parse_links()
    parser_monsters.parse_links()

    # Clean unused data
    parser_assets.parse_clean(version_new)

    logging.debug('Writing CSVs...')

    # Write parsed data to CSV
    csv_write(globals.books.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, constants.OUTPUT_BOOKS))
    csv_write(globals.cards.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, constants.OUTPUT_CARDS))
    csv_write(globals.collections.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, constants.OUTPUT_COLLECTIONS))
    csv_write(globals.cubes.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, constants.OUTPUT_CUBES))
    csv_write(globals.equipment.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, constants.OUTPUT_EQUIPMENT))
    csv_write(globals.gems.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, constants.OUTPUT_GEMS))
    csv_write(globals.equipment_sets.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, constants.OUTPUT_EQUIPMENT_SETS))
    csv_write(globals.items.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, constants.OUTPUT_ITEMS))
    csv_write(globals.monsters.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, constants.OUTPUT_MONSTERS))
    csv_write(globals.recipes.values(), os.path.join(constants.PATH_WEB_ASSETS_DATA, constants.OUTPUT_RECIPES))