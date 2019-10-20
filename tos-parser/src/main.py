import csv
import logging
import os
import sys

import constants
from parserr import parser
from patcherr import patcher
# Configure working directory
from utils import jsonutil
from utils.enumutil import TOSRegion

os.chdir(os.path.join(os.path.dirname(os.path.realpath(__file__)), '..'))

# Configure region
region = TOSRegion.value_of(sys.argv[1]) if len(sys.argv) > 1 else TOSRegion.iTOS
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

# Patch to the latest version
version_patch, version_release = patcher.patch()

# Parse the game files
parse_force = sys.argv[2].lower() == 'true' if len(sys.argv) > 2 else False
parser.parse(region, parse_force)

# Update version.json
version_path = os.path.join(constants.PATH_WEB_WWW, 'version.json.js')
version = jsonutil.load(version_path)
version[TOSRegion.to_string(region)] = { 'version': 'patch_%s_release_%s' % (version_patch, version_release) }
jsonutil.dump(version, version_path)
