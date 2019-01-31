import os

from parserr.parser_enums import TOSRegion

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

URL_PATCH = None
URL_PATCH_iTOS = 'http://drygkhncipyq8.cloudfront.net/toslive/patch/'
URL_PATCH_jTOS = 'http://tosdownload.nexon.co.jp/patch/live/'
URL_PATCH_kTOS = 'http://tosg.dn.nexoncdn.co.kr/patch/live/'
URL_PATCH_kTEST = 'http://tosg.dn.nexoncdn.co.kr/patch/test/'
URL_PATCH_twTOS = 'http://tospatch.x2game.com.tw/live/patch/'

PATH_INPUT = None
PATH_INPUT_DATA = None
PATH_INPUT_DATA_PATCH = None
PATH_INPUT_DATA_PATCH_URL = None
PATH_INPUT_DATA_PATCH_URL_FULL = None
PATH_INPUT_DATA_REVISION = None
PATH_INPUT_DATA_REVISION_URL = None
PATH_INPUT_DATA_REVISION_URL_FULL = None
PATH_INPUT_RELEASE = None
PATH_INPUT_RELEASE_PATCH = None
PATH_INPUT_RELEASE_PATCH_URL = None
PATH_INPUT_RELEASE_REVISION = None
PATH_INPUT_RELEASE_REVISION_URL = None

PATH_PARSER = os.path.join('..', 'tos-parser')

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
        URL_PATCH, \
        PATH_INPUT, \
        PATH_INPUT_DATA, \
        PATH_INPUT_DATA_PATCH, \
        PATH_INPUT_DATA_PATCH_URL, \
        PATH_INPUT_DATA_PATCH_URL_FULL, \
        PATH_INPUT_DATA_REVISION, \
        PATH_INPUT_DATA_REVISION_URL, \
        PATH_INPUT_DATA_REVISION_URL_FULL, \
        PATH_INPUT_RELEASE, \
        PATH_INPUT_RELEASE_PATCH, \
        PATH_INPUT_RELEASE_PATCH_URL, \
        PATH_INPUT_RELEASE_REVISION, \
        PATH_INPUT_RELEASE_REVISION_URL, \
        PATH_WEB_ASSETS_DATA

    region_str = TOSRegion.to_string(region)

    URL_PATCH = URL_PATCH_iTOS if region == TOSRegion.iTOS else URL_PATCH
    URL_PATCH = URL_PATCH_jTOS if region == TOSRegion.jTOS else URL_PATCH
    URL_PATCH = URL_PATCH_kTOS if region == TOSRegion.kTOS else URL_PATCH
    URL_PATCH = URL_PATCH_kTEST if region == TOSRegion.kTEST else URL_PATCH
    URL_PATCH = URL_PATCH_twTOS if region == TOSRegion.twTOS else URL_PATCH

    PATH_INPUT = os.path.join(PATH_PARSER, 'input', region_str)
    PATH_INPUT_DATA = os.path.join(PATH_INPUT, 'data')
    PATH_INPUT_DATA_PATCH = os.path.join(PATH_INPUT_DATA, 'patch')
    PATH_INPUT_DATA_PATCH_URL = URL_PATCH + 'partial/data/'
    PATH_INPUT_DATA_PATCH_URL_FULL = URL_PATCH + 'full/data/'
    PATH_INPUT_DATA_REVISION = os.path.join(PATH_INPUT, 'data.revision.txt')
    PATH_INPUT_DATA_REVISION_URL = URL_PATCH + 'partial/data.revision.txt'
    PATH_INPUT_DATA_REVISION_URL_FULL = URL_PATCH + 'full/data.file.list.txt'
    PATH_INPUT_RELEASE = os.path.join(PATH_INPUT, 'release')
    PATH_INPUT_RELEASE_PATCH = os.path.join(PATH_INPUT_RELEASE, 'patch')
    PATH_INPUT_RELEASE_PATCH_URL = URL_PATCH + 'partial/release/'
    PATH_INPUT_RELEASE_REVISION = os.path.join(PATH_INPUT, 'release.revision.txt')
    PATH_INPUT_RELEASE_REVISION_URL = URL_PATCH + 'partial/release.revision.txt'

    PATH_WEB_ASSETS_DATA = os.path.join(PATH_WEB_ASSETS, 'data', region_str.lower())
