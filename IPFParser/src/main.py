import logging
import os
import shutil

from ipf_parser import unpacker, constants
from ipf_parser.parsers import parser


def copy_dir(source, destination):
    for file_name in os.listdir(source):
        shutil.copy2(os.path.join(source, file_name), os.path.join(destination, file_name.lower()))


# Configure logging
logging.basicConfig(format='[%(asctime)s] [%(levelname)s]\t%(message)s', datefmt='%Y-%m-%d %I:%M:%S', level=logging.DEBUG)

# Unpack latest game files
unpacker.unpack()

# Parse
parser.parse()

# Copy image assets
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'acc'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'emoticon'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'equip'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'hairacc'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'item'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'mongem'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'monster', 'boss'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'monster', 'mon'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'payment'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'skill', 'archer'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'skill', 'cleric'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'skill', 'common'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'skill', 'summon'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'skill', 'warrior'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'skill', 'wizard'), constants.PATH_WEB_ASSETS_ICONS)
#copy_dir(os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ui.ipf', 'icon', 'weapon'), constants.PATH_WEB_ASSETS_ICONS)
