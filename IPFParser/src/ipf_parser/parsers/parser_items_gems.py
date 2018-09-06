import csv
import logging
import os
import xml.etree.ElementTree as ET

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations, parser_items_equipment
from ipf_parser.utils.enum import enum

GEM_TYPE = enum(
    'SKILL',
    'STATS',
)


def parse():
    parse_gems()
    parse_gems_bonus()


def parse_gems():
    logging.debug('Parsing gems...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'item_gem.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        obj = globals.gems_by_name[row['ClassName']]
        obj['BonusBoots'] = []
        obj['BonusGloves'] = []
        obj['BonusSubWeapon'] = []
        obj['BonusTopAndBottom'] = []
        obj['BonusWeapon'] = []
        obj['TypeGem'] = parse_gems_type(row['EquipXpGroup'])

    ies_file.close()


def parse_gems_bonus():
    logging.debug('Parsing gems bonus...')

    xml_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'xml.ipf', 'socket_property.xml')
    xml = ET.parse(xml_path).getroot()

    # example: <Item Name="gem_circle_1">
    for item in xml:
        gem = globals.gems_by_name[item.get('Name')]

        for level in item:
            if level.get('Level') == '0':
                continue

            for slot in ['TopLeg', 'Foot', 'Hand', 'Weapon', 'SubWeapon']:
                bonus = level.get('PropList_' + slot)
                penalty = level.get('PropList_' + slot + '_Penalty')

                for prop in [bonus, penalty]:
                    if prop is not None and prop != 'None':

                        if gem['TypeGem'] == GEM_TYPE.SKILL:
                            gem['Bonus' + parse_gems_slot(slot)].append({
                                'Stat': parser_translations.translate(prop).replace('OptDesc/', '')
                            })
                        elif gem['TypeGem'] == GEM_TYPE.STATS:
                            prop = prop.split('/')
                            prop[0] = 'ADD_DR' if prop[0] == 'DR' else prop[0]
                            prop[0] = 'ADD_DR' if prop[0] == 'DR' else prop[0]
                            prop[0] = 'ADD_HR' if prop[0] == 'HR' else prop[0]
                            prop[0] = 'ADD_MATK' if prop[0] == 'MATK' else prop[0]
                            prop[0] = 'ADD_MDEF' if prop[0] == 'MDEF' else prop[0]
                            prop[0] = 'ADD_PATK' if prop[0] == 'PATK' else prop[0]
                            prop[0] = 'ADD_DEF' if prop[0] == 'DEF' else prop[0]

                            gem['Bonus' + parse_gems_slot(slot)].append({
                                'Stat': parser_items_equipment.parse_equipment_stat(prop[0]),
                                'Value': int(prop[1])
                            })


def parse_gems_slot(key):
    return {
        'Foot': 'Boots',
        'Hand': 'Gloves',
        'TopLeg': 'TopAndBottom',
        'SubWeapon': 'SubWeapon',
        'Weapon': 'Weapon',
        '': None
    }[key]


def parse_gems_type(key):
    return {
        'Gem': GEM_TYPE.STATS,
        'Gem_Skill': GEM_TYPE.SKILL,
        '': None
    }[key]


def parse_links():
    return  # TODO: link with skills
