import csv
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations, parser_assets
from ipf_parser.parsers.parser_enums import TOSElement
from ipf_parser.parsers.parser_items_equipment import TOSEquipmentMaterial
from ipf_parser.utils import luautil
from ipf_parser.utils.tosenum import TOSEnum


class TOSMonsterRace(TOSEnum):
    BEAST = 0
    DEMON = 1
    INSECT = 2
    MUTANT = 3
    PLANT = 4

    @staticmethod
    def value_of(string):
        return {
            'WIDLING': TOSMonsterRace.BEAST,
            'VELNIAS': TOSMonsterRace.DEMON,
            'KLAIDA': TOSMonsterRace.INSECT,
            'PARAMUNE': TOSMonsterRace.MUTANT,
            'FORESTER': TOSMonsterRace.PLANT,
            '': None
        }[string.upper()]


class TOSMonsterRank(TOSEnum):
    BOSS = 0
    ELITE = 1
    NORMAL = 2
    SPECIAL = 3

    @staticmethod
    def value_of(string):
        return {
            'BOSS': TOSMonsterRank.BOSS,
            'ELITE': TOSMonsterRank.ELITE,
            'NORMAL': TOSMonsterRank.NORMAL,
            'SPECIAL': TOSMonsterRank.SPECIAL,
        }[string.upper()]


class TOSMonsterSize(TOSEnum):
    S = 0
    M = 1
    L = 2
    XL = 3

    @staticmethod
    def value_of(string):
        return {
            'S': TOSMonsterSize.S,
            'M': TOSMonsterSize.M,
            'L': TOSMonsterSize.L,
            'XL': TOSMonsterSize.XL,
        }[string.upper()]


MONSTER_RANK_WHITELIST = [
    'BOSS',
    'ELITE',
    'NORMAL',
    'SPECIAL'
]

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

    LUA = luautil.load_script('calc_property_monster.lua', [
        'GET_MON_STAT',
        'SCR_Get_MON_STR',
        'SCR_Get_MON_INT',
        'SCR_Get_MON_CON',
        'SCR_Get_MON_MNA',
        'SCR_Get_MON_DEX',
        'SCR_Get_MON_MHP',
        'SCR_Get_MON_MSP',
        'SCR_GET_MON_EXP',
        'SCR_GET_MON_JOBEXP',
        'SCR_Get_MON_DEF',
        'SCR_Get_MON_MDEF',
        'SCR_Get_MON_HR',
        'SCR_Get_MON_DR',
        'SCR_Get_MON_CRTHR',
        'SCR_Get_MON_CRTDR',
        'SCR_Get_MON_CRTATK',
        'SCR_Get_MON_MINPATK',
        'SCR_Get_MON_MAXPATK',
        'SCR_Get_MON_MINMATK',
        'SCR_Get_MON_MAXMATK',
        'SCR_Get_MON_BLK',
        'SCR_Get_MON_BLK_BREAK',
        'SCR_MON_ITEM_ARMOR_CALC',
        'SCR_MON_ITEM_WEAPON_CALC',
        'SCR_MON_ITEM_GRADE_RATE',
        'SCR_MON_ITEM_REINFORCE_ARMOR_CALC',
        'SCR_MON_ITEM_REINFORCE_WEAPON_CALC',
        'SCR_MON_ITEM_TRANSCEND_CALC',
        'SCR_RACE_TYPE_RATE',
        'SCR_SIZE_TYPE_RATE',
    ])

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, "ies.ipf", file_name)
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        if row['MonRank'].upper() not in MONSTER_RANK_WHITELIST:
            continue

        #logging.debug('Parsing monster: %s :: %s', row['ClassID'], row['ClassName'])

        # HotFix: these properties need to be calculated before the remaining ones
        row['Lv'] = int(row['Level']) if int(row['Level']) > 1 else 1
        row['CON'] = LUA['SCR_Get_MON_CON'](row)
        row['DEX'] = LUA['SCR_Get_MON_DEX'](row)
        row['INT'] = LUA['SCR_Get_MON_INT'](row)
        row['MNA'] = LUA['SCR_Get_MON_MNA'](row)
        row['STR'] = LUA['SCR_Get_MON_STR'](row)

        obj = {}
        obj['$ID'] = int(row['ClassID'])
        obj['$ID_NAME'] = row['ClassName']
        obj['Description'] = parser_translations.translate(row['Desc'])
        obj['Icon'] = parser_assets.parse_entity_icon(row['Icon'])
        obj['Name'] = parser_translations.translate(row['Name'])

        obj['Armor'] = TOSEquipmentMaterial.value_of(row['ArmorMaterial'])
        obj['Element'] = TOSElement.value_of(row['Attribute'])
        obj['Level'] = int(row['Lv'])
        obj['Race'] = TOSMonsterRace.value_of(row['RaceType'])
        obj['Rank'] = TOSMonsterRank.value_of(row['MonRank'])
        obj['Size'] = TOSMonsterSize.value_of(row['Size'])
        obj['EXP'] = int(LUA['SCR_GET_MON_EXP'](row)) if obj['Level'] < 999 else 0
        obj['EXPClass'] = int(LUA['SCR_GET_MON_JOBEXP'](row)) if obj['Level'] < 999 else 0
        obj['Stat_CON'] = int(row['CON'])
        obj['Stat_DEX'] = int(row['DEX'])
        obj['Stat_INT'] = int(row['INT'])
        obj['Stat_SPR'] = int(row['MNA'])
        obj['Stat_STR'] = int(row['STR'])
        obj['Stat_HP'] = int(LUA['SCR_Get_MON_MHP'](row))
        obj['Stat_SP'] = int(LUA['SCR_Get_MON_MSP'](row))
        obj['Stat_ATTACK_MAGICAL_MAX'] = int(LUA['SCR_Get_MON_MAXMATK'](row))
        obj['Stat_ATTACK_MAGICAL_MIN'] = int(LUA['SCR_Get_MON_MINMATK'](row))
        obj['Stat_ATTACK_PHYSICAL_MAX'] = int(LUA['SCR_Get_MON_MAXPATK'](row))
        obj['Stat_ATTACK_PHYSICAL_MIN'] = int(LUA['SCR_Get_MON_MINPATK'](row))
        obj['Stat_DEFENSE_MAGICAL'] = int(LUA['SCR_Get_MON_MDEF'](row))
        obj['Stat_DEFENSE_PHYSICAL'] = int(LUA['SCR_Get_MON_DEF'](row))
        obj['Stat_Accuracy'] = int(LUA['SCR_Get_MON_HR'](row))
        obj['Stat_Evasion'] = int(LUA['SCR_Get_MON_DR'](row))
        obj['Stat_CriticalDamage'] = int(LUA['SCR_Get_MON_CRTATK'](row))
        obj['Stat_CriticalDefense'] = int(LUA['SCR_Get_MON_CRTDR'](row))
        obj['Stat_CriticalRate'] = int(LUA['SCR_Get_MON_CRTHR'](row))
        obj['Stat_BlockRate'] = int(LUA['SCR_Get_MON_BLK'](row))
        obj['Stat_BlockPenetration'] = int(LUA['SCR_Get_MON_BLK_BREAK'](row))

        obj['Link_Drops'] = []
        obj['Link_Spawns'] = []

        globals.monsters[obj['$ID']] = obj
        globals.monsters_by_name[obj['$ID_NAME']] = obj

    ies_file.close()


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