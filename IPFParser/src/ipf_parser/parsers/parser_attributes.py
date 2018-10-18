import csv
import logging
import os
import re

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
            obj['Description'] = parser_translations.translate(row['Desc']).strip() + '{nl}'
            obj['Icon'] = parser_assets.parse_entity_icon(row['Icon'])
            obj['Name'] = parser_translations.translate(row['Name'])

            obj['IsToggleable'] = row['AlwaysActive'] == 'NO'

            obj['DescriptionRequired'] = None
            obj['LevelMax'] = -1
            obj['Unlock'] = None
            obj['UnlockArgs'] = {}
            obj['UpgradePrice'] = []
            obj['Link_Jobs'] = []
            obj['Link_Skill'] = None

            globals.attributes[obj['$ID']] = obj
            globals.attributes_by_name[obj['$ID_NAME']] = obj


def parse_links():
    parse_links_jobs()
    parse_links_skills()


def parse_links_jobs():
    logging.debug("Parsing jobs for attributes...")

    LUA = luautil.load_script('ability_price.lua', '*')
    LUA_UNLOCK = luautil.load_script('ability_unlock.lua', '*', False)

    # Parse level, unlock and formula
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
                    attribute = globals.attributes_by_name[row['ClassName']]
                    attribute['DescriptionRequired'] = attribute['DescriptionRequired'] if attribute['DescriptionRequired'] else ''
                    attribute['DescriptionRequired'] = attribute['DescriptionRequired'] + '{nl}{b}' + parser_translations.translate(row['UnlockDesc']) + '{b}'
                    attribute['LevelMax'] = int(row['MaxLevel'])

                    # Parse attribute cost
                    if row['ScrCalcPrice']:
                        for lv in range(int(row['MaxLevel'])):
                            attribute['UpgradePrice'].append(LUA[row['ScrCalcPrice']](None, row['ClassName'], lv, attribute['LevelMax'])[0])
                        attribute['UpgradePrice'] = [value for value in attribute['UpgradePrice'] if value > 0]

                    # Parse attribute job
                    attribute['Link_Jobs'].append(globals.get_job_link(job['$ID_NAME']))

                    # Parse attribute unlock
                    attribute['Unlock'] = luautil.lua_function_source_to_javascript(
                        luautil.lua_function_source(
                            LUA_UNLOCK[row['UnlockScr']]
                        )
                    ) if attribute['Unlock'] is None else attribute['Unlock']

                    attribute['UnlockArgs'][job['$ID']] = {
                        'UnlockArgStr': row['UnlockArgStr'],
                        'UnlockArgNum': row['UnlockArgNum'],
                    }


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
