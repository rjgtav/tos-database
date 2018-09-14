import csv
import logging
import os

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations, parser_assets
from ipf_parser.utils import luautil


def parse():
    parse_attributes()


def parse_attributes():
    logging.debug('Parsing attributes...')

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies_ability.ipf', 'ability.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            obj = {}
            obj['$ID'] = int(row['ClassID'])
            obj['$ID_NAME'] = row['ClassName']
            obj['Description'] = parser_translations.translate(row['Desc'])
            obj['Icon'] = parser_assets.parse_entity_icon(row['Icon'])
            obj['Name'] = parser_translations.translate(row['Name'])

            obj['IsToggleable'] = row['AlwaysActive'] == 'NO'

            obj['Price'] = None
            obj['LevelMax'] = -1
            obj['Time'] = None
            obj['UnlockLevel'] = -1
            obj['Link_Jobs'] = []
            obj['Link_Skill'] = None
            obj['Link_Unlock'] = None

            globals.attributes[obj['$ID']] = obj
            globals.attributes_by_name[obj['$ID_NAME']] = obj


def parse_links():
    parse_links_jobs()
    parse_links_skills()


def parse_links_jobs():
    logging.debug("Parsing jobs for attributes...")

    LUA = luautil.load_script('ability_price.lua', '*')

    # Parse level, unlock and formula
    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'job.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies_ability.ipf', 'ability_' + row['EngName'] + '.ies')

            # If this class is still under development, skip
            if not os.path.isfile(ies_path):
                continue

            with open(ies_path, 'rb') as ies_file:
                for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
                    attribute = globals.attributes_by_name[row['ClassName']]
                    attribute['LevelMax'] = int(row['MaxLevel'])
                    attribute['UnlockLevel'] = int(row['UnlockArgNum'])

                    # Parse attribute unlock
                    attribute['Link_Unlock'] =\
                        globals.get_job_link(row['UnlockArgStr']) if row['UnlockArgStr'] in globals.jobs_by_name else \
                        globals.get_skill_link(row['UnlockArgStr']) if row['UnlockArgStr'] in globals.skills_by_name else None

                    # Parse attribute cost
                    if row['ScrCalcPrice']:
                        attribute['Price'] = [
                            LUA[row['ScrCalcPrice']](None, row['ClassName'], l, attribute['LevelMax'])[0]
                            for l in range(int(row['MaxLevel']))
                        ]
                        attribute['Time'] = [
                            LUA[row['ScrCalcPrice']](None, row['ClassName'], l, attribute['LevelMax'])[1]
                            for l in range(int(row['MaxLevel']))
                        ]

    # Parse jobs
    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies_ability.ipf', 'ability.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            attribute = globals.attributes_by_name[row['ClassName']]
            attribute['Link_Jobs'] = [
                globals.get_job_link(j) for j in row['Job'].split(';')
                if j in globals.jobs_by_name
            ]


def parse_links_skills():
    logging.debug("Parsing skills for attributes...")

    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies_ability.ipf', 'ability.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            attribute = globals.attributes[int(row['ClassID'])]
            attribute['Link_Skill'] = globals.get_skill_link(row['SkillCategory'])