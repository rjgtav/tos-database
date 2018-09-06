import logging
import os
import shutil
import xml.etree.ElementTree as ET

from ipf_parser import constants, globals
from ipf_parser.utils import imageutil


CATEGORY_CARD = ['bosscard2', 'sub_card3']
CATEGORY_SIZE = {  # width, height
    'bosscard2': (330, 440),
    'sub_card3': (330, 440),
    'item_tooltip_icon': (80, 80),
    'item_rank': (80, 80),
    '256_equip_icons': (256, 256),
    '256_costume_icons': (256, 256),
    'acc_item': (256, 256),
    'hair_accesory': (256, 256),
    'item': (80, 80),
    'payment': (80, 80),
}


def parse_entity_icon(icon):
    icon = icon.lower()
    icon_found = None

    if icon == '':
        return None

    if icon in globals.assets_icons:
        icon_found = icon
    elif icon + '_f' in globals.assets_icons:
        icon_found = icon + '_f'
    elif icon + '_m' in globals.assets_icons:
        icon_found = icon + '_m'

    if icon_found is not None:
        globals.assets_icons_used.append(icon_found)
        return globals.assets_icons[icon_found]
    else:
        # Note: there's nothing we can do about this :'(
        #logging.debug('Missing icon: %s', icon)
        return icon


def parse(version_new):
    logging.debug('Parsing assets...')

    parse_icons('baseskinset.xml', version_new)
    parse_icons('itemicon.xml', version_new)
    parse_icons('mongem.xml', version_new)
    parse_icons('monillust.xml', version_new)
    parse_icons('skillicon.xml', version_new)


def parse_icons(file_name, version_new):
    logging.debug('Parsing icons from %s...', file_name)

    data_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'baseskinset', file_name)
    data = ET.parse(data_path).getroot()


    # example: <imagelist category="Monster_icon_boss_02">
    for imagelist in data:
        image_category = imagelist.get('category')

        # example: <image name="icon_wizar_energyBolt" file="\icon\skill\wizard\icon_wizar_energyBolt.png" />
        for image in imagelist:
            if image.get('file') is None:
                continue
            if file_name != 'baseskinset.xml' and '.tga' in image.get('file'):
                continue
            if file_name == 'baseskinset.xml' and image_category not in CATEGORY_CARD:
                continue

            image_file = image.get('file').split('\\')[-1].lower()
            image_size = image.get('imgrect').split(' ')  # top, left, width, height
            image_size = (int(image_size[2]), int(image_size[3]))

            # Copy icon to web assets folder
            copy_from = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', *image.get('file').lower().split('\\')[:-1])
            copy_from = os.path.join(copy_from, image_file)
            copy_to = os.path.join(constants.PATH_WEB_ASSETS_ICONS, image_file)

            if not os.path.isfile(copy_from):
                # Note for future self:
                # if you find missing files due to wrong casing, go to the Hotfix at unpacker.py and force lowercase
                #logging.warning('Non-existing icon: %s', copy_from)
                continue

            if version_new:
                shutil.copy(copy_from, copy_to)

                # Resize, Optimize and convert to JPG/PNG
                if image_category in CATEGORY_SIZE:
                    image_size = CATEGORY_SIZE[image_category]

                if imagelist.get('category') in CATEGORY_CARD:
                    imageutil.optimize_to_jpg(copy_to, image_size)
                else:
                    imageutil.optimize_to_png(copy_to, image_size)

            # Store mapping for later use
            globals.assets_icons[image.get('name').lower()] = image_file[:-4]


def parse_clean(version_new):
    if not version_new:
        return

    logging.debug('Cleaning unused icons...')
    for icon in globals.assets_icons:
        if icon not in globals.assets_icons_used:
            path = os.path.join(constants.PATH_WEB_ASSETS_ICONS, icon)

            if os.path.isfile(path + '.jpg'):
                os.remove(path + '.jpg')
            elif os.path.isfile(path + '.png'):
                os.remove(path + '.png')
