import csv
import logging
import os
from math import floor

from lupa import LuaError

import constants
import globals
from parserr import parser_translations
from parserr.parser_enums import TOSAttackType
from utils import luautil
from utils.tosenum import TOSEnum


class TOSEquipmentGrade(TOSEnum):
    LEGENDARY = 0
    MAGIC = 1
    NORMAL = 2
    RARE = 3
    UNIQUE = 4

    @staticmethod
    def value_of(index):
        return [
            None,
            TOSEquipmentGrade.NORMAL,
            TOSEquipmentGrade.MAGIC,
            TOSEquipmentGrade.RARE,
            TOSEquipmentGrade.UNIQUE,
            TOSEquipmentGrade.LEGENDARY,
        ][index]


class TOSEquipmentMaterial(TOSEnum):
    CHAIN = 0,
    CLOTH = 1
    GHOST = 2
    LEATHER = 3
    PLATE = 4
    UNKNOWN = 5

    @staticmethod
    def value_of(string):
        return {
            'CHAIN': TOSEquipmentMaterial.CHAIN,
            'CLOTH': TOSEquipmentMaterial.CLOTH,
            'GHOST': TOSEquipmentMaterial.GHOST,
            'IRON': TOSEquipmentMaterial.PLATE,
            'LEATHER': TOSEquipmentMaterial.LEATHER,
            '': TOSEquipmentMaterial.UNKNOWN,
        }[string.upper()]


class TOSEquipmentStat(TOSEnum):
    CON = 0
    DEX = 1
    INT = 2
    SPR = 3
    STR = 4
    HP = 5
    HP_RECOVERY = 6
    SP = 7
    SP_RECOVERY = 8
    SP_RECOVERY_TIME = 9
    ATTACK_ELEMENT_DARK = 10
    ATTACK_ELEMENT_EARTH = 11
    ATTACK_ELEMENT_FIRE = 12
    ATTACK_ELEMENT_HOLY = 13
    ATTACK_ELEMENT_ICE = 14
    ATTACK_ELEMENT_LIGHTNING = 15
    ATTACK_ELEMENT_POISON = 16
    ATTACK_ELEMENT_PSYCHOKINESIS = 17
    ATTACK_LIMIT_MAX = 18
    ATTACK_LIMIT_MIN = 19
    ATTACK_MATERIAL_CHAIN = 20
    ATTACK_MATERIAL_CLOTH = 21
    ATTACK_MATERIAL_LEATHER = 22
    ATTACK_MATERIAL_GHOST = 23
    ATTACK_MATERIAL_PLATE = 24
    ATTACK_RACE_BEAST = 25
    ATTACK_RACE_DEVIL = 26
    ATTACK_RACE_INSECT = 27
    ATTACK_RACE_MUTANT = 28
    ATTACK_RACE_PLANT = 29
    ATTACK_SIZE_SMALL = 30
    ATTACK_SIZE_MEDIUM = 31
    ATTACK_SIZE_LARGE = 32
    ATTACK_TYPE_PIERCING = 33
    ATTACK_TYPE_SLASH = 34
    ATTACK_TYPE_STRIKE = 35
    ATTACK_MAGICAL = 36
    ATTACK_MAGICAL_AMPLIFICATION = 37
    ATTACK_PHYSICAL = 38
    ATTACK_ANGLE = 39
    ATTACK_RANGE = 40
    DEFENSE_ELEMENT_DARK = 41
    DEFENSE_ELEMENT_EARTH = 42
    DEFENSE_ELEMENT_FIRE = 43
    DEFENSE_ELEMENT_HOLY = 44
    DEFENSE_ELEMENT_ICE = 45
    DEFENSE_ELEMENT_LIGHTNING = 46
    DEFENSE_ELEMENT_POISON = 47
    DEFENSE_ELEMENT_PSYCHOKINESIS = 48
    DEFENSE_TYPE_PIERCING = 49
    DEFENSE_TYPE_SLASH = 50
    DEFENSE_TYPE_STRIKE = 51
    DEFENSE_MAGICAL = 52
    DEFENSE_PHYSICAL = 53
    ACCURACY = 54
    EVASION = 55
    BLOCK = 56
    BLOCK_PENETRATION = 57
    BLOCK_RATE = 58
    BLOCK_RATE_FINAL = 59
    CRITICAL_ATTACK = 60
    CRITICAL_ATTACK_MAGICAL = 61
    CRITICAL_DEFENSE = 62
    CRITICAL_RATE = 63
    AOE_ATTACK_RATIO = 64
    AOE_DEFENSE_RATIO = 65
    MOVEMENT_SPEED = 66
    LOOTING_CHANCE = 67
    STAMINA = 68
    STAMINA_RECOVERY = 69
    UNKNOWN = 70

    @staticmethod
    def value_of(string):
        values = {
            'MINATK': TOSEquipmentStat.ATTACK_LIMIT_MIN,
            'MAXATK': TOSEquipmentStat.ATTACK_LIMIT_MAX,
            'ADD_MINATK': TOSEquipmentStat.ATTACK_LIMIT_MIN,
            'ADD_MAXATK': TOSEquipmentStat.ATTACK_LIMIT_MAX,
            'ADD_MATK': TOSEquipmentStat.ATTACK_MAGICAL,
            'ADD_PATK': TOSEquipmentStat.ATTACK_PHYSICAL,  # available in gems' bonuses
            'ADD_DEF': TOSEquipmentStat.DEFENSE_PHYSICAL,
            'ADD_MDEF': TOSEquipmentStat.DEFENSE_MAGICAL,
            'DEF': TOSEquipmentStat.DEFENSE_PHYSICAL,
            'MDEF': TOSEquipmentStat.DEFENSE_MAGICAL,
            'PATK': TOSEquipmentStat.ATTACK_PHYSICAL,
            'MATK': TOSEquipmentStat.ATTACK_MAGICAL,
            'CRTHR': TOSEquipmentStat.CRITICAL_RATE,
            'CRTATK': TOSEquipmentStat.CRITICAL_ATTACK,
            'CRTDR': TOSEquipmentStat.CRITICAL_DEFENSE,
            'CRTMATK': TOSEquipmentStat.CRITICAL_ATTACK_MAGICAL,
            'HR': TOSEquipmentStat.ACCURACY,
            'DR': TOSEquipmentStat.EVASION,
            'ADD_HR': TOSEquipmentStat.ACCURACY,
            'ADD_DR': TOSEquipmentStat.EVASION,
            'STR': TOSEquipmentStat.STR,
            'DEX': TOSEquipmentStat.DEX,
            'CON': TOSEquipmentStat.CON,
            'INT': TOSEquipmentStat.INT,
            'MNA': TOSEquipmentStat.SPR,
            'SR': TOSEquipmentStat.AOE_ATTACK_RATIO,
            'SDR': TOSEquipmentStat.AOE_DEFENSE_RATIO,
            'MHR': TOSEquipmentStat.ATTACK_MAGICAL_AMPLIFICATION,
            'ADD_MHR': TOSEquipmentStat.ATTACK_MAGICAL_AMPLIFICATION,
            'MGP': TOSEquipmentStat.UNKNOWN,  # TODO ???
            'AddSkillMaxR': TOSEquipmentStat.UNKNOWN,  # TODO ???
            'SkillRange': TOSEquipmentStat.ATTACK_RANGE,
            'SkillAngle': TOSEquipmentStat.ATTACK_ANGLE,
            'BlockRate': TOSEquipmentStat.BLOCK_RATE,
            'BLK': TOSEquipmentStat.BLOCK,
            'BLK_BREAK': TOSEquipmentStat.BLOCK_PENETRATION,
            'MSPD': TOSEquipmentStat.MOVEMENT_SPEED,
            'KDPow': TOSEquipmentStat.UNKNOWN,  # TODO ???
            'MHP': TOSEquipmentStat.HP,
            'MSP': TOSEquipmentStat.SP,
            'MSTA': TOSEquipmentStat.STAMINA,
            'RHP': TOSEquipmentStat.HP_RECOVERY,
            'RSP': TOSEquipmentStat.SP_RECOVERY,
            'RSPTIME': TOSEquipmentStat.SP_RECOVERY_TIME,
            'RSTA': TOSEquipmentStat.STAMINA_RECOVERY,
            'ADD_CLOTH': TOSEquipmentStat.ATTACK_MATERIAL_CLOTH,
            'ADD_LEATHER': TOSEquipmentStat.ATTACK_MATERIAL_LEATHER,
            'ADD_CHAIN': TOSEquipmentStat.ATTACK_MATERIAL_CHAIN,
            'ADD_IRON': TOSEquipmentStat.ATTACK_MATERIAL_PLATE,
            'ADD_GHOST': TOSEquipmentStat.ATTACK_MATERIAL_GHOST,
            'ADD_SMALLSIZE': TOSEquipmentStat.ATTACK_SIZE_SMALL,
            'ADD_MIDDLESIZE': TOSEquipmentStat.ATTACK_SIZE_MEDIUM,
            'ADD_LARGESIZE': TOSEquipmentStat.ATTACK_SIZE_LARGE,
            'ADD_FORESTER': TOSEquipmentStat.ATTACK_RACE_PLANT,
            'ADD_WIDLING': TOSEquipmentStat.ATTACK_RACE_BEAST,
            'ADD_VELIAS': TOSEquipmentStat.ATTACK_RACE_DEVIL,
            'ADD_PARAMUNE': TOSEquipmentStat.ATTACK_RACE_MUTANT,
            'ADD_KLAIDA': TOSEquipmentStat.ATTACK_RACE_INSECT,
            'Aries': TOSEquipmentStat.ATTACK_TYPE_PIERCING,
            'Slash': TOSEquipmentStat.ATTACK_TYPE_SLASH,
            'Strike': TOSEquipmentStat.ATTACK_TYPE_STRIKE,
            'AriesDEF': TOSEquipmentStat.DEFENSE_TYPE_PIERCING,
            'SlashDEF': TOSEquipmentStat.DEFENSE_TYPE_SLASH,
            'StrikeDEF': TOSEquipmentStat.DEFENSE_TYPE_STRIKE,
            'ADD_FIRE': TOSEquipmentStat.ATTACK_ELEMENT_FIRE,
            'ADD_ICE': TOSEquipmentStat.ATTACK_ELEMENT_ICE,
            'ADD_POISON': TOSEquipmentStat.ATTACK_ELEMENT_POISON,
            'ADD_LIGHTNING': TOSEquipmentStat.ATTACK_ELEMENT_LIGHTNING,
            'ADD_SOUL': TOSEquipmentStat.ATTACK_ELEMENT_PSYCHOKINESIS,
            'ADD_EARTH': TOSEquipmentStat.ATTACK_ELEMENT_EARTH,
            'ADD_HOLY': TOSEquipmentStat.ATTACK_ELEMENT_HOLY,
            'ADD_DARK': TOSEquipmentStat.ATTACK_ELEMENT_DARK,
            'RES_FIRE': TOSEquipmentStat.DEFENSE_ELEMENT_FIRE,
            'RES_ICE': TOSEquipmentStat.DEFENSE_ELEMENT_ICE,
            'RES_POISON': TOSEquipmentStat.DEFENSE_ELEMENT_POISON,
            'RES_LIGHTNING': TOSEquipmentStat.DEFENSE_ELEMENT_LIGHTNING,
            'RES_SOUL': TOSEquipmentStat.DEFENSE_ELEMENT_PSYCHOKINESIS,
            'RES_EARTH': TOSEquipmentStat.DEFENSE_ELEMENT_EARTH,
            'RES_HOLY': TOSEquipmentStat.DEFENSE_ELEMENT_HOLY,
            'RES_DARK': TOSEquipmentStat.DEFENSE_ELEMENT_DARK,
            'LootingChance': TOSEquipmentStat.LOOTING_CHANCE,
            'RareOption_MainWeaponDamageRate': TOSEquipmentStat.UNKNOWN,
            'RareOption_SubWeaponDamageRate': TOSEquipmentStat.UNKNOWN,
            'RareOption_BossDamageRate': TOSEquipmentStat.UNKNOWN,
            'RareOption_MeleeReducedRate': TOSEquipmentStat.UNKNOWN,
            'RareOption_MagicReducedRate': TOSEquipmentStat.UNKNOWN,
            'RareOption_PVPDamageRate': TOSEquipmentStat.UNKNOWN,
            'RareOption_PVPReducedRate': TOSEquipmentStat.UNKNOWN,
            'RareOption_CriticalDamage_Rate': TOSEquipmentStat.UNKNOWN,
            'RareOption_CriticalHitRate': TOSEquipmentStat.UNKNOWN,
            'RareOption_HitRate': TOSEquipmentStat.UNKNOWN,
            'RareOption_DodgeRate': TOSEquipmentStat.UNKNOWN,
            'RareOption_BlockBreakRate': TOSEquipmentStat.UNKNOWN,
            'RareOption_BlockRate': TOSEquipmentStat.UNKNOWN,
        }

        return values[string] if string in values else None


class TOSEquipmentType(TOSEnum):
    BOTTOM = 0
    BRACELET = 1
    CANNON = 2
    CHARM = 3
    COSTUME_ARMBAND = 4
    COSTUME_DOLL = 5
    COSTUME_EFFECT = 6
    COSTUME_HAIR = 7
    COSTUME_HAIR_ACCESSORY = 8
    COSTUME_HELMET = 9
    COSTUME_LENS = 10
    COSTUME_OUTFIT = 11
    COSTUME_SPECIAL = 12
    COSTUME_TOY = 13
    COSTUME_WING = 14
    DAGGER = 15
    GLOVES = 16
    NECKLACE = 17
    ONE_HANDED_BOW = 18
    ONE_HANDED_GUN = 19
    ONE_HANDED_MACE = 20
    ONE_HANDED_SPEAR = 21
    ONE_HANDED_STAFF = 22
    ONE_HANDED_SWORD = 23
    RAPIER = 24
    SEAL = 25
    SHIELD = 26
    SHOES = 27
    TOP = 28
    TWO_HANDED_BOW = 29
    TWO_HANDED_GUN = 30
    TWO_HANDED_MACE = 31
    TWO_HANDED_SPEAR = 32
    TWO_HANDED_STAFF = 33
    TWO_HANDED_SWORD = 34

    @staticmethod
    def value_of(string):
        return {
            'ARMBAND': TOSEquipmentType.COSTUME_ARMBAND,
            'ARTEFACT': TOSEquipmentType.COSTUME_TOY,
            'BOOTS': TOSEquipmentType.SHOES,
            'BOW': TOSEquipmentType.ONE_HANDED_BOW,
            'CANNON': TOSEquipmentType.CANNON,
            'CHARM': TOSEquipmentType.CHARM,
            'DOLL': TOSEquipmentType.COSTUME_DOLL,
            'DAGGER': TOSEquipmentType.DAGGER,
            'EFFECTCOSTUME': TOSEquipmentType.COSTUME_EFFECT,
            'GLOVES': TOSEquipmentType.GLOVES,
            'HAIR': TOSEquipmentType.COSTUME_HAIR,
            'HAT': TOSEquipmentType.COSTUME_HAIR_ACCESSORY,
            'HELMET': TOSEquipmentType.COSTUME_HELMET,
            'LENS': TOSEquipmentType.COSTUME_LENS,
            'MACE': TOSEquipmentType.ONE_HANDED_MACE,
            'MUSKET': TOSEquipmentType.TWO_HANDED_GUN,
            'NECK': TOSEquipmentType.NECKLACE,
            'OUTER': TOSEquipmentType.COSTUME_OUTFIT,
            'PANTS': TOSEquipmentType.BOTTOM,
            'PISTOL': TOSEquipmentType.ONE_HANDED_GUN,
            'RAPIER': TOSEquipmentType.RAPIER,
            'RING': TOSEquipmentType.BRACELET,
            'SEAL': TOSEquipmentType.SEAL,
            'SHIELD': TOSEquipmentType.SHIELD,
            'SHIRT': TOSEquipmentType.TOP,
            'SPEAR': TOSEquipmentType.ONE_HANDED_SPEAR,
            'SPECIALCOSTUME': TOSEquipmentType.COSTUME_SPECIAL,
            'STAFF': TOSEquipmentType.ONE_HANDED_STAFF,
            'SWORD': TOSEquipmentType.ONE_HANDED_SWORD,
            'THBOW': TOSEquipmentType.TWO_HANDED_BOW,
            'THMACE': TOSEquipmentType.TWO_HANDED_MACE,
            'THSPEAR': TOSEquipmentType.TWO_HANDED_SPEAR,
            'THSTAFF': TOSEquipmentType.TWO_HANDED_STAFF,
            'THSWORD': TOSEquipmentType.TWO_HANDED_SWORD,
            'WING': TOSEquipmentType.COSTUME_WING,
            '': None
        }[string.upper()]


# from shared.ipf/item_calculate.lua
EQUIPMENT_STAT_COLUMNS = [
    #'MINATK',
    #'MAXATK',
    'ADD_MINATK',
    'ADD_MAXATK',
    'ADD_MATK',
    'ADD_DEF',
    'ADD_MDEF',
    #'DEF',
    #'MDEF',
    'PATK',
    #'MATK',
    'CRTHR',
    'CRTATK',
    'CRTDR',
    'HR',
    'DR',
    'ADD_HR',
    'ADD_DR',
    'STR',
    'DEX',
    'CON',
    'INT',
    'MNA',
    'SR',
    'SDR',
    'CRTMATK',
    'MHR',
    'ADD_MHR',
    #'MGP',
    'AddSkillMaxR',
    'SkillRange',
    'SkillWidthRange',
    'SkillAngle',
    'BlockRate',
    'BLK',
    'BLK_BREAK',
    'MSPD',
    'KDPow',
    'MHP',
    'MSP',
    'MSTA',
    'RHP',
    'RSP',
    'RSPTIME',
    'RSTA',
    'ADD_CLOTH',
    'ADD_LEATHER',
    'ADD_CHAIN',
    'ADD_IRON',
    'ADD_GHOST',
    'ADD_SMALLSIZE',
    'ADD_MIDDLESIZE',
    'ADD_LARGESIZE',
    'ADD_FORESTER',
    'ADD_WIDLING',
    'ADD_VELIAS',
    'ADD_PARAMUNE',
    'ADD_KLAIDA',
    'Aries',
    'Slash',
    'Strike',
    'AriesDEF',
    'SlashDEF',
    'StrikeDEF',
    'ADD_FIRE',
    'ADD_ICE',
    'ADD_POISON',
    'ADD_LIGHTNING',
    'ADD_SOUL',
    'ADD_EARTH',
    'ADD_HOLY',
    'ADD_DARK',
    'RES_FIRE',
    'RES_ICE',
    'RES_POISON',
    'RES_LIGHTNING',
    'RES_SOUL',
    'RES_EARTH',
    'RES_HOLY',
    'RES_DARK',
    'LootingChance',
    'RareOption_MainWeaponDamageRate',
    'RareOption_MainWeaponDamageRate',
    'RareOption_SubWeaponDamageRate' ,
    'RareOption_BossDamageRate',
    'RareOption_MeleeReducedRate',
    'RareOption_MagicReducedRate',
    'RareOption_PVPDamageRate',
    'RareOption_PVPReducedRate',
    'RareOption_CriticalDamage_Rate',
    'RareOption_CriticalHitRate',
    'RareOption_CriticalDodgeRate',
    'RareOption_HitRate',
    'RareOption_DodgeRate',
    'RareOption_BlockBreakRate',
    'RareOption_BlockRate',
]


TYPE_EQUIPMENT_COSTUME_LIST = [
    TOSEquipmentType.COSTUME_ARMBAND,
    TOSEquipmentType.COSTUME_EFFECT,
    TOSEquipmentType.COSTUME_HAIR,
    TOSEquipmentType.COSTUME_HAIR_ACCESSORY,
    TOSEquipmentType.COSTUME_LENS,
    TOSEquipmentType.COSTUME_OUTFIT,
    TOSEquipmentType.COSTUME_SPECIAL,
    TOSEquipmentType.COSTUME_TOY,
    TOSEquipmentType.COSTUME_WING
]

equipment_grade_ratios = {}


def parse():
    parse_equipment_grade_ratios()
    parse_equipment()


def parse_equipment():
    logging.debug('Parsing equipment...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'item_equip.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    LUA_RUNTIME = luautil.LUA_RUNTIME
    LUA_SOURCE = luautil.LUA_SOURCE

    for row in ies_reader:
        if int(row['ClassID']) not in globals.equipment:
            continue

        item_grade = equipment_grade_ratios[int(row['ItemGrade'])]
        item_type_equipment = TOSEquipmentType.value_of(row['ClassType'].upper())
        obj = globals.equipment[int(row['ClassID'])]

        # Calculate all properties using in-game formulas
        tooltip_script = row['RefreshScp']
        tooltip_script = 'SCR_REFRESH_ACC' if not tooltip_script and 'Accessory_' in row['MarketCategory'] else tooltip_script
        tooltip_script = 'SCR_REFRESH_ARMOR' if not tooltip_script and 'Armor_' in row['MarketCategory'] else tooltip_script
        tooltip_script = 'SCR_REFRESH_HAIRACC' if not tooltip_script and 'HairAcc_' in row['MarketCategory'] else tooltip_script
        tooltip_script = 'SCR_REFRESH_WEAPON' if not tooltip_script and ('Weapon_' in row['MarketCategory'] or 'ChangeEquip_' in row['MarketCategory']) else tooltip_script

        if tooltip_script:
            try:
                LUA_RUNTIME[tooltip_script](row)
            except LuaError as error:
                if row['ClassID'] not in ['11130', '635061']:
                    logging.error('LUA error when processing item ClassID: %s', row['ClassID'])
                    raise error

        # Add additional fields
        obj['AnvilATK'] = []
        obj['AnvilDEF'] = []
        obj['AnvilPrice'] = []
        obj['Bonus'] = []
        obj['Durability'] = int(row['MaxDur']) / 100
        obj['Durability'] = -1 if obj['Durability'] <= 0 else obj['Durability']
        obj['Grade'] = TOSEquipmentGrade.value_of(int(row['ItemGrade']))
        obj['Level'] = int(row['ItemLv']) if int(row['ItemLv']) > 0 else int(row['UseLv'])
        obj['Material'] = TOSEquipmentMaterial.value_of(row['Material'])
        obj['Potential'] = int(row['MaxPR'])
        obj['RequiredClass'] = '%s%s%s%s%s' % (
            'T' if any(j in row['UseJob'] for j in ['All', 'Char3']) else 'F',  # Archer
            'T' if any(j in row['UseJob'] for j in ['All', 'Char4']) else 'F',  # Cleric
            'T' if any(j in row['UseJob'] for j in ['All', 'Char5']) else 'F',  # Scout
            'T' if any(j in row['UseJob'] for j in ['All', 'Char1']) else 'F',  # Swordsman
            'T' if any(j in row['UseJob'] for j in ['All', 'Char2']) else 'F',  # Wizard
        )
        obj['RequiredLevel'] = int(row['UseLv'])
        obj['Sockets'] = int(row['BaseSocket'])
        obj['SocketsLimit'] = int(row['MaxSocket_COUNT'])
        obj['Stars'] = int(row['ItemStar'])
        obj['Stat_ATTACK_MAGICAL'] = int(row['MATK']) if 'MATK' in row else 0
        obj['Stat_ATTACK_PHYSICAL_MIN'] = int(row['MINATK']) if 'MINATK' in row else 0
        obj['Stat_ATTACK_PHYSICAL_MAX'] = int(row['MAXATK']) if 'MAXATK' in row else 0
        obj['Stat_DEFENSE_MAGICAL'] = int(row['MDEF']) if 'MDEF' in row else 0
        obj['Stat_DEFENSE_PHYSICAL'] = int(row['DEF']) if 'DEF' in row else 0
        obj['TranscendPrice'] = []
        obj['TypeAttack'] = TOSAttackType.value_of(row['AttackType'])
        obj['TypeEquipment'] = item_type_equipment
        obj['Unidentified'] = int(row['NeedAppraisal']) == 1
        obj['UnidentifiedRandom'] = int(row['NeedRandomOption']) == 1

        obj['Link_Set'] = None

        # HotFix: if it's a Rapier, use THRUST as the TypeAttack
        if obj['TypeEquipment'] == TOSEquipmentType.RAPIER:
            obj['TypeAttack'] = TOSAttackType.MELEE_THRUST

        # HotFix: in case it doesn't give physical nor magical defense (e.g. agny necklace)
        if 'ADD_FIRE' in row['BasicTooltipProp'].split(','):
            lv = obj['Level']
            gradeRatio = (int(item_grade['BasicRatio']) / 100.0)

            row['ADD_FIRE'] = floor(lv * gradeRatio)

        # Anvil
        if any(prop in row['BasicTooltipProp'] for prop in ['ATK', 'DEF', 'MATK', 'MDEF']):
            for lv in range(40):
                row['Reinforce_2'] = lv

                if any(prop in row['BasicTooltipProp'] for prop in ['DEF', 'MDEF']):
                    obj['AnvilDEF'].append(LUA_RUNTIME['GET_REINFORCE_ADD_VALUE'](None, row, 0, 1))
                    obj['AnvilPrice'].append(LUA_RUNTIME['GET_REINFORCE_PRICE'](row, {}, None))
                if any(prop in row['BasicTooltipProp'] for prop in ['ATK', 'MATK']):
                    obj['AnvilATK'].append(LUA_RUNTIME['GET_REINFORCE_ADD_VALUE_ATK'](row, 0, 1, None))
                    obj['AnvilPrice'].append(LUA_RUNTIME['GET_REINFORCE_PRICE'](row, {}, None))

        obj['AnvilPrice'] = [value for value in obj['AnvilPrice'] if value > 0]
        obj['AnvilATK'] = [value for value in obj['AnvilATK'] if value > 0] if len(obj['AnvilPrice']) > 0 else None
        obj['AnvilDEF'] = [value for value in obj['AnvilDEF'] if value > 0] if len(obj['AnvilPrice']) > 0 else None

        # Bonus
        for stat in EQUIPMENT_STAT_COLUMNS:
            if stat in row:
                value = floor(float(row[stat]))

                if value != 0:
                    obj['Bonus'].append([
                        TOSEquipmentStat.value_of(stat),    # Stat
                        value                               # Value
                    ])

        # More Bonus
        if 'OptDesc' in row and len(row['OptDesc']) > 0:
            for bonus in parser_translations.translate(row['OptDesc']).split('{nl}'):
                bonus = bonus.strip()
                bonus = bonus[bonus.index('-'):] if '-' in bonus else bonus

                obj['Bonus'].append([
                    TOSEquipmentStat.UNKNOWN,           # Stat
                    bonus.replace('- ', '').strip()     # Value
                ])

        # Transcendence
        for lv in range(10):
            row['Transcend'] = lv
            obj['TranscendPrice'].append(LUA_RUNTIME['GET_TRANSCEND_MATERIAL_COUNT'](row, None))

        obj['TranscendPrice'] = [value for value in obj['TranscendPrice'] if value > 0]


def parse_equipment_grade_ratios():
    logging.debug('Parsing equipment grade...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'item_grade.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        equipment_grade_ratios[int(row['Grade'])] = row

    ies_file.close()


def parse_links():
    parse_links_sets('setitem.ies')


def parse_links_sets(file_name):
    logging.debug('Parsing sets for equipment: %s...', file_name)

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', file_name)
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        equipment_set = globals.get_equipment_set_link(row['ClassName'])

        # Parse items
        for i in range(1, 8):
            if row['ItemName_' + str(i)] not in globals.equipment_by_name:
                continue

            equipment = globals.equipment_by_name[row['ItemName_' + str(i)]]
            equipment['Link_Set'] = equipment_set

    ies_file.close()
