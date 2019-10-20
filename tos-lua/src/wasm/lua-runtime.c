#include "lua-runtime.h"
#include "lua-runtime-api.h"
#include "lua-runtime-libs.h"
#include "lua-runtime-overrides.h"
#include "lua-runtime-scripts.h"

void EMSCRIPTEN_KEEPALIVE LUA_INIT() {
    if (lua_initialized == 1) return;
        lua_initialized = 1;

    // Initialize a new LUA state, and load the default libraries
    lua = luaL_newstate();
	luaL_openlibs(lua);

    // Register custom libs loader
    lua_register(lua, "tos_require", LUA_REQUIRE);
    luaL_dostring(lua, "table.insert(package.searchers, 2, tos_require)");

    // Load runtime overrides
    LUA_INIT_RUNTIME_OVERRIDES(lua);

    // Load runtime
    LUA_INIT_RUNTIME();

    // Load runtime api
    LUA_INIT_RUNTIME_API(lua);
}

const char* EMSCRIPTEN_KEEPALIVE LUA_RUNTIME_CALL(char* function_name, char* args) {
    //printf("LUA_RUNTIME_CALL(%s, %s)\n", function_name, args);
    const char* result;

    // Initialize
    LUA_INIT();

    // Push function name and arguments
    lua_getglobal(lua, "LUA_RUNTIME_CALL");
    lua_pushstring(lua, function_name);
    lua_pushstring(lua, args);

    // Call function (2 arguments, 1 result)
    if (lua_pcall(lua, 2, 1, 0) != LUA_OK) {
        EM_ASM({
            console.error('LUA_RUNTIME_CALL $ERROR$:', UTF8ToString($0));
        }, lua_tostring(lua, lua_gettop(lua)));

        lua_pop(lua, 1);
        return "$ERROR$";
    }

    // Pop result from stack and return it
    result = lua_tostring(lua, -1);
    lua_pop(lua, 1);

    return result;
}

int main() {
/*
    char* script = "\
        local seen={}\
\
        function dump(t,i)\
            seen[t]=true\
            local s={}\
            local n=0\
            for k in pairs(t) do\
                n=n+1 s[n]=k\
            end\
            table.sort(s)\
            for k,v in ipairs(s) do\
                print(i,v)\
                v=t[v]\
                if type(v)==\"table\" and not seen[v] then\
                    dump(v,i..\"\\t\")\
                end\
            end\
        end\
\
        dump(_G,\"\")\
        props = GET_COMMON_PROP_LIST()\
        print(props[1])\
        print(props[2])\
        print(props[3])\
        print(LUA_RUNTIME_CALL)\
    ";
*/
/*
    char* script = "\
        print(debug.getinfo(GET_COMMON_PROP_LIST))\
    ";
    */

/*
	size_t len = 0;
    int res = luaL_dostring(lua, script);
	const char* value = lua_tolstring(lua, lua_gettop(lua), &len);

	printf("%s\n", value);
    */
}