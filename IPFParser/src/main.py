import logging
import sys

from ipf_parser import unpacker, constants
from ipf_parser.parsers import parser

# Configure logging
from ipf_parser.parsers.parser_enums import TOSRegion

logging.basicConfig(format='[%(asctime)s] [%(levelname)s]\t%(message)s', datefmt='%Y-%m-%d %I:%M:%S', level=logging.DEBUG)
logging.getLogger('PIL').setLevel(logging.WARN)

# Parse region
region = TOSRegion.value_of(sys.argv[1]) if len(sys.argv) == 2 else TOSRegion.iTOS
constants.region(region)

# Patch the game with the latest version
version_new = unpacker.unpack(region)
version_new = version_new or region != TOSRegion.iTOS

# Parse
parser.parse(region, version_new)