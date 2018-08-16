import csv
import logging
import os
from math import floor

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations
from ipf_parser.utils import tosutil
from ipf_parser.utils.enum import enum

EQUIPMENT_GRADE = enum(
    'LEGENDARY',
    'MAGIC',
    'NORMAL',
    'RARE',
    'UNIQUE',
)

EQUIPMENT_MATERIAL = enum(
    'CLOTH',
    'GHOST',
    'LEATHER',
    'PLATE',
    'UNKNOWN',
)

EQUIPMENT_STAT = enum(
    'CON',
    'DEX',
    'INT',
    'SPR',
    'STR',
    'HP',
    'HP_RECOVERY',
    'SP',
    'SP_RECOVERY',
    'ATTACK_ELEMENT_DARK',
    'ATTACK_ELEMENT_EARTH',
    'ATTACK_ELEMENT_FIRE',
    'ATTACK_ELEMENT_HOLY',
    'ATTACK_ELEMENT_ICE',
    'ATTACK_ELEMENT_LIGHTNING',
    'ATTACK_ELEMENT_POISON',
    'ATTACK_ELEMENT_PSYCHOKINESIS',
    'ATTACK_LIMIT_MAX',
    'ATTACK_LIMIT_MIN',
    'ATTACK_MATERIAL_CLOTH',
    'ATTACK_MATERIAL_LEATHER',
    'ATTACK_MATERIAL_GHOST',
    'ATTACK_MATERIAL_PLATE',
    'ATTACK_RACE_BEAST',
    'ATTACK_RACE_DEVIL',
    'ATTACK_RACE_INSECT',
    'ATTACK_RACE_MUTANT',
    'ATTACK_RACE_PLANT',
    'ATTACK_SIZE_SMALL',
    'ATTACK_SIZE_MEDIUM',
    'ATTACK_SIZE_LARGE',
    'ATTACK_TYPE_PIERCING',
    'ATTACK_TYPE_SLASH',
    'ATTACK_TYPE_STRIKE',
    'ATTACK_MAGICAL',
    'ATTACK_MAGICAL_AMPLIFICATION',
    'ATTACK_PHYSICAL',
    'ATTACK_RANGE',
    'DEFENSE_ELEMENT_DARK',
    'DEFENSE_ELEMENT_EARTH',
    'DEFENSE_ELEMENT_FIRE',
    'DEFENSE_ELEMENT_HOLY',
    'DEFENSE_ELEMENT_ICE',
    'DEFENSE_ELEMENT_LIGHTNING',
    'DEFENSE_ELEMENT_POISON',
    'DEFENSE_ELEMENT_PSYCHOKINESIS',
    'DEFENSE_TYPE_PIERCING',
    'DEFENSE_TYPE_SLASH',
    'DEFENSE_TYPE_STRIKE',
    'DEFENSE_MAGICAL',
    'DEFENSE_PHYSICAL',
    'ACCURACY',
    'EVASION',
    'BLOCK_PENETRATION',
    'BLOCK_RATE',
    'BLOCK_RATE_FINAL',
    'CRITICAL_ATTACK',
    'CRITICAL_DEFENSE',
    'CRITICAL_RATE',
    'AOE_ATTACK_RATIO',
    'AOE_DEFENSE_RATIO',
    'MOVEMENT_SPEED',
    'LOOTING_CHANCE',
    'STAMINA',
    'STAMINA_RECOVERY',
    'UNKNOWN',
)

EQUIPMENT_STAT_COLUMNS = [
    'ADD_MATK',
    'ADD_MINATK',
    'ADD_MAXATK',
    'ADD_DEF',
    'CRTHR',
    'CRTATK',
    'CRTDR',
    'ADD_HR',
    'ADD_DR',
    'STR',
    'DEX',
    'CON',
    'INT',
    'MNA',
    'SR',
    'SDR',
    'ADD_MHR',
    'ADD_MDEF',
    'SkillRange',
    'BlockRate',
    'BLK_BREAK',
    'ASPD',
    'MSPD',
    'MHP',
    'MSP',
    'MSTA',
    'RHP',
    'RSP',
    'RSPTIME',
    'RSTA',
    'ADD_CLOTH',
    'ADD_LEATHER',
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
    'ADD_FIRE',
    'ADD_ICE',
    'ADD_POISON',
    'ADD_LIGHTNING',
    'ADD_EARTH',
    'ADD_SOUL',
    'ADD_HOLY',
    'ADD_DARK',
    'Aries',
    'AriesDEF',
    'Slash',
    'SlashDEF',
    'Strike',
    'StrikeDEF',
    'RES_FIRE',
    'RES_ICE',
    'RES_POISON',
    'RES_LIGHTNING',
    'RES_EARTH',
    'RES_SOUL',
    'RES_HOLY',
    'RES_DARK',
    'LootingChance',
]

TYPE_ATTACK = enum(
    'PIERCING',
    'BOW',
    'CANNON',
    'GUN',
    'SLASH',
    'STRIKE',
    'THRUST',
    'UNKNOWN',
)

TYPE_EQUIPMENT = enum(
    'BOTTOM',
    'BRACELET',
    'CANNON',
    'CHARM',
    'COSTUME_ARMBAND',
    'COSTUME_EFFECT',
    'COSTUME_HAIR',
    'COSTUME_HAIR_ACCESSORY',
    'COSTUME_HELMET',
    'COSTUME_LENS',
    'COSTUME_OUTFIT',
    'COSTUME_SPECIAL',
    'COSTUME_TOY',
    'COSTUME_WING',
    'DAGGER',
    'GLOVES',
    'NECKLACE',
    'ONE_HANDED_BOW',
    'ONE_HANDED_GUN',
    'ONE_HANDED_MACE',
    'ONE_HANDED_SPEAR',
    'ONE_HANDED_STAFF',
    'ONE_HANDED_SWORD',
    'RAPIER',
    'SHIELD',
    'SHOES',
    'TOP',
    'TWO_HANDED_BOW',
    'TWO_HANDED_GUN',
    'TWO_HANDED_MACE',
    'TWO_HANDED_SPEAR',
    'TWO_HANDED_STAFF',
    'TWO_HANDED_SWORD',
)

TYPE_EQUIPMENT_COSTUME_LIST = [
    TYPE_EQUIPMENT.COSTUME_ARMBAND,
    TYPE_EQUIPMENT.COSTUME_EFFECT,
    TYPE_EQUIPMENT.COSTUME_HAIR,
    TYPE_EQUIPMENT.COSTUME_HAIR_ACCESSORY,
    TYPE_EQUIPMENT.COSTUME_LENS,
    TYPE_EQUIPMENT.COSTUME_OUTFIT,
    TYPE_EQUIPMENT.COSTUME_SPECIAL,
    TYPE_EQUIPMENT.COSTUME_TOY,
    TYPE_EQUIPMENT.COSTUME_WING
]

equipment_grade = {}


def parse():
    parse_equipment_statgrade()
    parse_equipment()


def parse_equipment():
    logging.debug('Parsing equipment...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'item_Equip.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        equipment_id = int(row['ClassID'])

        if equipment_id not in globals.equipment:
            continue

        item_grade = equipment_grade[int(row['ItemGrade'])]

        # Add additional fields
        obj = globals.equipment[equipment_id]
        obj['Bonuses'] = []
        obj['Durability'] = int(row['MaxDur']) / 100
        obj['Durability'] = -1 if obj['Durability'] <= 0 else obj['Durability']
        obj['Grade'] = parse_equipment_grade(int(row['ItemGrade']))
        obj['Material'] = parse_equipment_material(row['Material'].upper())
        obj['Potential'] = int(row['MaxPR'])
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
        obj['Stat_ATTACK_MAGICAL'] = int(tosutil.tos_item_get_basic_matk(row, item_grade))
        obj['Stat_ATTACK_PHYSICAL_MIN'] = int(tosutil.tos_item_get_basic_atk(row, item_grade)[0])
        obj['Stat_ATTACK_PHYSICAL_MAX'] = int(tosutil.tos_item_get_basic_atk(row, item_grade)[1])
        obj['Stat_DEFENSE_MAGICAL'] = int(tosutil.tos_item_get_basic_mdef(row, item_grade))
        obj['Stat_DEFENSE_PHYSICAL'] = int(tosutil.tos_item_get_basic_def(row, item_grade))
        obj['TypeAttack'] = parse_equipment_type_attack(row['AttackType'].upper())
        obj['TypeEquipment'] = parse_equipment_type_equipment(row['ClassType'].upper())
        obj['Unidentified'] = int(row['NeedAppraisal']) == 1
        obj['UnidentifiedRandom'] = int(row['NeedRandomOption']) == 1

        # HotFix: if it's a Rapier, use THRUST as the TypeAttack
        if obj['TypeEquipment'] == TYPE_EQUIPMENT.RAPIER:
            obj['TypeAttack'] = TYPE_ATTACK.THRUST

        # HotFix: in case it doesn't give physical nor magical defense (e.g. agny necklace)
        if 'ADD_FIRE' in row['BasicTooltipProp'].split(','):
            lv = tosutil.tos_item_get_lv(row)
            gradeRatio = (int(item_grade['BasicRatio']) / 100.0)

            row['ADD_FIRE'] = floor(lv * gradeRatio)

        # Bonuses
        for stat in EQUIPMENT_STAT_COLUMNS:
            value = floor(float(row[stat]))

            if value != 0:
                obj['Bonuses'].append([
                    parse_equipment_stat(stat),
                    value
                ])

        # More Bonuses
        if 'OptDesc' in row and len(row['OptDesc']) > 0:
            for bonus in parser_translations.parse_translation_key(row['OptDesc']).split('{nl}'):
                obj['Bonuses'].append([
                    EQUIPMENT_STAT.UNKNOWN,
                    bonus.replace('-', '').strip()
                ])


def parse_equipment_grade(grade):
    return [
        None,
        EQUIPMENT_GRADE.NORMAL,
        EQUIPMENT_GRADE.MAGIC,
        EQUIPMENT_GRADE.RARE,
        EQUIPMENT_GRADE.UNIQUE,
        EQUIPMENT_GRADE.LEGENDARY,
    ][grade]


def parse_equipment_material(material):
    return {
        'CLOTH': EQUIPMENT_MATERIAL.CLOTH,
        'GHOST': EQUIPMENT_MATERIAL.GHOST,
        'IRON': EQUIPMENT_MATERIAL.PLATE,
        'LEATHER': EQUIPMENT_MATERIAL.LEATHER,
        '': EQUIPMENT_MATERIAL.UNKNOWN,
    }[material]


def parse_equipment_stat(stat):
    return {
        'ADD_MATK': EQUIPMENT_STAT.ATTACK_MAGICAL,
        'ADD_MINATK': EQUIPMENT_STAT.ATTACK_LIMIT_MIN,
        'ADD_MAXATK': EQUIPMENT_STAT.ATTACK_LIMIT_MAX,
        'ADD_DEF': EQUIPMENT_STAT.DEFENSE_PHYSICAL,
        'CRTHR': EQUIPMENT_STAT.CRITICAL_RATE,
        'CRTATK': EQUIPMENT_STAT.CRITICAL_ATTACK,
        'CRTDR': EQUIPMENT_STAT.CRITICAL_DEFENSE,
        'ADD_HR': EQUIPMENT_STAT.ACCURACY,
        'ADD_DR': EQUIPMENT_STAT.EVASION,
        'STR': EQUIPMENT_STAT.STR,
        'DEX': EQUIPMENT_STAT.DEX,
        'CON': EQUIPMENT_STAT.CON,
        'INT': EQUIPMENT_STAT.INT,
        'MNA': EQUIPMENT_STAT.SPR,
        'SR': EQUIPMENT_STAT.AOE_ATTACK_RATIO,
        'SDR': EQUIPMENT_STAT.AOE_DEFENSE_RATIO,
        'ADD_MHR': EQUIPMENT_STAT.ATTACK_MAGICAL_AMPLIFICATION,
        'ADD_MDEF': EQUIPMENT_STAT.DEFENSE_MAGICAL,
        'SkillRange': EQUIPMENT_STAT.ATTACK_RANGE,
        'BlockRate': EQUIPMENT_STAT.BLOCK_RATE,
        'BLK_BREAK': EQUIPMENT_STAT.BLOCK_PENETRATION,
        'MSPD': EQUIPMENT_STAT.MOVEMENT_SPEED,
        'MHP': EQUIPMENT_STAT.HP,
        'MSP': EQUIPMENT_STAT.SP,
        'MSTA': EQUIPMENT_STAT.STAMINA,
        'RHP': EQUIPMENT_STAT.HP_RECOVERY,
        'RSP': EQUIPMENT_STAT.SP_RECOVERY,
        'RSTA': EQUIPMENT_STAT.STAMINA_RECOVERY,
        'ADD_CLOTH': EQUIPMENT_STAT.ATTACK_MATERIAL_CLOTH,
        'ADD_LEATHER': EQUIPMENT_STAT.ATTACK_MATERIAL_LEATHER,
        'ADD_IRON': EQUIPMENT_STAT.ATTACK_MATERIAL_PLATE,
        'ADD_GHOST': EQUIPMENT_STAT.ATTACK_MATERIAL_GHOST,
        'ADD_SMALLSIZE': EQUIPMENT_STAT.ATTACK_SIZE_SMALL,
        'ADD_MIDDLESIZE': EQUIPMENT_STAT.ATTACK_SIZE_MEDIUM,
        'ADD_LARGESIZE': EQUIPMENT_STAT.ATTACK_SIZE_LARGE,
        'ADD_FORESTER': EQUIPMENT_STAT.ATTACK_RACE_PLANT,
        'ADD_WIDLING': EQUIPMENT_STAT.ATTACK_RACE_BEAST,
        'ADD_VELIAS': EQUIPMENT_STAT.ATTACK_RACE_DEVIL,
        'ADD_PARAMUNE': EQUIPMENT_STAT.ATTACK_RACE_MUTANT,
        'ADD_KLAIDA': EQUIPMENT_STAT.ATTACK_RACE_INSECT,
        'ADD_FIRE': EQUIPMENT_STAT.ATTACK_ELEMENT_FIRE,
        'ADD_ICE': EQUIPMENT_STAT.ATTACK_ELEMENT_ICE,
        'ADD_POISON': EQUIPMENT_STAT.ATTACK_ELEMENT_POISON,
        'ADD_LIGHTNING': EQUIPMENT_STAT.ATTACK_ELEMENT_LIGHTNING,
        'ADD_EARTH': EQUIPMENT_STAT.ATTACK_ELEMENT_EARTH,
        'ADD_SOUL': EQUIPMENT_STAT.ATTACK_ELEMENT_PSYCHOKINESIS,
        'ADD_HOLY': EQUIPMENT_STAT.ATTACK_ELEMENT_HOLY,
        'ADD_DARK': EQUIPMENT_STAT.ATTACK_ELEMENT_DARK,
        'Aries': EQUIPMENT_STAT.ATTACK_TYPE_PIERCING,
        'AriesDEF': EQUIPMENT_STAT.DEFENSE_TYPE_PIERCING,
        'Slash': EQUIPMENT_STAT.ATTACK_TYPE_SLASH,
        'SlashDEF': EQUIPMENT_STAT.DEFENSE_TYPE_SLASH,
        'Strike': EQUIPMENT_STAT.ATTACK_TYPE_STRIKE,
        'StrikeDEF': EQUIPMENT_STAT.DEFENSE_TYPE_STRIKE,
        'RES_FIRE': EQUIPMENT_STAT.DEFENSE_ELEMENT_FIRE,
        'RES_ICE': EQUIPMENT_STAT.DEFENSE_ELEMENT_ICE,
        'RES_POISON': EQUIPMENT_STAT.DEFENSE_ELEMENT_POISON,
        'RES_LIGHTNING': EQUIPMENT_STAT.DEFENSE_ELEMENT_LIGHTNING,
        'RES_EARTH': EQUIPMENT_STAT.DEFENSE_ELEMENT_EARTH,
        'RES_SOUL': EQUIPMENT_STAT.DEFENSE_ELEMENT_PSYCHOKINESIS,
        'RES_HOLY': EQUIPMENT_STAT.DEFENSE_ELEMENT_HOLY,
        'RES_DARK': EQUIPMENT_STAT.DEFENSE_ELEMENT_DARK,
        'LootingChance': EQUIPMENT_STAT.LOOTING_CHANCE,
    }[stat]


def parse_equipment_statgrade():
    logging.debug('Parsing equipment grade...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'item_grade.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        equipment_grade[int(row['Grade'])] = row

    ies_file.close()


def parse_equipment_type_attack(attack):
    return {
        'ARIES': TYPE_ATTACK.PIERCING,
        'ARROW': TYPE_ATTACK.BOW,
        'CANNON': TYPE_ATTACK.CANNON,
        'GUN': TYPE_ATTACK.GUN,
        'SLASH': TYPE_ATTACK.SLASH,
        'STRIKE': TYPE_ATTACK.STRIKE,
        '': TYPE_ATTACK.UNKNOWN
    }[attack]


def parse_equipment_type_equipment(equipment):
    mapping = {
        'ARMBAND': TYPE_EQUIPMENT.COSTUME_ARMBAND,
        'ARTEFACT': TYPE_EQUIPMENT.COSTUME_TOY,
        'BOOTS': TYPE_EQUIPMENT.SHOES,
        'BOW': TYPE_EQUIPMENT.ONE_HANDED_BOW,
        'CANNON': TYPE_EQUIPMENT.CANNON,
        'CHARM': TYPE_EQUIPMENT.CHARM,
        'DAGGER': TYPE_EQUIPMENT.DAGGER,
        'EFFECTCOSTUME': TYPE_EQUIPMENT.COSTUME_EFFECT,
        'GLOVES': TYPE_EQUIPMENT.GLOVES,
        'HAIR': TYPE_EQUIPMENT.COSTUME_HAIR,
        'HAT': TYPE_EQUIPMENT.COSTUME_HAIR_ACCESSORY,
        'HELMET': TYPE_EQUIPMENT.COSTUME_HELMET,
        'LENS': TYPE_EQUIPMENT.COSTUME_LENS,
        'MACE': TYPE_EQUIPMENT.ONE_HANDED_MACE,
        'MUSKET': TYPE_EQUIPMENT.TWO_HANDED_GUN,
        'NECK': TYPE_EQUIPMENT.NECKLACE,
        'OUTER': TYPE_EQUIPMENT.COSTUME_OUTFIT,
        'PANTS': TYPE_EQUIPMENT.BOTTOM,
        'PISTOL': TYPE_EQUIPMENT.ONE_HANDED_GUN,
        'RAPIER': TYPE_EQUIPMENT.RAPIER,
        'RING': TYPE_EQUIPMENT.BRACELET,
        'SHIELD': TYPE_EQUIPMENT.SHIELD,
        'SHIRT': TYPE_EQUIPMENT.TOP,
        'SPEAR': TYPE_EQUIPMENT.ONE_HANDED_SPEAR,
        'SPECIALCOSTUME': TYPE_EQUIPMENT.COSTUME_SPECIAL,
        'STAFF': TYPE_EQUIPMENT.ONE_HANDED_STAFF,
        'SWORD': TYPE_EQUIPMENT.ONE_HANDED_SWORD,
        'THBOW': TYPE_EQUIPMENT.TWO_HANDED_BOW,
        'THMACE': TYPE_EQUIPMENT.TWO_HANDED_MACE,
        'THSPEAR': TYPE_EQUIPMENT.TWO_HANDED_SPEAR,
        'THSTAFF': TYPE_EQUIPMENT.TWO_HANDED_STAFF,
        'THSWORD': TYPE_EQUIPMENT.TWO_HANDED_SWORD,
        'WING': TYPE_EQUIPMENT.COSTUME_WING,
        '': None
    }

    return mapping[equipment] if equipment in mapping else None
