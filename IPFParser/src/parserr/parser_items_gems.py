import csv
import logging
import os
import xml.etree.ElementTree as ET

import constants
import globals
from parserr import parser_translations
from parserr.parser_items_equipment import TOSEquipmentStat
from utils.tosenum import TOSEnum


class TOSGemType(TOSEnum):
    SKILL = 0
    STATS = 1

    @staticmethod
    def value_of(string):
        return {
            'GEM': TOSGemType.STATS,
            'GEM_SKILL': TOSGemType.SKILL,
        }[string.upper()]


def parse(is_rebuild):
    parse_gems()
    parse_gems_bonus(is_rebuild)


def parse_gems():
    logging.debug('Parsing gems...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'item_gem.ies')
    ies_file = open(ies_path, 'rb')
    ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

    for row in ies_reader:
        obj = globals.gems_by_name[row['ClassName']]
        obj['BonusBoots'] = []
        obj['BonusGloves'] = []
        obj['BonusSubWeapon'] = []
        obj['BonusTopAndBottom'] = []
        obj['BonusWeapon'] = []
        obj['TypeGem'] = TOSGemType.value_of(row['EquipXpGroup'])

    ies_file.close()


def parse_gems_bonus(is_rebuild):
    logging.debug('Parsing gems bonus...')

    xml_path = os.path.join(constants.PATH_INPUT_DATA, 'xml.ipf', 'socket_property.xml')
    xml = ET.parse(xml_path).getroot()

    SLOTS = ['TopLeg', 'HandOrFoot', 'MainOrSubWeapon'] if is_rebuild else\
            ['TopLeg', 'Foot', 'Hand', 'Weapon', 'SubWeapon']

    # example: <Item Name="gem_circle_1">
    for item in xml:
        gem = globals.gems_by_name[item.get('Name')]

        for level in item:
            if level.get('Level') == '0':
                continue

            for slot in SLOTS:
                bonus = level.get('PropList_' + slot)
                penalty = level.get('PropList_' + slot + '_Penalty')

                for slot in (slot.split('Or') if 'Or' in slot else [slot]): # support for Re:Build 2-in-1 slots
                    for prop in [bonus, penalty]:
                        if prop is not None and prop != 'None':
                            if gem['TypeGem'] == TOSGemType.SKILL:
                                gem['Bonus' + parse_gems_slot(slot)].append({
                                    'Stat': parser_translations.translate(prop).replace('OptDesc/', '')
                                })
                            elif gem['TypeGem'] == TOSGemType.STATS:
                                prop_slot = prop.split('/')

                                stat = TOSEquipmentStat.value_of('ADD_' + prop_slot[0])
                                stat = TOSEquipmentStat.value_of(prop_slot[0]) if stat is None else stat

                                gem['Bonus' + parse_gems_slot(slot)].append({
                                    'Stat': stat,
                                    'Value': int(prop_slot[1])
                                })


def parse_gems_slot(key):
    return {
        'Foot': 'Boots',
        'Hand': 'Gloves',
        'Main': 'Weapon',
        'SubWeapon': 'SubWeapon',
        'TopLeg': 'TopAndBottom',
        'Weapon': 'Weapon',
    }[key]


def parse_links():
    parse_links_skills()


def parse_links_skills():
    logging.debug('Parsing skills for gems...')

    for gem in globals.gems.values():
        skill = gem['$ID_NAME'][len('Gem_'):]
        skill = globals.get_skill_link(skill)
        gem['Link_Skill'] = skill
