import csv
import logging
import os
from math import floor

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations
from ipf_parser.parsers.parser_enums import TOSAttackType
from ipf_parser.utils import luautil
from ipf_parser.utils.tosenum import TOSEnum


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
    CLOTH = 0
    GHOST = 1
    LEATHER = 2
    PLATE = 3
    UNKNOWN = 4

    @staticmethod
    def value_of(string):
        return {
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
    CRITICAL_DEFENSE = 61
    CRITICAL_RATE = 62
    AOE_ATTACK_RATIO = 63
    AOE_DEFENSE_RATIO = 64
    MOVEMENT_SPEED = 65
    LOOTING_CHANCE = 66
    STAMINA = 67
    STAMINA_RECOVERY = 68
    UNKNOWN = 69

    @staticmethod
    def value_of(string):
        return {
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


        }[string]


class TOSEquipmentType(TOSEnum):
    BOTTOM = 0
    BRACELET = 1
    CANNON = 2
    CHARM = 3
    COSTUME_ARMBAND = 4
    COSTUME_EFFECT = 5
    COSTUME_HAIR = 6
    COSTUME_HAIR_ACCESSORY = 7
    COSTUME_HELMET = 8
    COSTUME_LENS = 9
    COSTUME_OUTFIT = 10
    COSTUME_SPECIAL = 11
    COSTUME_TOY = 12
    COSTUME_WING = 13
    DAGGER = 14
    GLOVES = 15
    NECKLACE = 16
    ONE_HANDED_BOW = 17
    ONE_HANDED_GUN = 18
    ONE_HANDED_MACE = 19
    ONE_HANDED_SPEAR = 20
    ONE_HANDED_STAFF = 21
    ONE_HANDED_SWORD = 22
    RAPIER = 23
    SHIELD = 24
    SHOES = 25
    TOP = 26
    TWO_HANDED_BOW = 27
    TWO_HANDED_GUN = 28
    TWO_HANDED_MACE = 29
    TWO_HANDED_SPEAR = 30
    TWO_HANDED_STAFF = 31
    TWO_HANDED_SWORD = 32

    @staticmethod
    def value_of(string):
        return {
            'ARMBAND': TOSEquipmentType.COSTUME_ARMBAND,
            'ARTEFACT': TOSEquipmentType.COSTUME_TOY,
            'BOOTS': TOSEquipmentType.SHOES,
            'BOW': TOSEquipmentType.ONE_HANDED_BOW,
            'CANNON': TOSEquipmentType.CANNON,
            'CHARM': TOSEquipmentType.CHARM,
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
    'MHR',
    'ADD_MHR',
    #'MGP',
    'AddSkillMaxR',
    'SkillRange',
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

    LUA = luautil.load_script('item_calculate.lua', [
        'GET_COMMON_PROP_LIST',
        'GET_BASIC_ATK',
        'GET_BASIC_MATK',
        'INIT_ARMOR_PROP',
        'INIT_WEAPON_PROP',
        'SCR_REFRESH_ACC',
        'SCR_REFRESH_ARMOR',
        'SCR_REFRESH_WEAPON',
        'SCR_GET_ITEM_GRADE_RATIO',
    ])

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'item_Equip.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        if int(row['ClassID']) not in globals.equipment:
            continue

        item_grade = equipment_grade_ratios[int(row['ItemGrade'])]
        item_type_equipment = TOSEquipmentType.value_of(row['ClassType'].upper())
        obj = globals.equipment[int(row['ClassID'])]

        if row['GroupName'].upper() in ['SUBWEAPON', 'WEAPON']:
            LUA['SCR_REFRESH_WEAPON'](row)
        else:
            if item_type_equipment in [TOSEquipmentType.BRACELET, TOSEquipmentType.NECKLACE]:
                LUA['SCR_REFRESH_ACC'](row, None, None, None)
            else:
                LUA['SCR_REFRESH_ARMOR'](row)

        # Add additional fields
        obj['Bonus'] = []
        obj['Durability'] = int(row['MaxDur']) / 100
        obj['Durability'] = -1 if obj['Durability'] <= 0 else obj['Durability']
        obj['Grade'] = TOSEquipmentGrade.value_of(int(row['ItemGrade']))
        obj['Level'] = int(row['ItemLv']) if int(row['ItemLv']) > 0 else int(row['UseLv'])
        obj['Material'] = TOSEquipmentMaterial.value_of(row['Material'])
        obj['Potential'] = int(row['MaxPR'])
        obj['ReinforceRatio'] = int(row['ReinforceRatio']) / 100.0
        obj['RequiredClass'] = '%s%s%s%s' % (
            1 if any(j in row['UseJob'] for j in ['All', 'Char3']) else 0,  # Archer
            1 if any(j in row['UseJob'] for j in ['All', 'Char4']) else 0,  # Cleric
            1 if any(j in row['UseJob'] for j in ['All', 'Char1']) else 0,  # Swordsman
            1 if any(j in row['UseJob'] for j in ['All', 'Char2']) else 0,  # Wizard
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

        # Bonus
        for stat in EQUIPMENT_STAT_COLUMNS:
            value = floor(float(row[stat]))

            if value != 0:
                obj['Bonus'].append([
                    TOSEquipmentStat.value_of(stat),    # Stat
                    value                               # Value
                ])

        # More Bonus
        if 'OptDesc' in row and len(row['OptDesc']) > 0:
            for bonus in parser_translations.translate(row['OptDesc']).split('{nl}'):
                obj['Bonus'].append([
                    TOSEquipmentStat.UNKNOWN,           # Stat
                    bonus.replace('-', '').strip()      # Value
                ])


def parse_equipment_grade_ratios():
    logging.debug('Parsing equipment grade...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'item_grade.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        equipment_grade_ratios[int(row['Grade'])] = row

    ies_file.close()


def parse_links():
    parse_links_sets('setitem.ies')


def parse_links_sets(file_name):
    logging.debug('Parsing sets for equipment: %s...', file_name)

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', file_name)
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
