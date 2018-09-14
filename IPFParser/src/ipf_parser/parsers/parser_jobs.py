import csv
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations, parser_assets
from ipf_parser.utils.tosenum import TOSEnum


class TOSClassDifficulty(TOSEnum):
    EASY = 0
    NORMAL = 1
    HARD = 2

    @staticmethod
    def value_of(string):
        return {
            'EASY': TOSClassDifficulty.EASY,
            'NORMAL': TOSClassDifficulty.NORMAL,
            'HARD': TOSClassDifficulty.HARD,
            '': None,
        }[string.upper()]


class TOSClassTree(TOSEnum):
    ARCHER = 0
    CLERIC = 1
    WARRIOR = 2
    WIZARD = 3

    @staticmethod
    def value_of(string):
        return {
            'ARCHER': TOSClassTree.ARCHER,
            'CLERIC': TOSClassTree.CLERIC,
            'WARRIOR': TOSClassTree.WARRIOR,
            'WIZARD': TOSClassTree.WIZARD,
        }[string.upper()]


class TOSClassType(TOSEnum):
    ATTACK = 0
    ATTACK_INSTALL = 1
    ATTACK_MOBILITY = 2
    ATTACK_SUMMON = 3
    CRAFTING = 4
    DEFENSE = 5
    DEFENSE_PROVOKE = 6
    SUPPORT = 7
    SUPPORT_CONTROL = 8
    SUPPORT_PARTY = 9

    @staticmethod
    def value_of(string):
        return {
            'ATTACK': TOSClassType.ATTACK,
            'CONTROL': TOSClassType.SUPPORT_CONTROL,
            'CRAFT': TOSClassType.CRAFTING,
            'CRAFTING': TOSClassType.CRAFTING,
            'DEFENSE': TOSClassType.DEFENSE,
            'INSTALL TYPE ATTACK': TOSClassType.ATTACK_INSTALL,
            'MANEUVERING ATTACK': TOSClassType.ATTACK_MOBILITY,
            'OFFENSE': TOSClassType.ATTACK,
            'PARTY': TOSClassType.SUPPORT_PARTY,
            'PROVOKE': TOSClassType.DEFENSE_PROVOKE,
            'SUMMON': TOSClassType.ATTACK_SUMMON,
            'SUPPORT': TOSClassType.SUPPORT,
            '': None
        }[string.upper()]


def parse():
    parse_classes()


def parse_classes():
    logging.debug('Parsing jobs...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'job.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            obj = {}
            obj['$ID'] = int(row['ClassID'])
            obj['$ID_NAME'] = row['ClassName']
            obj['Description'] = parser_translations.translate(row['Caption1'])
            obj['Icon'] = parser_assets.parse_entity_icon(row['Icon'])
            obj['Name'] = parser_translations.translate(row['Name'])

            obj['CicleMax'] = int(row['MaxCircle'])
            obj['ClassTree'] = TOSClassTree.value_of(row['CtrlType'])
            obj['ClassType'] = [TOSClassType.value_of(v.strip()) for v in parser_translations.translate(row['ControlType']).split(',')]
            obj['Difficulty'] = TOSClassDifficulty.value_of(parser_translations.translate(row['ControlDifficulty']))
            obj['IsHidden'] = row['HiddenJob'] == 'YES'
            obj['IsSecret'] = obj['IsHidden'] and row['RemoveBan'] == 'YES'
            obj['Rank'] = int(row['Rank'])

            obj['Link_Attributes'] = []
            obj['Link_Skills'] = []

            globals.jobs[obj['$ID']] = obj
            globals.jobs_by_name[obj['$ID_NAME']] = obj


def parse_links():
    parse_links_attributes()
    parse_links_skills()


def parse_links_attributes():
    logging.debug('Parsing attributes for jobs...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies_ability.ipf', 'ability.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            attribute = globals.get_attribute_link(row['ClassName'])

            for j in row['Job'].split(';'):
                if j in globals.jobs_by_name:
                    job = globals.jobs_by_name[j]
                    job['Link_Attributes'].append(attribute)


def parse_links_skills():
    logging.debug('Parsing skills for jobs...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'skilltree.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            job = '_'.join(row['ClassName'].split('_')[:2])
            job = globals.jobs_by_name[job]
            job['Link_Skills'].append(globals.get_skill_link(row['SkillName']))
