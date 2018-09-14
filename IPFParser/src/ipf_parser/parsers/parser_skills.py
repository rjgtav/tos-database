import csv
import logging
import os
import re

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations, parser_assets
from ipf_parser.parsers.parser_enums import TOSElement, TOSAttackType
from ipf_parser.utils import luautil
from ipf_parser.utils.tosenum import TOSEnum


class TOSSkillCompanion(TOSEnum):
    BOTH = 0
    NO = 1
    YES = 2

    @staticmethod
    def value_of(string):
        return {
            'BOTH': TOSSkillCompanion.BOTH,
            '': TOSSkillCompanion.NO,
            'YES': TOSSkillCompanion.YES,
        }[string.upper()]


EFFECTS = []


def parse():
    parse_skills()


def parse_skills():
    logging.debug('Parsing skills...')

    LUA = luautil.load_script('calc_property_skill.lua', '*', False)

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'skill.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            obj = {}
            obj['$ID'] = int(row['ClassID'])
            obj['$ID_NAME'] = row['ClassName']
            obj['Description'] = parser_translations.translate(row['Caption'])
            obj['Icon'] = parser_assets.parse_entity_icon(row['Icon'])
            obj['Name'] = parser_translations.translate(row['Name'])

            obj['CoolDown'] = int(row['BasicCoolDown']) / 1000
            obj['Effect'] = parser_translations.translate(row['Caption2'])
            obj['Element'] = TOSElement.value_of(row['Attribute'])
            obj['SP'] = float(row['BasicSP'])
            obj['SPPerLevel'] = float(row['LvUpSpendSp'])
            obj['RequiredCompanion'] = TOSSkillCompanion.value_of(row['EnableCompanion'])
            obj['RequiredStance'] = row['ReqStance'].split(';') if len(row['ReqStance']) else None
            obj['RequiredSubWeapon'] = row['UseSubweaponDamage'] == 'YES'
            obj['TypeAttack'] = TOSAttackType.value_of(row['AttackType'])

            obj['LevelMax'] = -1
            obj['LevelPerCircle'] = -1
            obj['RequiredCircle'] = -1
            obj['Link_Attributes'] = []
            obj['Link_Gem'] = None
            obj['Link_Job'] = None

            # Parse effects
            for effect in re.findall(r'{(.*?)}', obj['Effect']):
                if effect in row:
                    key = 'Effect' + effect

                    if key not in EFFECTS:
                        EFFECTS.append('Effect' + effect)

                    obj[key] = row[effect]
                    obj[key] = luautil.lua_function_to_javascript(LUA[obj[key]]) if obj[key] != 'ZERO' else None
                else:
                    continue

            globals.skills[obj['$ID']] = obj
            globals.skills_by_name[obj['$ID_NAME']] = obj

    # HotFix: make sure all skills have the same Effect columns
    for skill in globals.skills.values():
        for effect in EFFECTS:
            if effect not in skill:
                skill[effect] = None


def parse_links():
    parse_links_attributes()
    parse_links_gems()
    parse_links_jobs()


def parse_links_attributes():
    logging.debug('Parsing attributes for skills...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies_ability.ipf', 'ability.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            if row['SkillCategory'] not in globals.skills_by_name:
                continue

            skill = globals.skills_by_name[row['SkillCategory']]
            skill['Link_Attributes'].append(globals.get_attribute_link(row['ClassName']))


def parse_links_gems():
    logging.debug('Parsing gems for skills...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'item_gem.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            skill = row['ClassName'][len('Gem_'):]

            if skill not in globals.skills_by_name:
                continue

            skill = globals.skills_by_name[skill]
            skill['Link_Gem'] = globals.get_gem_link(row['ClassName'])


def parse_links_jobs():
    logging.debug('Parsing jobs for skills...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'skilltree.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            skill = globals.skills_by_name[row['SkillName']]
            skill['LevelMax'] = int(row['MaxLevel'])
            skill['LevelPerCircle'] = int(row['LevelPerGrade'])
            skill['RequiredCircle'] = int(row['UnlockGrade'])

            job = '_'.join(row['ClassName'].split('_')[:2])
            skill['Link_Job'] = globals.get_job_link(job)
