import csv
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations, parser_assets
from ipf_parser.utils.tosenum import TOSEnum


class TOSJobDifficulty(TOSEnum):
    EASY = 0
    NORMAL = 1
    HARD = 2

    @staticmethod
    def value_of(string):
        return {
            'EASY': TOSJobDifficulty.EASY,
            'NORMAL': TOSJobDifficulty.NORMAL,
            'HARD': TOSJobDifficulty.HARD,
            '': None,
        }[string.upper()]


class TOSJobTree(TOSEnum):
    ARCHER = 0
    CLERIC = 1
    WARRIOR = 2
    WIZARD = 3

    @staticmethod
    def value_of(string):
        return {
            'ARCHER': TOSJobTree.ARCHER,
            'CLERIC': TOSJobTree.CLERIC,
            'WARRIOR': TOSJobTree.WARRIOR,
            'WIZARD': TOSJobTree.WIZARD,
        }[string.upper()]


class TOSJobType(TOSEnum):
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
            'ATTACK': TOSJobType.ATTACK,
            'CONTROL': TOSJobType.SUPPORT_CONTROL,
            'CRAFT': TOSJobType.CRAFTING,
            'CRAFTING': TOSJobType.CRAFTING,
            'DEFENSE': TOSJobType.DEFENSE,
            'INSTALL TYPE ATTACK': TOSJobType.ATTACK_INSTALL,
            'MANEUVERING ATTACK': TOSJobType.ATTACK_MOBILITY,
            'OFFENSE': TOSJobType.ATTACK,
            'PARTY': TOSJobType.SUPPORT_PARTY,
            'PROVOKE': TOSJobType.DEFENSE_PROVOKE,
            'SUMMON': TOSJobType.ATTACK_SUMMON,
            'SUPPORT': TOSJobType.SUPPORT,
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

            obj['CircleMax'] = int(row['MaxCircle'])
            obj['JobDifficulty'] = TOSJobDifficulty.value_of(parser_translations.translate(row['ControlDifficulty']))
            obj['JobTree'] = TOSJobTree.value_of(row['CtrlType'])
            obj['JobType'] = [TOSJobType.value_of(v.strip()) for v in parser_translations.translate(row['ControlType']).split(',')] if len(row['ControlType']) else None
            obj['IsHidden'] = row['HiddenJob'] == 'YES'
            obj['IsSecret'] = obj['IsHidden'] and row['RemoveBan'] == 'ON'
            obj['Rank'] = int(row['Rank'])
            obj['Stat_CON'] = int(row['CON'])
            obj['Stat_DEX'] = int(row['DEX'])
            obj['Stat_INT'] = int(row['INT'])
            obj['Stat_SPR'] = int(row['MNA'])
            obj['Stat_STR'] = int(row['STR'])

            obj['Link_Attributes'] = []
            obj['Link_Skills'] = []

            globals.jobs[obj['$ID']] = obj
            globals.jobs_by_name[obj['$ID_NAME']] = obj


def parse_links():
    parse_links_attributes()
    parse_links_skills()


def parse_links_attributes():
    logging.debug('Parsing attributes for jobs...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'job.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            job = globals.jobs_by_name[row['ClassName']]

            ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies_ability.ipf', 'ability_' + row['EngName'] + '.ies')

            # If this job is still under development, skip
            if not os.path.isfile(ies_path):
                continue

            with open(ies_path, 'rb') as ies_file:
                for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
                    attribute = globals.get_attribute_link(row['ClassName'])
                    job['Link_Attributes'].append(attribute)


def parse_links_skills():
    logging.debug('Parsing skills for jobs...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'skilltree.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            job = '_'.join(row['ClassName'].split('_')[:2])
            job = globals.jobs_by_name[job]
            job['Link_Skills'].append(globals.get_skill_link(row['SkillName']))
