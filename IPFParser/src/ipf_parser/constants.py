import os

from ipf_parser.utils.enum import enum

PATH_TOS = '/mnt/c/Games/steamapps/common/TreeOfSavior'
PATH_TOS_DATA = os.path.join(PATH_TOS, 'data')
PATH_TOS_PATCH = os.path.join(PATH_TOS, 'patch')
PATH_TOS_RELEASE = os.path.join(PATH_TOS, 'release')
PATH_TOS_RELEASE_LANGUAGEDATA = os.path.join(PATH_TOS_RELEASE, 'languageData')

PATH_PARSER = os.path.join('..', 'IPFParser')
PATH_PARSER_INPUT_IPF = os.path.join(PATH_PARSER, 'input_ipf')
PATH_PARSER_INPUT_VERSION = os.path.join(PATH_PARSER_INPUT_IPF, 'version')
PATH_PARSER_INPUT_TRANSLATIONS = os.path.join(PATH_PARSER, 'input_translations')

PATH_UNPACKER = os.path.join('..', 'IPFUnpacker')
PATH_UNPACKER_EXE = os.path.join(PATH_UNPACKER, 'ipf_unpack')

PATH_WEB = os.path.join('..', 'web')
PATH_WEB_ASSETS = os.path.join(PATH_WEB, 'src', 'assets')
PATH_WEB_ASSETS_DATA = os.path.join(PATH_WEB_ASSETS, 'data')
PATH_WEB_ASSETS_ICONS = os.path.join(PATH_WEB_ASSETS, 'icons')
