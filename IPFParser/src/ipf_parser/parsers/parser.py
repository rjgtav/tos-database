import json
import logging
import os

import unicodecsv as csv

from ipf_parser import constants, globals
from ipf_parser.globals import Link
from ipf_parser.parsers import parser_translations, parser_items, parser_monsters, parser_items_collections, \
    parser_items_recipes, parser_items_equipment, parser_assets, parser_items_books, parser_maps, \
    parser_items_equipment_sets, parser_items_cubes, parser_items_cards, parser_items_gems, \
    parser_skills, parser_jobs, parser_attributes
from ipf_parser.utils import luautil, fileutil


def csv_write(data, dataset, version):
    # Clean data
    for row in range(len(data)):
        for col in data[row]:
            cell = data[row][col] = Link.to_dict(data[row][col])

            # Clean lists and convert to JSON
            if isinstance(cell, (list,)):
                cell = filter(lambda x: x is not None, cell)

                # Sort list, in case it's a Link list
                if len(cell) > 0 and isinstance(cell[0], Link):
                    cell.sort()

                data[row][col] = json.dumps(cell) if len(cell) > 0 else None
            elif isinstance(cell, (dict,)):
                data[row][col] = json.dumps(cell)

    # Write to CSV
    file = open(os.path.join(constants.PATH_WEB_ASSETS_DATA, dataset + '.' + str(version) + '.csv'), 'w')
    writer = csv.DictWriter(
        file,
        delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL, fieldnames=sorted(data[0].keys())
    )
    writer.writeheader()
    writer.writerows(sorted(data, key=lambda k: k['$ID']))
    file.close()


def parse(region, version, version_new):
    version_update = version != version_new

    # Initialize LUA environment
    luautil.init()

    # Parse assets
    parser_translations.parse(region)
    parser_assets.parse(region, version_update)

    # Parse data
    logging.debug('Parsing data...')
    parser_attributes.parse()
    parser_items.parse()
    parser_items_books.parse()
    parser_items_cards.parse()
    parser_items_collections.parse()
    parser_items_cubes.parse()
    parser_items_gems.parse(region)
    parser_items_equipment.parse()
    parser_items_equipment_sets.parse()
    parser_items_recipes.parse()
    parser_jobs.parse(region)
    parser_maps.parse()
    parser_monsters.parse()
    parser_skills.parse(region)

    # Parse links
    logging.debug('Parsing links...')
    parser_attributes.parse_links()
    parser_items.parse_links()
    parser_items_cards.parse_links()
    parser_items_collections.parse_links()
    parser_items_cubes.parse_links()
    parser_items_gems.parse_links()
    parser_items_equipment.parse_links()
    parser_items_equipment_sets.parse_links()
    parser_items_recipes.parse_links()
    parser_jobs.parse_links()
    parser_monsters.parse_links()
    parser_skills.parse_links()

    # Clean unused data
    # parser_assets.parse_clean(version_update) # Note: we can't clean unused icons as they can be used by another region
    parser_attributes.parse_clean()
    parser_skills.parse_clean()

    logging.debug('Writing CSVs...')

    # Write parsed data to CSV
    fileutil.clear(constants.PATH_WEB_ASSETS_DATA)
    csv_write(globals.attributes.values(), constants.OUTPUT_ATTRIBUTES, version_new)
    csv_write(globals.books.values(), constants.OUTPUT_BOOKS, version_new)
    csv_write(globals.cards.values(), constants.OUTPUT_CARDS, version_new)
    csv_write(globals.collections.values(), constants.OUTPUT_COLLECTIONS, version_new)
    csv_write(globals.cubes.values(), constants.OUTPUT_CUBES, version_new)
    csv_write(globals.equipment.values(), constants.OUTPUT_EQUIPMENT, version_new)
    csv_write(globals.equipment_sets.values(), constants.OUTPUT_EQUIPMENT_SETS, version_new)
    csv_write(globals.gems.values(), constants.OUTPUT_GEMS, version_new)
    csv_write(globals.items.values(), constants.OUTPUT_ITEMS, version_new)
    csv_write(globals.jobs.values(), constants.OUTPUT_JOBS, version_new)
    csv_write(globals.maps.values(), constants.OUTPUT_MAPS, version_new)
    csv_write(globals.monsters.values(), constants.OUTPUT_MONSTERS, version_new)
    csv_write(globals.recipes.values(), constants.OUTPUT_RECIPES, version_new)
    csv_write(globals.skills.values(), constants.OUTPUT_SKILLS, version_new)
