import csv
import logging
import os
import re

from lupa import LuaRuntime

import constants


# HotFix: don't throw errors when LUA is getting an unknown key
def attr_getter(obj, name):
    if name in obj:
        if name in ['Blockable', 'HPCount', 'ReinforceArmor', 'TranscendArmor', 'ReinforceWeapon', 'TranscendWeapon']:
            return int(obj[name])
        else:
            return obj[name]
    return 0


def attr_setter(obj, name, value):
    obj[name] = value


initialized = True
lua = LuaRuntime(attribute_handlers=(attr_getter, attr_setter), unpack_returned_tuples=True)


def init():
    global initialized

    initialized = True

    # Initialize functions
    lua.execute('''
        function GetClassByNumProp(ies_key, column, value)
            local data = ies_by_ClassID[string.lower(ies_key)]
            for id, row in pairs(data) do
                if TryGetProp(row, column) == value then
                    return row
                end
            end
        end
        
        function GetClass(ies_key, name)
            local data = ies_by_ClassName[string.lower(ies_key)]
            return data[name]
        end
        function GetClassByType(ies_key, id)
            local data = ies_by_ClassID[string.lower(ies_key)]
            return data[math.floor(id)]
        end
        
        function GetClassList(ies_key)
            return ies_by_ClassID[string.lower(ies_key)]
        end
        function GetClassByNameFromList(data, key)
            for id, row in pairs(data) do
                if TryGetProp(row, "ClassName") == key then
                    return row
                end
            end
        end 
        
        function MinMaxCorrection(value, min, max)
            if value < min then
                return min
            elseif value > max then
                return max
            else
                return value
            end
        end
        
        function SyncFloor(number)
            return math.floor(number)
        end
        
        -- http://lua-users.org/wiki/SplitJoin @PeterPrade
        function StringSplit(text, delimiter)
           local list = {}
           local pos = 1
           if string.find("", delimiter, 1) then -- this would result in endless loops
              error("delimiter matches empty string!")
           end
           while 1 do
              local first, last = string.find(text, delimiter, pos)
              if first then -- found?
                 table.insert(list, string.sub(text, pos, first-1))
                 pos = last+1
              else
                 table.insert(list, string.sub(text, pos))
                 break
              end
           end
           return list
        end
        
        -- https://stackoverflow.com/a/664557 some LUA table helper functions
        function table.set(t) -- set of list
          local u = { }
          for _, v in ipairs(t) do u[v] = true end
          return u
        end
        function table.find(f, l) -- find element v of l satisfying f(v)
          for _, v in ipairs(l) do
            if f(v) then
              return v
            end
          end
          return nil
        end
        
        function TryGetProp(item, prop)
            local value = item[prop]
            
            if tonumber(value) ~= nil then
                return tonumber(value)
            end
            
            return value
        end
        
        JAEDDURY_MON_MHP_RATE = 1
        
        function APPLY_AWAKEN(item) end
        function APPLY_ENCHANTCHOP(item) end
        function APPLY_OPTION_SOCKET(item) end
        function APPLY_RANDOM_OPTION(item) end
        function APPLY_RARE_RANDOM_OPTION(item) end
        function CALC_PCBANG_GROWTH_ITEM_LEVEL(item) end
        function CALC_GROWTH_ITEM_LEVEL(item) end
        function GET_ITEM_LEVEL(item) return 0 end
        function GET_UPGRADE_ADD_ATK_RATIO(item, ignoreTranscend) return 0 end
        function GET_UPGRADE_ADD_DEF_RATIO(item, ignoreTranscend) return 0 end
        function GET_UPGRADE_ADD_MDEF_RATIO(item, ignoreTranscend) return 0 end
        function GET_REINFORCE_ADD_VALUE(prop, item, ignoreReinf, reinfBonusValue) return 0 end
        function GET_REINFORCE_ADD_VALUE_ATK(item, ignoreReinf, reinfBonusValue, basicTooltipProp) return 0 end
        function IS_MORU_DISCOUNT_50_PERCENT(item) return false end
        function IS_MORU_FREE_PRICE(item) return false end
        function MAKE_ITEM_OPTION_BY_OPTION_SOCKET(item) end
        function OVERRIDE_INHERITANCE_PROPERTY(item) end
        function GetExProp(entity, name) return 0 end
        function GetItemOwner(item) return {} end
        function GetServerNation() end
        function GetServerGroupID() end
        function IsPVPServer(itemOwner) end
        function IMCRandom(min, max) return 0 end
        function MakeItemOptionByOptionSocket(item) end
        function SCR_EVENT_1811_WEEKEND_CHECK(key) return 'NO' end
        function SCR_PVP_ITEM_LV_GRADE_REINFORCE_SET(item, lv, grade, reinforceValue, reinforceRatio) return lv, grade, reinforceValue, reinforceRatio end
    ''')

    # Initialize ies data
    ies_ADD = lua.execute('''
        ies_by_ClassID = {}
        ies_by_ClassName = {}
        
        function ies_ADD(key, data)
            _by_ClassID = {}
            _by_ClassName = {}
            
            if ies_by_ClassID[key] ~= nil then
                _by_ClassID = ies_by_ClassID[key]
            end
            if ies_by_ClassName[key] ~= nil then
                _by_ClassName = ies_by_ClassName[key]
            end
            
            for i, row in python.enumerate(data) do
                _by_ClassID[math.floor(row["ClassID"])] = row
                _by_ClassName[row["ClassName"]] = row
            end
            
            ies_by_ClassID[key] = _by_ClassID
            ies_by_ClassName[key] = _by_ClassName
        end
        
        return ies_ADD
    ''')

    ies_ADD('item', load_ies('item_Equip.ies'))
    ies_ADD('item_grade', load_ies('item_grade.ies'))
    ies_ADD('monster', load_ies('monster.ies'))
    ies_ADD('monster', load_ies('monster_event.ies'))
    ies_ADD('monster', load_ies('Monster_solo_dungeon.ies'))
    ies_ADD('stat_monster', load_ies('statbase_monster.ies'))
    ies_ADD('stat_monster_race', load_ies('statbase_monster_race.ies'))
    ies_ADD('stat_monster_type', load_ies('statbase_monster_type.ies'))


def load_ies(ies_name):
    ies_data = []
    ies_path = os.path.join(constants.PATH_INPUT_DATA, "ies.ipf", ies_name)

    if not os.path.exists(ies_path):
        logging.warn('Missing ies file: %s', ies_path)
        return []

    with open(ies_path, 'rb') as ies_file:
        ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

        for row in ies_reader:
            # auto cast to int/float if possible
            for key in row.keys():
                try:
                    row[key] = int(row[key])
                except ValueError:
                    try:
                        row[key] = float(row[key])
                    except ValueError:
                        row[key] = row[key]

            ies_data.append(row)

    return ies_data


def load_script(file_name, whitelist, compile=True):
    result = {}
    function_data = []

    file_path = os.path.join(constants.PATH_INPUT_DATA, 'shared.ipf', 'script', file_name)

    with open(file_path, 'r') as file:
        for line in file:
            if line.startswith('function '):
                load_script_function(function_data, compile, whitelist, result)
                function_data = []

            function_data.append(line)

        load_script_function(function_data, compile, whitelist, result)

    return result


def load_script_function(function_source, compile, whitelist, result):
    if len(function_source) > 0 and 'function' in function_source[0]:
        function_name = lua_function_name(function_source[0])

        if whitelist == '*' or function_name in whitelist:
            result[function_name] = ''.join(function_source)

            if compile:
                result[function_name] = lua_function_compile(result[function_name])


def lua_function_compile(function):
    # In order to return a named LUA function, we need to add a return statement in the end
    # read more: https://github.com/scoder/lupa/issues/22
    return lua.execute(function + '\nreturn ' + lua_function_name(function))


def lua_function_name(function):
    return function[function.index('function ') + len('function '):function.index('(')]


def lua_function_source(function):
    result = []

    for line in function.splitlines():
        line = line.strip()

        # Remove empty lines
        if len(line) == 0:
            continue

        # Remove comment-only lines
        if line.startswith('--'):
            continue

        result.append(line)

    return result


def lua_function_source_format(function_source):
    level = 0
    result = []

    TOKEN_LEVEL_INCREASE = ['else', 'for', 'function', 'if']
    TOKEN_LEVEL_DECREASE = ['end', 'else']

    for line in function_source:

        # insert extra empty lines (to increase readability)
        if line.find('if') == 0:
            result.append('')

        # << indentation
        if any(line.find(s) == 0 for s in TOKEN_LEVEL_DECREASE):
            level = level - 1

        result.append((level * 4) * ' ' + line)

        # >> indentation
        if any(line.find(s) == 0 for s in TOKEN_LEVEL_INCREASE):
            level = level + 1

        # insert extra empty lines (to increase readability)
        if line.find('end') == 0:
            result.append('')

    return result


def lua_function_source_to_javascript(function_source):
    result = []

    for line in lua_function_source_format(function_source):
        if line.strip().startswith('--'):
            continue

        if '^' in line:
            parts = line.split('^')
            for i in range(len(parts)):
                if i == len(parts) - 1:
                    break

                part_left = lua_function_source_to_javascript_argument(parts[i], -1)
                part_right = lua_function_source_to_javascript_argument(parts[i + 1], 1)

                line = line.replace('^', '')
                line = line.replace(part_left, 'Math.pow(' + part_left)
                line = line.replace(part_right, ', ' + part_right + ')')

        line = line + ' {' if line.find('function ') == 0 else line
        line = line.replace('~=', '!=')
        line = line.replace('local ', 'var ')
        line = line.replace('math.', 'Math.')
        line = line.replace(':', '.')
        line = re.sub(r'\s+--(.+)', '', line)
        line = re.sub(r'\band\b', ' && ', line)
        line = re.sub(r'\bor\b', ' || ', line)
        line = re.sub(r'\bend\b', '}', line)
        line = re.sub(r'\belse\b', '} else {', line)
        line = re.sub(r'\belseif\b', '} else if', line)
        line = re.sub(r'\bnil\b', 'null', line)
        line = re.sub(r'for (.+),(.+)do', r'for (var \1; \2;) {', line)
        line = re.sub(r'if (.+) then', r'if (\1) {', line)

        result.append(line)

    return result


def lua_function_source_to_javascript_argument(text, direction):
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
