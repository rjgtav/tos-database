import logging
import os
import re
import sys

import constants
from parserr import parser
from parserr.parser_enums import TOSRegion
from patcherr import patcher

# Configure working directory
os.chdir(os.path.join(os.path.dirname(os.path.realpath(__file__)), '..'))

# Configure region
region = TOSRegion.value_of(sys.argv[1]) if len(sys.argv) > 1 else TOSRegion.iTOS
constants.region(region)

# Configure logging
logging.getLogger('PIL').setLevel(logging.WARN)
logging.basicConfig(
    format='[%(asctime)s] [%(levelname)s]\t[' + TOSRegion.to_string(region) + ']\t%(message)s',
    datefmt='%Y-%m-%d %I:%M:%S',
    level=logging.DEBUG
)

# Patch the game with the latest version
version_old, version_new = patcher.patch()

is_rebuild = os.path.isfile(os.path.join(constants.PATH_INPUT_DATA, 'ies_ability.ipf', 'ability_assassin.ies'))
is_patch_new = version_old != version_new
is_revision_new = sys.argv[2].lower() == 'true' if len(sys.argv) > 2 else False

if is_patch_new or is_revision_new:
    # Parse the game files
    parser.parse(region, is_rebuild, is_patch_new)

    # Save new version
    path = os.path.join(constants.PATH_WEB_APP, 'shared', 'service', 'update.service.ts')
    regex = "'" + TOSRegion.to_string(region) + "': '(.*)', \/\* " + TOSRegion.to_string(region) + "-needle \*\/"
    regex_replace = "'" + TOSRegion.to_string(region) + "': '" + version_new + "', /* " + TOSRegion.to_string(region) + "-needle */"

    file = [re.sub(regex, regex_replace, line) for line in open(path, 'r').readlines()]
    open(path, 'w').writelines(file)

    # Save whether it's Re:Build TODO: Remove after Re:Build is available worldwide
    path = os.path.join(constants.PATH_WEB_APP, 'shared', 'domain', 'tos-region.ts')
    regex = "'" + TOSRegion.to_string(region) + "': (.*), \/\* " + TOSRegion.to_string(region) + "-needle \*\/"
    regex_replace = "'" + TOSRegion.to_string(region) + "': " + ('true' if is_rebuild else 'false') + ", /* " + TOSRegion.to_string(region) + "-needle */"

    file = [re.sub(regex, regex_replace, line) for line in open(path, 'r').readlines()]
    open(path, 'w').writelines(file)
else:
    logging.debug('No new patch nor revision available. Aborting...')