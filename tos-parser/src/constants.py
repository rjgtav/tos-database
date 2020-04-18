import os

from utils import fileutil
from utils.enumutil import TOSRegion

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
OUTPUT_NPCS = 'npcs'
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
PATH_INPUT_PATCH = None
PATH_INPUT_PATCH_DATA_FULL = None
PATH_INPUT_PATCH_DATA_FULL_URL = None
PATH_INPUT_PATCH_DATA_FULL_URL_REVISION = None
PATH_INPUT_PATCH_DATA_PARTIAL = None
PATH_INPUT_PATCH_DATA_PARTIAL_URL = None
PATH_INPUT_PATCH_DATA_PARTIAL_URL_REVISION = None
PATH_INPUT_PATCH_RELEASE = None
PATH_INPUT_PATCH_RELEASE_URL = None
PATH_INPUT_PATCH_RELEASE_URL_REVISION = None
PATH_INPUT_PATCH_TEMPORARY = None
PATH_INPUT_RELEASE = None

PATH_PARSER = os.path.join('..', 'tos-parser')

PATH_UNPACKER = os.path.join('IPFUnpacker')
PATH_UNPACKER_EXE = os.path.join(PATH_UNPACKER, 'ipf_unpack')

PATH_WEB = os.path.join('..', 'tos-web-server')
PATH_WEB_DB = os.path.join(PATH_WEB, 'sqlite')
PATH_WEB_WWW = os.path.join(PATH_WEB, 'www')
PATH_WEB_WWW_ASSETS = os.path.join(PATH_WEB_WWW, 'assets')
PATH_WEB_WWW_ASSETS_ICONS = os.path.join(PATH_WEB_WWW_ASSETS, 'icons')
PATH_WEB_WWW_ASSETS_IMAGES = os.path.join(PATH_WEB_WWW_ASSETS, 'images')
PATH_WEB_WWW_ASSETS_IMAGES_CLASSES = os.path.join(PATH_WEB_WWW_ASSETS_IMAGES, 'classes')
PATH_WEB_WWW_ASSETS_IMAGES_MAPS = os.path.join(PATH_WEB_WWW_ASSETS_IMAGES, 'maps')
PATH_WEB_WWW_ASSETS_REGION = None
PATH_WEB_WWW_ASSETS_REGION_3D = None
PATH_WEB_WWW_ASSETS_REGION_UI = None


def region(region):
    global\
        URL_PATCH, \
        PATH_INPUT, \
        PATH_INPUT_DATA, \
        PATH_INPUT_PATCH, \
        PATH_INPUT_PATCH_DATA_FULL, \
        PATH_INPUT_PATCH_DATA_FULL_URL, \
        PATH_INPUT_PATCH_DATA_FULL_URL_REVISION, \
        PATH_INPUT_PATCH_DATA_PARTIAL, \
        PATH_INPUT_PATCH_DATA_PARTIAL_URL, \
        PATH_INPUT_PATCH_DATA_PARTIAL_URL_REVISION, \
        PATH_INPUT_PATCH_RELEASE, \
        PATH_INPUT_PATCH_RELEASE_URL, \
        PATH_INPUT_PATCH_RELEASE_URL_REVISION, \
        PATH_INPUT_PATCH_TEMPORARY, \
        PATH_INPUT_RELEASE, \
        PATH_WEB_WWW_ASSETS_REGION, \
        PATH_WEB_WWW_ASSETS_REGION_3D, \
        PATH_WEB_WWW_ASSETS_REGION_UI

    region_str = TOSRegion.to_string(region)

    URL_PATCH = URL_PATCH_iTOS if region == TOSRegion.iTOS else URL_PATCH
    URL_PATCH = URL_PATCH_jTOS if region == TOSRegion.jTOS else URL_PATCH
    URL_PATCH = URL_PATCH_kTOS if region == TOSRegion.kTOS else URL_PATCH
    URL_PATCH = URL_PATCH_kTEST if region == TOSRegion.kTEST else URL_PATCH
    URL_PATCH = URL_PATCH_twTOS if region == TOSRegion.twTOS else URL_PATCH

    PATH_INPUT = os.path.join(PATH_PARSER, 'input', region_str)
    PATH_INPUT_DATA = os.path.join(PATH_INPUT, 'data')
    PATH_INPUT_PATCH = os.path.join(PATH_INPUT, 'patch')
    PATH_INPUT_PATCH_DATA_FULL = os.path.join(PATH_INPUT_PATCH, 'data', 'full')
    PATH_INPUT_PATCH_DATA_FULL_URL = URL_PATCH + 'full/data/'
    PATH_INPUT_PATCH_DATA_FULL_URL_REVISION = URL_PATCH + 'full/data.file.list.txt'
    PATH_INPUT_PATCH_DATA_PARTIAL = os.path.join(PATH_INPUT_PATCH, 'data', 'partial')
    PATH_INPUT_PATCH_DATA_PARTIAL_URL = URL_PATCH + 'partial/data/'
    PATH_INPUT_PATCH_DATA_PARTIAL_URL_REVISION = URL_PATCH + 'partial/data.revision.txt'
    PATH_INPUT_PATCH_RELEASE = os.path.join(PATH_INPUT_PATCH, 'release')
    PATH_INPUT_PATCH_RELEASE_URL = URL_PATCH + 'partial/release/'
    PATH_INPUT_PATCH_RELEASE_URL_REVISION = URL_PATCH + 'partial/release.revision.txt'
    PATH_INPUT_PATCH_TEMPORARY = os.path.join(PATH_INPUT_PATCH, 'tmp')
    PATH_INPUT_RELEASE = os.path.join(PATH_INPUT, 'release')

    fileutil.makedirs(PATH_INPUT_DATA)
    fileutil.makedirs(PATH_INPUT_PATCH_DATA_FULL)
    fileutil.makedirs(PATH_INPUT_PATCH_DATA_PARTIAL)
    fileutil.makedirs(PATH_INPUT_PATCH_RELEASE)
    fileutil.makedirs(PATH_INPUT_PATCH_TEMPORARY)
    fileutil.makedirs(PATH_INPUT_RELEASE)

    PATH_WEB_WWW_ASSETS_REGION = os.path.join(PATH_WEB_WWW_ASSETS, 'region', region_str.lower())
    PATH_WEB_WWW_ASSETS_REGION_3D = os.path.join(PATH_WEB_WWW_ASSETS_REGION, '3d')
    PATH_WEB_WWW_ASSETS_REGION_UI = os.path.join(PATH_WEB_WWW_ASSETS_REGION, 'ui')

    fileutil.makedirs(PATH_WEB_WWW_ASSETS_REGION)
    fileutil.makedirs(PATH_WEB_WWW_ASSETS_REGION_3D)
    fileutil.makedirs(PATH_WEB_WWW_ASSETS_REGION_UI)
