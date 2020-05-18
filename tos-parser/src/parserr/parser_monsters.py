import csv
import logging
import os

import constants
import globals
from parserr import parser_assets
from parserr import parser_translations
from parserr.parser_enums import TOSElement
from parserr.parser_items_equipment import TOSEquipmentMaterial
from utils import luautil
from utils.tosenum import TOSEnum


class TOSMonsterRace(TOSEnum):
    BEAST = 0
    DEMON = 1
    INSECT = 2
    ITEM = 3
    MUTANT = 4
    PLANT = 5
    VELNAIS = 6

    @staticmethod
    def value_of(string):
        return {
            'WIDLING': TOSMonsterRace.BEAST,
            'VELNIAS': TOSMonsterRace.DEMON,
            'KLAIDA': TOSMonsterRace.INSECT,
            'ITEM': TOSMonsterRace.ITEM,
            'PARAMUNE': TOSMonsterRace.MUTANT,
            'FORESTER': TOSMonsterRace.PLANT,
            'VELNAIS': TOSMonsterRace.VELNAIS,
            '': None
        }[string.upper()]


class TOSMonsterRank(TOSEnum):
    BOSS = 0
    ELITE = 1
    MATERIAL = 2
    MISC = 3
    NEUTRAL = 4
    NORMAL = 5
    NPC = 6
    SPECIAL = 7

    @staticmethod
    def value_of(string):
        return {
            'BOSS': TOSMonsterRank.BOSS,
            'ELITE': TOSMonsterRank.ELITE,
            'MATERIAL': TOSMonsterRank.MATERIAL,
            'MISC': TOSMonsterRank.MISC,
            'NEUTRAL': TOSMonsterRank.NEUTRAL,
            'NORMAL': TOSMonsterRank.NORMAL,
            'NPC': TOSMonsterRank.NPC,
            'SPECIAL': TOSMonsterRank.SPECIAL,
        }[string.upper()]


class TOSMonsterSize(TOSEnum):
    S = 0
    M = 1
    L = 2
    XL = 3
    XXL = 4
    HIDDEN = 5

    @staticmethod
    def value_of(string):
        return {
            'S': TOSMonsterSize.S,
            'M': TOSMonsterSize.M,
            'L': TOSMonsterSize.L,
            'XL': TOSMonsterSize.XL,
            'XXL': TOSMonsterSize.XXL,
            'HIDDEN': TOSMonsterSize.HIDDEN,
        }[string.upper()]


class TOSMonsterType(TOSEnum):
    MONSTER = 0
    NEUTRAL = 1
    NPC = 2
    SIGN = 3

    @staticmethod
    def value_of(string):
        return {
            'MONSTER': TOSMonsterType.MONSTER,
            'NEUTRAL': TOSMonsterType.NEUTRAL,
            'NPC': TOSMonsterType.NPC,
            'SIGN': TOSMonsterType.SIGN,
        }[string.upper()]


statbase_monster = {}
statbase_monster_type = {}


def parse():
    parse_monsters_statbase('statbase_monster.ies', statbase_monster)
    parse_monsters_statbase('statbase_monster_type.ies', statbase_monster_type)

    parse_monsters('monster.ies')
    parse_monsters('monster_event.ies')
    parse_monsters('monster_npc.ies')
    parse_monsters('monster_solo_dungeon.ies')


def parse_monsters(file_name):
    logging.debug('Parsing %s...', file_name)

    LUA_RUNTIME = luautil.LUA_RUNTIME
    LUA_SOURCE = luautil.LUA_SOURCE

    ies_path = os.path.join(constants.PATH_INPUT_DATA, "ies.ipf", file_name.lower())
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        #logging.debug('Parsing monster: %s :: %s', row['ClassID'], row['ClassName'])

        # HotFix: these properties need to be calculated before the remaining ones
        row['Lv'] = int(row['Level']) if int(row['Level']) > 1 else 1
        row['CON'] = LUA_RUNTIME['SCR_Get_MON_CON'](row)
        row['DEX'] = LUA_RUNTIME['SCR_Get_MON_DEX'](row)
        row['INT'] = LUA_RUNTIME['SCR_Get_MON_INT'](row)
        row['MNA'] = LUA_RUNTIME['SCR_Get_MON_MNA'](row)
        row['STR'] = LUA_RUNTIME['SCR_Get_MON_STR'](row)

        obj = {}
        obj['$ID'] = int(row['ClassID'])
        obj['$ID_NAME'] = row['ClassName']
        obj['Description'] = parser_translations.translate(row['Desc'])
        obj['Icon'] = parser_assets.parse_entity_icon(row['Icon']) if row['Icon'] != 'ui_CreateMonster' else None
        obj['Name'] = parser_translations.translate(row['Name'])
        obj['Type'] = TOSMonsterType.value_of(row['GroupName'])

        if obj['Type'] == TOSMonsterType.MONSTER:
            obj['Armor'] = TOSEquipmentMaterial.value_of(row['ArmorMaterial'])
            obj['Element'] = TOSElement.value_of(row['Attribute'])
            obj['Level'] = int(row['Lv'])
            obj['Race'] = TOSMonsterRace.value_of(row['RaceType'])
            obj['Rank'] = TOSMonsterRank.value_of(row['MonRank'])
            obj['Size'] = TOSMonsterSize.value_of(row['Size']) if row['Size'] else None
            obj['EXP'] = int(LUA_RUNTIME['SCR_GET_MON_EXP'](row)) if obj['Level'] < 999 else 0
            obj['EXPClass'] = int(LUA_RUNTIME['SCR_GET_MON_JOBEXP'](row)) if obj['Level'] < 999 else 0
            obj['Stat_CON'] = int(row['CON'])
            obj['Stat_DEX'] = int(row['DEX'])
            obj['Stat_INT'] = int(row['INT'])
            obj['Stat_SPR'] = int(row['MNA'])
            obj['Stat_STR'] = int(row['STR'])
            obj['Stat_HP'] = int(LUA_RUNTIME['SCR_Get_MON_MHP'](row))
            obj['Stat_SP'] = int(LUA_RUNTIME['SCR_Get_MON_MSP'](row))
            obj['Stat_ATTACK_MAGICAL_MAX'] = int(LUA_RUNTIME['SCR_Get_MON_MAXMATK'](row))
            obj['Stat_ATTACK_MAGICAL_MIN'] = int(LUA_RUNTIME['SCR_Get_MON_MINMATK'](row))
            obj['Stat_ATTACK_PHYSICAL_MAX'] = int(LUA_RUNTIME['SCR_Get_MON_MAXPATK'](row))
            obj['Stat_ATTACK_PHYSICAL_MIN'] = int(LUA_RUNTIME['SCR_Get_MON_MINPATK'](row))
            obj['Stat_DEFENSE_MAGICAL'] = int(LUA_RUNTIME['SCR_Get_MON_MDEF'](row))
            obj['Stat_DEFENSE_PHYSICAL'] = int(LUA_RUNTIME['SCR_Get_MON_DEF'](row))
            obj['Stat_Accuracy'] = int(LUA_RUNTIME['SCR_Get_MON_HR'](row))
            obj['Stat_Evasion'] = int(LUA_RUNTIME['SCR_Get_MON_DR'](row))
            obj['Stat_CriticalDamage'] = int(LUA_RUNTIME['SCR_Get_MON_CRTATK'](row))
            obj['Stat_CriticalDefense'] = int(LUA_RUNTIME['SCR_Get_MON_CRTDR'](row))
            obj['Stat_CriticalRate'] = int(LUA_RUNTIME['SCR_Get_MON_CRTHR'](row))
            obj['Stat_BlockRate'] = int(LUA_RUNTIME['SCR_Get_MON_BLK'](row))
            obj['Stat_BlockPenetration'] = int(LUA_RUNTIME['SCR_Get_MON_BLK_BREAK'](row))

            obj['Link_Items'] = []
            obj['Link_Maps'] = []

            globals.monsters[obj['$ID']] = obj
            globals.monsters_by_name[obj['$ID_NAME']] = obj
        elif obj['Type'] == TOSMonsterType.NPC:
            obj['Icon'] = parser_assets.parse_entity_icon(row['MinimapIcon']) if row['MinimapIcon'] else obj['Icon']

            globals.npcs[obj['$ID']] = obj
            globals.npcs_by_name[obj['$ID_NAME']] = obj

    ies_file.close()


def parse_monsters_statbase(file_name, destination):
    logging.debug('Parsing %s...', file_name)

    ies_path = os.path.join(constants.PATH_INPUT_DATA, "ies.ipf", file_name)
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        destination[int(row['ClassID'])] = row

    ies_file.close()


def parse_links():
    parse_links_items()


def parse_links_items():
    logging.debug('Parsing Monsters <> Items...')

    for monster in globals.monsters.values():
        ies_file = monster['$ID_NAME'] + '.ies'
        ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies_drop.ipf', ies_file.lower())

        try:
            with open(ies_path, 'rb') as ies_file:
                for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
                    if not row['ItemClassName'] or globals.get_item_link(row['ItemClassName']) is None:
                        continue

                    item = globals.get_item_link(row['ItemClassName']).entity
                    item_link = globals.get_item_link(item)
                    item_link = {
                        'Chance': int(row['DropRatio']) / 100.0,
                        'Item': item_link,
                        'Quantity_MAX': int(row['Money_Max']),
                        'Quantity_MIN': int(row['Money_Min']),
                    }

                    monster_link = globals.get_monster_link(monster)
                    monster_link = {
                        'Chance': int(row['DropRatio']) / 100.0,
                        'Monster': monster_link,
                        'Quantity_MAX': int(row['Money_Max']),
                        'Quantity_MIN': int(row['Money_Min']),
                    }

                    globals.link(
                        monster, 'Link_Items', monster_link,
                        item, 'Link_Monsters', item_link
                    )

        except IOError:
            continue
