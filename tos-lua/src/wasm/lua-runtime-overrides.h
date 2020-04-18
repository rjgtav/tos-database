#include <stdlib.h>
#include "../../lua/src/lua.h"
#include "../../lua/src/lualib.h"
#include "../../lua/src/lauxlib.h"

extern char* LUA_RUNTIME_OVERRIDES_GetClassByID_JS(const char*, const int);
extern char* LUA_RUNTIME_OVERRIDES_GetClassByName_JS(const char*, const char*);

static const char* LUA_RUNTIME_OVERRIDES = ""
    "------------------- FUNCTION OVERRIDES ----------------------\n"
    "function GET_ITEM_LEVEL(item) return 0 end\n"

    "function GetClass(ies, name)\n"
    "   if name == nil then\n"
    "       return nil\n"
    "   end\n"
    ""
    "   ies = string.lower(ies)\n"
    "   json = require('json_imc')\n"
    "   data = LUA_RUNTIME_OVERRIDES_HttpRequest(string.format('/api/%s/data/%s/%s/%s.js', _G.LUA_RUNTIME_REGION, _G.LUA_RUNTIME_LANGUAGE, ies, name))\n"
    "   return json.decode(data)\n"
    "end\n"
    "function GetClassByNameFromList(data, key)\n"
    "   for id, row in pairs(data) do\n"
    "       if TryGetProp(row, 'ClassName') == key then\n"
    "           return row\n"
    "       end\n"
    "   end\n"
    "end\n"
    "function GetClassByNumProp(ies, column, value)\n"
    "   if column == 'ClassID' then\n"
    "       return GetClassByType(ies, value)\n"
    "   end\n"
    ""
    "   data = GetClassList(ies)\n"
    "   for id, row in pairs(data) do\n"
    "       if TryGetProp(row, column) == value then\n"
    "           return row\n"
    "       end\n"
    "   end\n"
    "end\n"
    "function GetClassByType(ies, id)\n"
    "   if id == nil then\n"
    "       return nil\n"
    "   end\n"
    ""
    "   ies = string.lower(ies)\n"
    "   json = require('json_imc')\n"
    "   data = LUA_RUNTIME_OVERRIDES_HttpRequest(string.format('/api/%s/data/%s/%s/%d.js', _G.LUA_RUNTIME_REGION, _G.LUA_RUNTIME_LANGUAGE, ies, id))\n"
    "   return json.decode(data)\n"
    "end\n"
    "function GetClassList(ies)\n"
    "   ies = string.lower(ies)\n"
    "   json = require('json_imc')\n"
    "   data = LUA_RUNTIME_OVERRIDES_HttpRequest(string.format('/api/%s/data/%s/%s/*.js', _G.LUA_RUNTIME_REGION, _G.LUA_RUNTIME_LANGUAGE, ies))\n"
    "   return json.decode(data)\n"
    "end\n"

    "function GetExProp(entity, name) return entity[name] end\n"
    "function GetIESID(item) end\n"
    "function GetItemOwner(entity) end\n"
    "function GetOwner(monster) end\n"
    "function GetServerNation() end\n"
    "function GetServerGroupID() end\n"
    "function IMCRandom(min, max) return 0 end\n"
    "function IsBuffApplied(pc, buff) end\n"
    "function IsPVPServer(itemOwner) return 0 end\n"
    "function IsServerSection(pc) return 0 end\n"
    "function ScpArgMsg(msg) end\n"

    "function SyncFloor(number)\n"
    "    return math.floor(number)\n"
    "end\n"

    "function TryGetProp(item, prop, default)\n"
    "   if item == nil then return default end\n"
    ""
    "   local value = item[prop]\n"
    ""
    "   if tonumber(value) ~= nil then  return tonumber(value)\n"
    "   elseif value ~= nil then        return value\n"
    "   else                            return default end\n"
    "end\n"

    "------------------- GLOBAL OVERRIDES ----------------------\n"
    "app = {\n"
    "   IsBarrackMode = function() return false end\n"
    "}\n"

    "exchange = {\n"
    "    GetExchangeItemInfoByGuid = function(guid) end\n"
    "}\n"

    "session = {\n"
    "    GetEquipItemByGuid = function(guid) end,\n"
    "    GetEtcItemByGuid = function(guid) end,\n"
    "    GetInvItemByGuid = function(guid) end,\n"

    "    link = {\n"
    "        GetGCLinkObject = function(guid) end\n"
    "    },\n"

    "    market = {\n"
    "        GetCabinetItemByItemObjID = function(itemID) end,\n"
    "        GetItemByItemID = function(itemID) end\n"
    "    },\n"

    "    otherPC = {\n"
    "        GetItemByGuid = function(guid) end\n"
    "    },\n"

    "    pet = {\n"
    "        GetPetEquipObjByGuid = function(guid) end\n"
    "    }\n"
    "}\n"
;

static int LUA_RUNTIME_OVERRIDES_HttpRequest(lua_State* lua) {
    const char *url = luaL_checkstring(lua, 1);
    char *response = (char*) EM_ASM_INT({
        let xhr = new XMLHttpRequest();
            xhr.open('GET', UTF8ToString($0), false);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send();

        let response;

        if (xhr.status == 200) {
            response = xhr.response;
        } else {
            response = '$ERROR$';
            console.error('LUA: Failed to HttpRequest', xhr);
        }

        // https://emscripten.org/docs/api_reference/emscripten.h.html#c.EM_ASM_INT
        let responseLength = lengthBytesUTF8(response) + 1;
        let responseWasm = _malloc(responseLength);

        stringToUTF8(response, responseWasm, responseLength);

        return responseWasm;
    }, url);

    lua_pushstring(lua, response);
    free(response); // Prevent a memory leak

    return 1;
}

// Read more: https://www.lua.org/pil/26.1.html
static void LUA_RUNTIME_OVERRIDES_REGISTER(lua_State* lua) {
    lua_pushcfunction(lua, LUA_RUNTIME_OVERRIDES_HttpRequest);        lua_setglobal(lua, "LUA_RUNTIME_OVERRIDES_HttpRequest");
}

static void LUA_INIT_RUNTIME_OVERRIDES(lua_State* lua) {
    // Register C overrides
    LUA_RUNTIME_OVERRIDES_REGISTER(lua);

    // Compile LUA overrides
    if (luaL_dostring(lua, LUA_RUNTIME_OVERRIDES) != LUA_OK) {
        printf("LUA_INIT_OVERRIDES error: %s\n", lua_tostring(lua, lua_gettop(lua)));
        lua_pop(lua, 1);
    }
}
