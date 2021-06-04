import csv
import json
import logging
import os
import sys

import constants
from parserr import parser
from parserr.parser_enums import TOSRegion
from patcherr import patcher

# Configure working directory
os.chdir(os.path.join(os.path.dirname(os.path.realpath(__file__)), '..'))

# Configure region
region = TOSRegion.value_of(sys.argv[1]) if len(sys.argv) > 1 else TOSRegion.iTOS

#region = TOSRegion.jTOS
constants.region(region)

# Configure logging
logging.getLogger('PIL').setLevel(logging.WARN)
logging.basicConfig(
    format='[%(asctime)s] [%(levelname)s]\t[' + TOSRegion.to_string(region) + ']\t%(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    level=logging.DEBUG
)

# Configure csv to support large files
csv.field_size_limit(999999999)

# Patch the game with the latest version
version_old, version_new = patcher.patch()

is_rebuild = os.path.isfile(os.path.join(constants.PATH_INPUT_DATA, 'ies_ability.ipf', 'ability_assassin.ies'))
is_patch_new = version_old != version_new
is_revision_new = sys.argv[2].lower() == 'true' if len(sys.argv) > 2 else False

if (is_patch_new or is_revision_new) or True:
    # Parse the game files
    parser.parse(region, is_rebuild, is_patch_new)

    # Save new version and whether it's Re:Build TODO: Remove after Re:Build is available worldwide
    version_path = os.path.join(constants.PATH_BUILD, 'region.json')

    with open(version_path, 'r+') as version_file:
        version_json = version_file.read()
        version_json = json.loads(version_json if len(version_json) else '{}')
        version_json[TOSRegion.to_string(region)] = { 'version': version_new, 'rebuild': is_rebuild }

        version_file.seek(0)
        version_file.write(json.dumps(version_json, sort_keys=True))
        version_file.truncate()

else:
    logging.debug('No new patch nor revision available. Aborting...')
