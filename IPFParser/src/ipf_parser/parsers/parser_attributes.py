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
            obj['Description'] = parser_translations.translate(row['Desc']) + '{nl}'
            obj['Icon'] = parser_assets.parse_entity_icon(row['Icon'])
            obj['Name'] = parser_translations.translate(row['Name'])

            obj['IsToggleable'] = row['AlwaysActive'] == 'NO'

            obj['LevelMax'] = -1
            obj['UpgradePrice'] = None
            obj['UpgradeTime'] = None
            obj['Link_Jobs'] = []
            obj['Link_Skill'] = None
            obj['Link_UnlockJob'] = []
            obj['Link_UnlockSkill'] = None

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

            # If this job is still under development, skip
            if not os.path.isfile(ies_path):
                continue

            with open(ies_path, 'rb') as ies_file:
                for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
                    attribute = globals.attributes_by_name[row['ClassName']]
                    attribute['Description'] = attribute['Description'] + '{nl}{b}' + parser_translations.translate(row['UnlockDesc']) + '{b}'
                    attribute['LevelMax'] = int(row['MaxLevel'])

                    # Parse attribute unlock
                    if row['UnlockArgStr'] in globals.jobs_by_name:
                        attribute['Link_UnlockJob'].append({
                            'Job': globals.get_job_link(row['UnlockArgStr']),
                            'Level': int(row['UnlockArgNum'])
                        })
                    elif row['UnlockArgStr'] in globals.skills_by_name:
                        attribute['Link_UnlockSkill'] = {
                            'Level': int(row['UnlockArgNum']),
                            'Skill': globals.get_skill_link(row['UnlockArgStr'])
                        }

                    # Parse attribute cost
                    if row['ScrCalcPrice']:
                        attribute['UpgradePrice'] = [
                            LUA[row['ScrCalcPrice']](None, row['ClassName'], l, attribute['LevelMax'])[0]
                            for l in range(int(row['MaxLevel']))
                        ]
                        attribute['UpgradeTime'] = [
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


def parse_clean():
    attributes_to_remove = []

    # Find which attributes are no longer active
    for attribute in globals.attributes.values():
        found = False

        for job in globals.jobs.values():
            for link in job['Link_Attributes']:
                if link.entity['$ID'] == attribute['$ID']:
                    if attribute['$ID'] == 114002:
                        logging.debug('found at: %s', job['Name'])

                    found = True
                    break

            if found:
                break

        if not found:
            attributes_to_remove.append(attribute)

    # Remove all inactive attributes
    for attribute in attributes_to_remove:
        del globals.attributes[attribute['$ID']]
        del globals.attributes_by_name[attribute['$ID_NAME']]

        attribute_id = attribute['$ID']

        for job in globals.jobs.values():
            job['Link_Attributes'] = [link for link in job['Link_Attributes'] if link.entity['$ID'] != attribute_id]
        for skill in globals.skills.values():
            skill['Link_Attributes'] = [link for link in skill['Link_Attributes'] if link.entity['$ID'] != attribute_id]
