static const char* LUA_RUNTIME_API = ""
    "------------------- IMPORTS ----------------------\n"
    "------------------- API ----------------------\n"
    "function LUA_RUNTIME_INIT(language, region)\n"
    "   _G.LUA_RUNTIME_LANGUAGE = language\n"
    "   _G.LUA_RUNTIME_REGION = region\n"
    "end\n"

    "function LUA_RUNTIME_CALL(function_name, args)\n"
    "   json = require('json_imc')\n"
    "   return _G[function_name](table.unpack(json.decode(args)))\n"
    "end\n"
;

static void LUA_INIT_RUNTIME_API(lua_State* lua) {
    // Compile LUA API
    if (luaL_dostring(lua, LUA_RUNTIME_API) != LUA_OK) {
        printf("LUA_INIT_RUNTIME_API error: %s\n", lua_tostring(lua, lua_gettop(lua)));
        lua_pop(lua, 1);
    }
}