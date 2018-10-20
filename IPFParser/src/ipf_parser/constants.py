import os

from ipf_parser.parsers.parser_enums import TOSRegion

OUTPUT_ATTRIBUTES = 'attributes.csv'
OUTPUT_BOOKS = 'books.csv'
OUTPUT_CARDS = 'cards.csv'
OUTPUT_COLLECTIONS = 'collections.csv'
OUTPUT_CUBES = 'cubes.csv'
OUTPUT_GEMS = 'gems.csv'
OUTPUT_JOBS = 'jobs.csv'
OUTPUT_EQUIPMENT = 'equipment.csv'
OUTPUT_EQUIPMENT_SETS = 'equipment_sets.csv'
OUTPUT_ITEMS = 'items.csv'
OUTPUT_MAPS = 'maps.csv'
OUTPUT_MONSTERS = 'monsters.csv'
OUTPUT_RECIPES = 'recipes.csv'
OUTPUT_SKILLS = 'skills.csv'

PATH_TOS = '/mnt/c/Games/steamapps/common/TreeOfSavior'
PATH_TOS_DATA = os.path.join(PATH_TOS, 'data')
PATH_TOS_PATCH = os.path.join(PATH_TOS, 'patch')
PATH_TOS_RELEASE = os.path.join(PATH_TOS, 'release')
PATH_TOS_RELEASE_LANGUAGEDATA = os.path.join(PATH_TOS_RELEASE, 'languageData')

PATH_PARSER = os.path.join('..', 'IPFParser')
PATH_PARSER_INPUT_IPF = None
PATH_PARSER_INPUT_VERSION = None
PATH_PARSER_INPUT_TRANSLATIONS = os.path.join(PATH_PARSER, 'input_translations')

PATH_UNPACKER = os.path.join('..', 'IPFUnpacker')
PATH_UNPACKER_EXE = os.path.join(PATH_UNPACKER, 'ipf_unpack')

PATH_WEB = os.path.join('..', 'web')
PATH_WEB_ASSETS = os.path.join(PATH_WEB, 'src', 'assets')
PATH_WEB_ASSETS_DATA = None
PATH_WEB_ASSETS_ICONS = os.path.join(PATH_WEB_ASSETS, 'icons')
PATH_WEB_ASSETS_IMAGES = os.path.join(PATH_WEB_ASSETS, 'images')


def region(region):
    global PATH_PARSER_INPUT_IPF, PATH_PARSER_INPUT_VERSION, PATH_WEB_ASSETS_DATA
    region = TOSRegion.to_string(region)

    PATH_PARSER_INPUT_IPF = os.path.join(PATH_PARSER, 'input_ipf', region)
    PATH_PARSER_INPUT_VERSION = os.path.join(PATH_PARSER_INPUT_IPF, 'version')

    PATH_WEB_ASSETS_DATA = os.path.join(PATH_WEB_ASSETS, 'data', region)
