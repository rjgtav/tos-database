#include <stdlib.h>
#include "../../lua/src/lua.h"
#include "../../lua/src/lualib.h"
#include "../../lua/src/lauxlib.h"

extern char* LUA_RUNTIME_OVERRIDES_GetClassByID_JS(const char*, const int);
extern char* LUA_RUNTIME_OVERRIDES_GetClassByName_JS(const char*, const char*);

static const char* LUA_RUNTIME_OVERRIDES = ""
    "------------------- OVERRIDES ----------------------\n"
    "function GetClass(ies, name)\n"
    "   ies = string.lower(ies)\n"
    "   json = require('json_imc')\n"
    "   data = LUA_RUNTIME_OVERRIDES_HttpRequest(string.format('/data/%s/%s/%s/%s', _G.LUA_RUNTIME_REGION, _G.LUA_RUNTIME_LANGUAGE, ies, name))"
    "   return json.decode(data)\n"
    "end\n"

    "function GetClassByType(ies, id)\n"
    "   ies = string.lower(ies)\n"
    "   json = require('json_imc')\n"
    "   data = LUA_RUNTIME_OVERRIDES_HttpRequest(string.format('/data/%s/%s/%s/%d', _G.LUA_RUNTIME_REGION, _G.LUA_RUNTIME_LANGUAGE, ies, id))"
    "   return json.decode(data)\n"
    "end\n"

    "function GetExProp(entity, name) return 0 end\n"
    "function ScpArgMsg(msg) end\n"

    "function TryGetProp(item, prop, default)\n"
    "   if item == nil then return default end\n"
    ""
    "   local value = item[prop]\n"
    ""
    "   if tonumber(value) ~= nil then  return tonumber(value)\n"
    "   elseif value ~= nil then        return value\n"
    "   else                            return default end\n"
    "end\n"
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
