import os

from ipf_parser.parsers.parser_enums import TOSRegion

OUTPUT_ATTRIBUTES = 'attributes'
OUTPUT_BOOKS = 'books'
OUTPUT_CARDS = 'cards'
OUTPUT_COLLECTIONS = 'collections'
OUTPUT_CUBES = 'cubes'
OUTPUT_GEMS = 'gems'
OUTPUT_JOBS = 'jobs'
OUTPUT_EQUIPMENT = 'equipment'
OUTPUT_EQUIPMENT_SETS = 'equipment-sets'
OUTPUT_ITEMS = 'items'
OUTPUT_MAPS = 'maps'
OUTPUT_MONSTERS = 'monsters'
OUTPUT_RECIPES = 'recipes'
OUTPUT_SKILLS = 'skills'

PATH_GAMES = 'C:\\Games' if os.name == 'nt' else '/mnt/c/Games'

PATH_TOS = None
PATH_TOS_DATA = None
PATH_TOS_PATCH = None
PATH_TOS_RELEASE = None
PATH_TOS_RELEASE_LANGUAGEDATA = None

PATH_PARSER = os.path.join('..', 'IPFParser')
PATH_PARSER_INPUT_IPF = None
PATH_PARSER_INPUT_VERSION = None
PATH_PARSER_INPUT_TRANSLATIONS = os.path.join(PATH_PARSER, 'input_translations')

PATH_UNPACKER = os.path.join('..', 'IPFUnpacker')
PATH_UNPACKER_EXE = os.path.join(PATH_UNPACKER, 'ipf_unpack')

PATH_WEB = os.path.join('..', 'web')
PATH_WEB_APP = os.path.join(PATH_WEB, 'src', 'app')
PATH_WEB_ASSETS = os.path.join(PATH_WEB, 'src', 'assets')
PATH_WEB_ASSETS_DATA = None
PATH_WEB_ASSETS_ICONS = os.path.join(PATH_WEB_ASSETS, 'icons')
PATH_WEB_ASSETS_IMAGES = os.path.join(PATH_WEB_ASSETS, 'images')


def region(region):
    global\
        PATH_TOS,\
        PATH_TOS_DATA,\
        PATH_TOS_PATCH,\
        PATH_TOS_RELEASE,\
        PATH_TOS_RELEASE_LANGUAGEDATA,\
        PATH_PARSER_INPUT_IPF,\
        PATH_PARSER_INPUT_VERSION,\
        PATH_WEB_ASSETS_DATA

    region_str = TOSRegion.to_string(region)

    PATH_TOS = os.path.join(PATH_GAMES, 'steamapps', 'common', 'TreeOfSavior') if region == TOSRegion.iTOS else PATH_TOS
    PATH_TOS = os.path.join(PATH_GAMES, 'TreeofSaviorJP') if region == TOSRegion.jTOS else PATH_TOS
    PATH_TOS = os.path.join(PATH_GAMES, 'TreeofSavior') if region == TOSRegion.kTOS else PATH_TOS
    PATH_TOS = os.path.join(PATH_GAMES, 'TreeofSavior Test') if region == TOSRegion.kTEST else PATH_TOS

    PATH_TOS_DATA = os.path.join(PATH_TOS, 'data')
    PATH_TOS_PATCH = os.path.join(PATH_TOS, 'patch')
    PATH_TOS_RELEASE = os.path.join(PATH_TOS, 'release')
    PATH_TOS_RELEASE_LANGUAGEDATA = os.path.join(PATH_TOS_RELEASE, 'languageData')

    PATH_PARSER_INPUT_IPF = os.path.join(PATH_PARSER, 'input_ipf', region_str)
    PATH_PARSER_INPUT_VERSION = os.path.join(PATH_PARSER_INPUT_IPF, 'version')

    PATH_WEB_ASSETS_DATA = os.path.join(PATH_WEB_ASSETS, 'data', region_str)
