import os

from ipf_parser.utils.enum import enum

PATH_IPF_PARSER = os.path.join("..", "IPFParser")
PATH_IPF_PARSER_EXTRACT = os.path.join(PATH_IPF_PARSER, "extract")
PATH_IPF_PARSER_INPUT = os.path.join(PATH_IPF_PARSER, "input")
PATH_IPF_PARSER_INPUT_TRANSLATIONS = os.path.join(PATH_IPF_PARSER, "input_translations")
PATH_IPF_PARSER_OUTPUT = os.path.join(PATH_IPF_PARSER, "output")

PATH_IPF_UNPACKER = os.path.join("..", "IPFUnpacker")
PATH_IPF_UNPACKER_EXE = os.path.join(PATH_IPF_UNPACKER, "ipf_unpack")

PARSER_ITEM_GROUP = enum(
    'ARMBAND',
    'ARMOR',
    'BOOK',
    'CARD',
    'COLLECTION',
    'CUBE',
    'DRUG',
    'EQUIPMENT',
    'EVENT',
    'FISHINGROD',
    'GEM',
    'HELMET',
    'MAGICAMULET',
    'MATERIAL',
    'PASTEBAIT',
    'PETARMOR',
    'PETWEAPON',
    'PREMIUM',
    'QUEST',
    'RECIPE',
    'SUBWEAPON',
    'UNUSED',
    'WEAPON'
)

PARSER_TRANSLATIONS = enum(
    'ITEMS'
)