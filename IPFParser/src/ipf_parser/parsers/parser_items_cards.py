import csv
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_assets
from ipf_parser.utils.enum import enum

CARD_TYPE = enum(
    'ATTACK',
    'DEFENSE',
    'LEGENDARY',
    'REINFORCE',
    'STATS',
    'UTILITY',
)


def parse():
    parse_cards()
    parse_cards_battle()


def parse_cards():
    logging.debug('Parsing cards...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'item.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        if row['GroupName'] != 'Card':
            continue

        obj = globals.cards_by_name[row['ClassName']]
        obj['IconTooltip'] = parser_assets.parse_entity_icon(row['TooltipImage'])
        obj['TypeCard'] = parse_cards_type(row['CardGroupName'])

    ies_file.close()


def parse_cards_battle():
    logging.debug('Parsing cards battle...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'cardbattle.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        obj = globals.cards_by_name[row['ClassName']]

        obj['Stat_Height'] = int(row['Height'])
        obj['Stat_Legs'] = int(row['LegCount'])
        obj['Stat_Weight'] = int(row['BodyWeight'])

    ies_file.close()


def parse_cards_type(key):
    return {
        'ATK': CARD_TYPE.ATTACK,
        'DEF': CARD_TYPE.DEFENSE,
        'LEG': CARD_TYPE.LEGENDARY,
        'REINFORCE_CARD': CARD_TYPE.REINFORCE,
        'STAT': CARD_TYPE.STATS,
        'UTIL': CARD_TYPE.UTILITY,
        '': None
    }[key]


def parse_links():
    parse_links_monsters()


def parse_links_monsters():
    logging.debug('Parsing monsters for cards...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'item.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        if row['GroupName'] != 'Card':
            continue
        if int(row['NumberArg1']) not in globals.monsters:
            continue

        monster = globals.monsters[int(row['NumberArg1'])]

        obj = globals.cards_by_name[row['ClassName']]
        obj['MonsterElement'] = monster['Element']
        obj['MonsterRace'] = monster['Race']
        obj['Link_Monster'] = globals.get_monster_link(monster['$ID_NAME'])

    ies_file.close()


