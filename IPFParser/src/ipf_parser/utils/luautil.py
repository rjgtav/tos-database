import csv
import os
import re
from lupa import LuaRuntime

from ipf_parser import constants


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
        function GET_ITEM_LEVEL(item) return 0 end
        function GET_UPGRADE_ADD_ATK_RATIO(item, ignoreTranscend) return 0 end
        function GET_UPGRADE_ADD_DEF_RATIO(item, ignoreTranscend) return 0 end
        function GET_UPGRADE_ADD_MDEF_RATIO(item, ignoreTranscend) return 0 end
        function GET_REINFORCE_ADD_VALUE(prop, item, ignoreReinf, reinfBonusValue) return 0 end
        function GET_REINFORCE_ADD_VALUE_ATK(item, ignoreReinf, reinfBonusValue, basicTooltipProp) return 0 end
        function OVERRIDE_INHERITANCE_PROPERTY(item) end
        function GetExProp(entity, name) return 0 end
        function GetServerNation() end
        function GetServerGroupID() end
        function IMCRandom(min, max) return 0 end
        function MakeItemOptionByOptionSocket(item) end
    ''')

    # Initialize ies data
    ies_ADD = lua.execute('''
        ies_by_ClassID = {}
        ies_by_ClassName = {}
        
        function ies_ADD(ies, data)
            by_ClassID = {}
            by_ClassName = {}
            
            for i, row in python.enumerate(data) do
                by_ClassID[math.floor(row["ClassID"])] = row
                by_ClassName[row["ClassName"]] = row
            end
            
            ies_by_ClassID[ies] = by_ClassID
            ies_by_ClassName[ies] = by_ClassName
        end
        
        return ies_ADD
    ''')

    ies_ADD('item', load_ies('item_Equip.ies'))
    ies_ADD('item_grade', load_ies('item_grade.ies'))
    ies_ADD('stat_monster', load_ies('statbase_monster.ies'))
    ies_ADD('stat_monster_type', load_ies('statbase_monster_type.ies'))


def load_ies(ies_name):
    ies_data = []
    ies_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, "ies.ipf", ies_name)

    with open(ies_path, 'rb') as ies_file:
        ies_reader = csv.DictReader(ies_file, delimiter=',', quotechar='"')

        for row in ies_reader:
            ies_data.append(row)

    return ies_data


def load_script(file_name, whitelist, compile=True):
    result = {}
    function_data = []

    file_path = os.path.join(constants.PATH_PARSER_INPUT_IPF, 'shared.ipf', 'script', file_name)

    with open(file_path, 'r') as file:
        for line in file:
            if line.startswith('function '):
                load_script_function(function_data, compile, whitelist, result)
                function_data = []

            function_data.append(line)

        load_script_function(function_data, compile, whitelist, result)

    return result


def load_script_function(function_data, compile, whitelist, result):
    if len(function_data) > 0 and 'function' in function_data[0]:
        function_name = lua_function_name(function_data[0])

        if whitelist == '*' or function_name in whitelist:
            result[function_name] = ''.join(function_data)

            if compile:
                result[function_name] = lua_function_compile(result[function_name])


def lua_function_compile(function):
    # In order to return a named LUA function, we need to add a return statement in the end
    # read more: https://github.com/scoder/lupa/issues/22
    return lua.execute(function + '\nreturn ' + lua_function_name(function))


def lua_function_name(function):
    return function[function.index('function ') + len('function '):function.index('(')]