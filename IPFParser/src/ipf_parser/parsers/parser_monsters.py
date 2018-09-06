import csv
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations, parser_items, parser_assets
from ipf_parser.parsers.parser_items_equipment import parse_equipment_material
from ipf_parser.utils import tosutil
from ipf_parser.utils.enum import enum

MONSTER_RANK_WHITELIST = [
    'BOSS',
    'ELITE',
    'NORMAL',
    'SPECIAL'
]

MONSTER_ELEMENT = enum(
    'DARK',
    'EARTH',
    'FIRE',
    'HOLY',
    'ICE',
    'LIGHTNING',
    'MELEE',
    'POISON',
    'SOUL'
)

MONSTER_RACE = enum(
    'BEAST',
    'DEMON',
    'INSECT',
    'MUTANT',
    'PLANT'
)

MONSTER_RANK = enum(
    'BOSS',
    'ELITE',
    'NORMAL',
    'SPECIAL'
)

MONSTER_SIZE = enum(
    'S',
    'M',
    'L',
    'XL'
)

statbase_monster = {}
statbase_monster_type = {}


def parse():
    parse_monsters_statbase('statbase_monster.ies', statbase_monster)
    parse_monsters_statbase('statbase_monster_type.ies', statbase_monster_type)

    parse_monsters('monster.ies')
    parse_monsters('monster_event.ies')
    parse_monsters('Monster_solo_dungeon.ies')


def parse_monsters(file_name):
    logging.debug('Parsing %s...', file_name)

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, "ies.ipf", file_name)
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        if row['MonRank'].upper() not in MONSTER_RANK_WHITELIST:
            continue

        #logging.debug('Parsing monster: %s :: %s', row['ClassID'], row['ClassName'])

        level = tosutil.tos_mon_get_lv(row)
        stat_type = int(row['StatType'])

        monster_stat = statbase_monster[level] if level in statbase_monster else None
        monster_stat_type = statbase_monster_type[stat_type] if stat_type in statbase_monster_type else None

        obj = {}
        obj['$ID'] = int(row['ClassID'])
        obj['$ID_NAME'] = row['ClassName']
        obj['Description'] = parser_translations.translate(row['Desc'])
        obj['Icon'] = parser_assets.parse_entity_icon(row['Icon'])
        obj['Name'] = parser_translations.translate(row['Name'])

        obj['Armor'] = parse_equipment_material(row['ArmorMaterial'].upper())
        obj['Element'] = parse_monsters_element(row['Attribute'].upper())
        obj['Level'] = int(row['Level'])
        obj['Race'] = parse_monsters_race(row['RaceType'].upper())
        obj['Rank'] = MONSTER_RANK.value_of[row['MonRank'].upper()]
        obj['Size'] = MONSTER_SIZE.value_of[row['Size'].upper()]
        obj['EXP'] = int(tosutil.tos_mon_get_exp(row, monster_stat, monster_stat_type))
        obj['EXPClass'] = int(tosutil.tos_mon_get_jobexp(row, monster_stat, monster_stat_type))
        obj['Stat_CON'] = int(tosutil.tos_mon_get_stat(row, 'CON'))
        obj['Stat_DEX'] = int(tosutil.tos_mon_get_stat(row, 'DEX'))
        obj['Stat_INT'] = int(tosutil.tos_mon_get_stat(row, 'INT'))
        obj['Stat_SPR'] = int(tosutil.tos_mon_get_stat(row, 'SPR'))
        obj['Stat_STR'] = int(tosutil.tos_mon_get_stat(row, 'STR'))
        obj['Stat_HP'] = int(tosutil.tos_mon_get_mhp(row, monster_stat_type))
        obj['Stat_SP'] = int(tosutil.tos_mon_get_msp(row))
        obj['Stat_ATTACK_MAGICAL_MAX'] = int(tosutil.tos_mon_get_maxmatk(row, monster_stat_type))
        obj['Stat_ATTACK_MAGICAL_MIN'] = int(tosutil.tos_mon_get_minmatk(row, monster_stat_type))
        obj['Stat_ATTACK_PHYSICAL_MAX'] = int(tosutil.tos_mon_get_maxpatk(row, monster_stat_type))
        obj['Stat_ATTACK_PHYSICAL_MIN'] = int(tosutil.tos_mon_get_minpatk(row, monster_stat_type))
        obj['Stat_DEFENSE_MAGICAL'] = int(tosutil.tos_mon_get_mdef(row, monster_stat_type))
        obj['Stat_DEFENSE_PHYSICAL'] = int(tosutil.tos_mon_get_def(row, monster_stat_type))
        obj['Stat_Accuracy'] = int(tosutil.tos_mon_get_hr(row))
        obj['Stat_Evasion'] = int(tosutil.tos_mon_get_dr(row))
        obj['Stat_CriticalDamage'] = int(tosutil.tos_mon_get_crtatk(row))
        obj['Stat_CriticalDefense'] = int(tosutil.tos_mon_get_crtdr(row))
        obj['Stat_CriticalRate'] = int(tosutil.tos_mon_get_crthr(row))
        obj['Stat_BlockRate'] = int(tosutil.tos_mon_get_blk(row))
        obj['Stat_BlockPenetration'] = int(tosutil.tos_mon_get_blk_break(row))

        obj['Link_Drops'] = []
        obj['Link_Spawns'] = []

        globals.monsters[obj['$ID']] = obj
        globals.monsters_by_name[obj['$ID_NAME']] = obj

    ies_file.close()


def parse_monsters_element(element):
    return {
        'DARK': MONSTER_ELEMENT.DARK,
        'EARTH': MONSTER_ELEMENT.EARTH,
        'FIRE': MONSTER_ELEMENT.FIRE,
        'HOLY': MONSTER_ELEMENT.HOLY,
        'ICE': MONSTER_ELEMENT.ICE,
        'LIGHTING': MONSTER_ELEMENT.LIGHTNING,
        'LIGHTNING': MONSTER_ELEMENT.LIGHTNING,
        'MELEE': MONSTER_ELEMENT.MELEE,
        'POISON': MONSTER_ELEMENT.POISON,
        'SOUL': MONSTER_ELEMENT.SOUL,
        '': None
    }[element]


def parse_monsters_race(race):
    return {
        'WIDLING': MONSTER_RACE.value_of['BEAST'],
        'VELNIAS': MONSTER_RACE.value_of['DEMON'],
        'KLAIDA': MONSTER_RACE.value_of['INSECT'],
        'PARAMUNE': MONSTER_RACE.value_of['MUTANT'],
        'FORESTER': MONSTER_RACE.value_of['PLANT'],
        '': None
    }[race]


def parse_monsters_statbase(file_name, destination):
    logging.debug('Parsing %s...', file_name)

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, "ies.ipf", file_name)
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        destination[int(row['ClassID'])] = row

    ies_file.close()


def parse_links():
    parse_links_drops()
    parse_links_spawns()
    return


def parse_links_drops():
    logging.debug('Parsing drops for monsters...')

    for id_monster in globals.monsters:
        monster = globals.monsters[id_monster]
        file_name = monster['$ID_NAME'] + '.ies'

        try:
            ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, "ies_drop.ipf", file_name)
            ies_file = open(ies_path, 'rb')
            ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

            # logging.debug('Parsing monster: %s :: %s', monster['$ID'], monster['$ID_NAME'])
            for row in ies_reader:
                obj = {}
                obj['Chance'] = int(row['DropRatio']) / 100.0
                obj['Item'] = globals.get_item_link(row['ItemClassName'])
                obj['Quantity_MAX'] = int(row['Money_Max'])
                obj['Quantity_MIN'] = int(row['Money_Min'])

                monster['Link_Drops'].append(obj)

            ies_file.close()
        except IOError:
            continue


def parse_links_spawns():
    logging.debug('Parsing spawns for monsters...')

    for id_map in globals.maps:
        map = globals.maps[id_map]
        file_name = ('GenType_' + map['$ID_NAME'] + '.ies').lower()

        try:
            ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, "ies_mongen.ipf", file_name)
            ies_file = open(ies_path, 'rb')
            ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

            for row in ies_reader:
                if row['Faction'] != 'Monster':
                    continue
                if row['ClassType'] not in globals.monsters_by_name:
                    continue

                obj = {}
                obj['Map'] = globals.get_map_link(map['$ID_NAME'])
                obj['Population'] = int(row['MaxPop'])
                obj['TimeRespawn'] = int(row['RespawnTime'])

                monster = globals.monsters_by_name[row['ClassType']]
                monster['Link_Spawns'].append(obj)

            ies_file.close()
        except IOError:
            continue