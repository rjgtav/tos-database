import csv
import logging
import math
import os
import re

from ipf_parser import constants, globals
from ipf_parser.parsers import parser_translations, parser_assets
from ipf_parser.parsers.parser_enums import TOSElement, TOSAttackType
from ipf_parser.utils import luautil
from ipf_parser.utils.tosenum import TOSEnum
from ipf_parser.overrides.override_skills import OVERRIDE_SKILLS


EFFECT_DEPRECATE = {
    'SkillAtkAdd': 'SkillFactor'
}


class TOSRequiredStanceCompanion(TOSEnum):
    BOTH = 0
    NO = 1
    YES = 2

    @staticmethod
    def value_of(string):
        return {
            'BOTH': TOSRequiredStanceCompanion.BOTH,
            '': TOSRequiredStanceCompanion.NO,
            'YES': TOSRequiredStanceCompanion.YES,
        }[string.upper()]


EFFECTS = []


def parse():
    parse_skills()
    parse_skills_stances()


def parse_skills():
    logging.debug('Parsing skills...')

    LUA = luautil.load_script('calc_property_skill.lua', '*', False)
    EMBED_SCR_ABIL_ADD_SKILLFACTOR = parse_skills_lua_clean(LUA['SCR_ABIL_ADD_SKILLFACTOR'][:-1])

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
            obj['Prop_BasicPoison'] = int(row['BasicPoison'])
            obj['Prop_LvUpSpendPoison'] = int(row['LvUpSpendPoison'])
            obj['Prop_SklAtkAdd'] = float(row['SklAtkAdd'])
            obj['Prop_SklAtkAddByLevel'] = float(row['SklAtkAddByLevel'])
            obj['Prop_SklFactor'] = float(row['SklFactor'])
            obj['Prop_SklFactorByLevel'] = float(row['SklFactorByLevel'])
            obj['Prop_SklSR'] = float(row['SklSR'])
            obj['Prop_SpendItemBaseCount'] = int(row['SpendItemBaseCount'])
            obj['RequiredStance'] = row['ReqStance']
            obj['RequiredStanceCompanion'] = TOSRequiredStanceCompanion.value_of(row['EnableCompanion'])
            obj['RequiredSubWeapon'] = row['UseSubweaponDamage'] == 'YES'
            obj['SP'] = int(math.floor(float(row['BasicSP'])))
            obj['SPPerLevel'] = float(row['LvUpSpendSp'])
            obj['TypeAttack'] = TOSAttackType.value_of(row['AttackType'])

            obj['LevelMax'] = -1
            obj['LevelPerCircle'] = -1
            obj['OverHeat'] = 0
            obj['RequiredCircle'] = -1
            obj['Link_Attributes'] = []
            obj['Link_Gem'] = None
            obj['Link_Job'] = None

            # Spot fixes TODO: remove on the next patch?
            if obj['$ID_NAME'] == 'Cataphract_Rush':
                obj['Effect'] = obj['Effect'].replace('#(CaptionRatio3}', '#{CaptionRatio3}#')

            # Parse effects
            for effect in re.findall(r'{(.*?)}', obj['Effect']):
                # Spot fixes TODO: remove on the next patch?
                if obj['$ID_NAME'] == 'Kriwi_DivineStigma' and effect == 'CaptionRatio3':
                    obj['Effect'] = re.sub(r'\bCaptionRatio3\b', 'CaptionTime', obj['Effect'])
                    effect = 'CaptionTime'

                if effect in EFFECT_DEPRECATE:
                    # Hotfix: sometimes IMC changes which effects are used, however they forgot to properly communicate to the translation team.
                    # This code is responsible for fixing that and warning so the in-game translations can be fixed
                    logging.warning('[%32s] Deprecated effect [%s] in Effect', obj['$ID_NAME'], effect)

                    effect_deprecate = effect
                    effect = EFFECT_DEPRECATE[effect]

                    obj['Effect'] = re.sub(r'\b' + re.escape(effect_deprecate) + r'\b', effect, obj['Effect'])

                if effect in row:
                    key = 'Effect' + effect

                    if key not in EFFECTS:
                        EFFECTS.append('Effect' + effect)

                    if row[effect] != 'ZERO':
                        obj[key] = []

                        # Replace function calls with function source code
                        for line in parse_skills_lua_clean(LUA[row[effect]]):
                            if 'SCR_ABIL_ADD_SKILLFACTOR' in line:
                                obj[key] = obj[key] + EMBED_SCR_ABIL_ADD_SKILLFACTOR
                            else:
                                obj[key].append(line)

                        obj[key] = parse_skills_lua_to_javascript(parse_skills_lua_format(obj[key]))
                    else:
                        # Hotfix: similar to the hotfix above
                        logging.warning('[%32s] Deprecated effect [%s] in Effect', obj['$ID_NAME'], effect)

                        obj[key] = None
                else:
                    continue

            globals.skills[obj['$ID']] = obj
            globals.skills_by_name[obj['$ID_NAME']] = obj

    # HotFix: make sure all skills have the same Effect columns
    for skill in globals.skills.values():
        for effect in EFFECTS:
            if effect not in skill:
                skill[effect] = None

    # Manual overrides
    for id in OVERRIDE_SKILLS:
        skill = globals.skills[id]

        for key in OVERRIDE_SKILLS[id]:
            skill[key] = OVERRIDE_SKILLS[id][key]


def parse_skills_lua_clean(source):
    result = []

    for line in source.splitlines():
        line = line.strip()

        # Remove empty lines
        if len(line) == 0:
            continue

        # Remove comment-only lines
        if line.startswith('--'):
            continue

        result.append(line)

    return result[1:-1]  # remove 'function' and 'end'


def parse_skills_lua_format(source):
    level = 0
    result = []

    for line in source:
        # Apply extra spaces (1/2)
        if line.find('if ') == 0:
            result.append('')

        # Apply indentation
        if 'end' == line:
            level = level - 1

        result.append((level * 4) * ' ' + line)

        if line.find('if ') == 0:
            level = level + 1

        # Apply extra spaces (2/2)
        if 'end' == line:
            result.append('')

    return result


def parse_skills_lua_parse_argument(text, direction):
    i = 0
    parenthesis = 0
    parenthesis_open = '(' if direction == 1 else ')'
    parenthesis_close = ')' if direction == 1 else '('

    text = text[::-1] if direction == -1 else text
    text = text + ' '  # hotfix: so i never stops at an interesting character

    for i in range(len(text)):
        char = text[i]

        if char in (' ', '\n', parenthesis_close) and i > 0 and parenthesis == 0:
            break

        if char == parenthesis_open:
            parenthesis = parenthesis + 1
        if char == parenthesis_close:
            parenthesis = parenthesis - 1

    return text[:i][::-1] if direction == -1 else text[:i]


def parse_skills_lua_to_javascript(source):
    result = []

    for line in source:
        if 'GetSkillOwner(skill)' in line:
            continue
        if 'GetZoneName(pc)' in line:
            continue
        if line.strip().startswith('--'):
            continue

        if '^' in line:
            parts = line.split('^')
            for i in range(len(parts)):
                if i == len(parts) - 1:
                    break

                part_left = parse_skills_lua_parse_argument(parts[i], -1)
                part_right = parse_skills_lua_parse_argument(parts[i + 1], 1)

                line = line.replace('^', '')
                line = line.replace(part_left, 'Math.pow(' + part_left)
                line = line.replace(part_right, ', ' + part_right + ')')

        line = line.replace('--', '//')
        line = line.replace('~=', '!=')
        line = line.replace('local ', 'var ')
        line = line.replace('math.', 'Math.')
        line = line.replace('SCR_CALC_BASIC_DEF(pc)', 'pc.DEF')
        line = line.replace('SCR_CALC_BASIC_MDEF(pc)', 'pc.MDEF')
        line = re.sub(r'\band\b', ' && ', line)
        line = re.sub(r'\bor\b', ' || ', line)
        line = re.sub(r'\bend\b', '}', line)
        line = re.sub(r'\belse\b', '} else {', line)
        line = re.sub(r'\bnil\b', 'null', line)
        line = re.sub(r'if (.+) then', r'if (\1) {', line)
        line = re.sub(r'TryGetProp\(pc, \"(.+)\"\)', r'pc.\1', line)
        line = re.sub(r'GetAbilityAddSpendValue\(pc, skill\.ClassName, \"(.+)\"\)', r'skill.\1', line)

        result.append(line)

    return result


def parse_skills_stances():
    logging.debug('Parsing stances for skills...')

    stance_list = []
    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'ies.ipf', 'stance.ies')

    # Parse stances
    with open(ies_path, 'rb') as ies_file:
        for row in csv.DictReader(ies_file, delimiter=',', quotechar='"'):
            stance_list.append(row)

    # Add stances to skills
    # from addon.ipf\skilltree\skilltree.lua :: MAKE_STANCE_ICON
    for skill in globals.skills.values():
        stances_main_weapon = []
        stances_sub_weapon = []

        if skill['RequiredStance']:
            for stance in stance_list:
                index = skill['RequiredStance'].find(stance['ClassName'])

                if index == -1:
                    continue
                if skill['RequiredStance'] == 'TwoHandBow' and stance['Name'] == 'Bow':
                    continue
                if 'Artefact' in stance['Name']:
                    continue

                if stance['UseSubWeapon'] == 'NO':
                    stances_main_weapon.append({
                        'Icon': parser_assets.parse_entity_icon(stance['Icon']),
                        'Name': stance['ClassName']
                    })
                else:
                    found = False
                    for stance_sub in stances_sub_weapon:
                        if stance_sub['Icon'] == parser_assets.parse_entity_icon(stance['Icon']):
                            found = True
                            break

                    if not found:
                        stances_sub_weapon.append({
                            'Icon': parser_assets.parse_entity_icon(stance['Icon']),
                            'Name': stance['ClassName']
                        })
        else:
            stances_main_weapon.append({
                'Icon': parser_assets.parse_entity_icon('weapon_All'),
                'Name': 'All'
            })

        if skill['RequiredStanceCompanion'] == TOSRequiredStanceCompanion.YES:
            stances_main_weapon.append({
                'Icon': parser_assets.parse_entity_icon('weapon_companion'),
                'Name': 'Companion'
            })

        skill['RequiredStance'] = [
            stance for stance in (stances_main_weapon + stances_sub_weapon)
            if stance['Icon'] is not None
        ]


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
