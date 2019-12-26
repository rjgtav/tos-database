import csv
import logging
import os

import constants
import globals
from parserr import parser_assets
from parserr import parser_translations
from utils import luautil


def parse():
    parse_attributes()


def parse_attributes():
    logging.debug('Parsing attributes...')

    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies_ability.ipf', 'ability.ies')

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
            obj['Link_Skills'] = [skill for skill in row['SkillCategory'].split(';') if len(skill)]

            globals.attributes[obj['$ID']] = obj
            globals.attributes_by_name[obj['$ID_NAME']] = obj


def parse_links():
    parse_links_jobs()
    parse_links_skills()


def parse_links_jobs():
    logging.debug("Parsing attributes <> jobs...")

    LUA_RUNTIME = luautil.LUA_RUNTIME
    LUA_SOURCE = luautil.LUA_SOURCE

    # Parse level, unlock and formula
    ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies.ipf', 'job.ies')

    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            job = globals.jobs_by_name[row['ClassName']]
            ies_path = os.path.join(constants.PATH_INPUT_DATA, 'ies_ability.ipf', 'ability_' + row['EngName'].lower() + '.ies')

            # If this job is still under development, skip
            if not os.path.isfile(ies_path):
                continue

            with open(ies_path, 'rb') as ies_file:
                for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
                    if row['ClassName'] not in globals.attributes_by_name:
                        logging.warn('Missing attribute in ability.ies: %s', row['ClassName'])
                        continue

                    attribute = globals.attributes_by_name[row['ClassName']]
                    attribute['DescriptionRequired'] = attribute['DescriptionRequired'] if attribute['DescriptionRequired'] else ''
                    attribute['DescriptionRequired'] = attribute['DescriptionRequired'] + '{nl}{b}' + parser_translations.translate(row['UnlockDesc']) + '{b}'
                    attribute['LevelMax'] = int(row['MaxLevel'])

                    # Parse attribute cost
                    if row['ScrCalcPrice']:
                        for lv in range(int(row['MaxLevel'])):
                            attribute['UpgradePrice'].append(LUA_RUNTIME[row['ScrCalcPrice']](None, row['ClassName'], lv + 1, attribute['LevelMax'])[0])
                        attribute['UpgradePrice'] = [value for value in attribute['UpgradePrice'] if value > 0]

                    # Parse attribute skill (in case it is missing in the ability.ies)
                    if not attribute['Link_Skills'] and row['UnlockArgStr'] in globals.skills_by_name:
                        logging.debug('adding missing skill %s', row['UnlockArgStr'])
                        skill = globals.skills_by_name[row['UnlockArgStr']]

                        globals.link(
                            attribute, 'Link_Skills', globals.get_attribute_link(attribute),
                            skill, 'Link_Attributes', globals.get_skill_link(skill)
                        )

                    # Parse attribute job
                    if not attribute['Link_Skills'] or 'All' in attribute['Link_Skills']:
                        globals.link(
                            attribute, 'Link_Jobs', globals.get_attribute_link(attribute),
                            job, 'Link_Attributes', globals.get_job_link(job)
                        )

                    # Parse attribute unlock
                    attribute['Unlock'] = luautil.lua_function_source_to_javascript(
                        luautil.lua_function_source(LUA_SOURCE[row['UnlockScr']])[1:-1]  # remove 'function' and 'end'
                    ) if not attribute['Unlock'] and row['UnlockScr'] else attribute['Unlock']

                    attribute['UnlockArgs'][job['$ID']] = {
                        'UnlockArgStr': row['UnlockArgStr'],
                        'UnlockArgNum': row['UnlockArgNum'],
                    }


def parse_links_skills():
    logging.debug("Parsing attributes <> skills...")

    for attribute in globals.attributes.values():
        for skill in attribute['Link_Skills']:
            if isinstance(skill, (basestring,)) and skill != 'All' and skill in globals.skills_by_name:
                skill = globals.skills_by_name[skill]

                globals.link(
                    attribute, 'Link_Skills', globals.get_attribute_link(attribute),
                    skill, 'Link_Attributes', globals.get_skill_link(skill)
                )

        attribute['Link_Skills'] = [skill for skill in attribute['Link_Skills'] if not isinstance(skill, (basestring,))]


def parse_clean():
    attributes_to_remove = []

    # Find which attributes are no longer active
    for attribute in globals.attributes.values():
        if not attribute['Link_Jobs'] and not attribute['Link_Skills']:
            attributes_to_remove.append(attribute)
        elif attribute['LevelMax'] == -1 and attribute['Link_Skills'] is not None:
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
