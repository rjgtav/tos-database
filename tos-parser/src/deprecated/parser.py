import json
import logging
import os

import unicodecsv as csv

import constants
import globals
from parserr import parser_translations, parser_assets, parser_attributes, parser_items, parser_items_books, \
    parser_items_cards, parser_items_collections, parser_items_cubes, parser_items_gems, parser_items_equipment, \
    parser_items_equipment_sets, parser_items_recipes, parser_jobs, parser_maps, parser_monsters, parser_skills
from utils import luautil


def csv_write(data, dataset):
    # Clean data
    for row in range(len(data)):
        for col in data[row]:
            cell = data[row][col] = globals.Link.to_dict(data[row][col])

            # Clean lists and convert to JSON
            if isinstance(cell, (list,)):
                cell = filter(lambda x: x is not None, cell)

                # Sort list, in case it's a Link list
                if len(cell) > 0 and isinstance(cell[0], globals.Link):
                    cell.sort()

                data[row][col] = json.dumps(cell, sort_keys=True) if len(cell) > 0 else None
            elif isinstance(cell, (dict,)):
                data[row][col] = json.dumps(cell, sort_keys=True)

    # Ensure destination directory exists
    if not os.path.exists(constants.PATH_BUILD_ASSETS_DATA):
        os.makedirs(constants.PATH_BUILD_ASSETS_DATA)

    # Get keys from a complete entity
    keys = None

    for row in data:
        if keys is None or len(keys) < len(row.keys()):
            keys = row.keys()

    # Write to CSV
    file = open(os.path.join(constants.PATH_BUILD_ASSETS_DATA, dataset + '.csv'), 'w')
    writer = csv.DictWriter(
        file,
        delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL, fieldnames=sorted(keys)
    )
    writer.writeheader()
    writer.writerows(sorted(data, key=lambda k: k['$ID']))
    file.close()


def parse(region, is_rebuild, is_version_new):
    # Initialize LUA environment
    luautil.init()

    # Parse assets (Note: we start by processing assets as they use a ton of RAM)
    parser_assets.parse(region, is_version_new)
    parser_jobs.parse_jobs_images(region, is_version_new)
    parser_maps.parse_maps_images(region, is_version_new)
    parser_translations.parse(region)

    # Parse data
    logging.debug('Parsing data...')
    parser_attributes.parse()
    parser_items.parse()
    parser_items_books.parse()
    parser_items_cards.parse()
    parser_items_collections.parse()
    parser_items_cubes.parse()
    parser_items_gems.parse(is_rebuild)
    parser_items_equipment.parse()
    parser_items_equipment_sets.parse()
    parser_items_recipes.parse()
    parser_jobs.parse(is_rebuild)
    parser_maps.parse(region, is_version_new)
    parser_monsters.parse()
    parser_skills.parse(is_rebuild)

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
    parser_maps.parse_links()
    parser_monsters.parse_links()
    parser_skills.parse_links(is_rebuild)

    # Clean unused data
    # parser_assets.parse_clean(version_update) # Note: we can't clean unused icons as they can be used by another region
    parser_attributes.parse_clean()
    parser_skills.parse_clean()

    logging.debug('Writing CSVs...')

    # Write parsed data to CSV
    csv_write(globals.attributes.values(), constants.OUTPUT_ATTRIBUTES)
    csv_write(globals.books.values(), constants.OUTPUT_BOOKS)
    csv_write(globals.cards.values(), constants.OUTPUT_CARDS)
    csv_write(globals.collections.values(), constants.OUTPUT_COLLECTIONS)
    csv_write(globals.cubes.values(), constants.OUTPUT_CUBES)
    csv_write(globals.equipment.values(), constants.OUTPUT_EQUIPMENT)
    csv_write(globals.equipment_sets.values(), constants.OUTPUT_EQUIPMENT_SETS)
    csv_write(globals.gems.values(), constants.OUTPUT_GEMS)
    csv_write(globals.items.values(), constants.OUTPUT_ITEMS)
    csv_write(globals.jobs.values(), constants.OUTPUT_JOBS)
    csv_write(globals.maps.values(), constants.OUTPUT_MAPS)
    csv_write(globals.monsters.values(), constants.OUTPUT_MONSTERS)
    csv_write(globals.npcs.values(), constants.OUTPUT_NPCS)
    csv_write(globals.recipes.values(), constants.OUTPUT_RECIPES)
    csv_write(globals.skills.values(), constants.OUTPUT_SKILLS)
