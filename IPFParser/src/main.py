import logging

from ipf_parser import unpacker
from ipf_parser.parsers import parser
from ipf_parser.utils import luautil

# Configure logging
logging.basicConfig(format='[%(asctime)s] [%(levelname)s]\t%(message)s', datefmt='%Y-%m-%d %I:%M:%S', level=logging.DEBUG)
logging.getLogger('PIL').setLevel(logging.WARN)

# Unpack latest game files
version_new = unpacker.unpack()

# Initialize LUA environment
luautil.init()

# Parse
parser.parse(version_new)