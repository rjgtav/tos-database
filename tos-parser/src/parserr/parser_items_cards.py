import csv
import logging
import os

import constants
import globals
from parserr import parser_assets
from utils.tosenum import TOSEnum


class TOSCardType(TOSEnum):
    ATTACK = 0
    DEFENSE = 1
    LEGENDARY = 2
    REINFORCE = 3
    STATS = 4
    UTILITY = 5

    @staticmethod
    def value_of(string):
        return {
            'ATK': TOSCardType.ATTACK,
            'DEF': TOSCardType.DEFENSE,
            'LEG': TOSCardType.LEGENDARY,
            'REINFORCE_CARD': TOSCardType.REINFORCE,
            'STAT': TOSCardType.STATS,
            'UTIL': TOSCardType.UTILITY,
            '': None
        }[string.upper()]


def parse():
    parse_cards()
    parse_cards_battle()


def parse_cards():
    logging.debug('Parsing cards...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'item.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        if row['GroupName'] != 'Card':
            continue

        obj = globals.cards_by_name[row['ClassName']]
        obj['IconTooltip'] = parser_assets.parse_entity_icon(row['TooltipImage'])
        obj['TypeCard'] = TOSCardType.value_of(row['CardGroupName'])

    ies_file.close()


def parse_cards_battle():
    logging.debug('Parsing cards battle...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'cardbattle.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        obj = globals.cards_by_name[row['ClassName']]

        obj['Stat_Height'] = int(row['Height'])
        obj['Stat_Legs'] = int(row['LegCount'])
        obj['Stat_Weight'] = int(row['BodyWeight'])

    ies_file.close()


def parse_links():
    parse_links_monsters()


def parse_links_monsters():
    logging.debug('Parsing monsters for cards...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'item.ies')
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


