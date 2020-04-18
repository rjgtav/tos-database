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
    lua_pushcfunction(lua, LUA_TRACEBACK); lua_setglobal(lua, "LUA_TRACEBACK");

    // Register custom libs loader
    lua_register(lua, "tos_require", LUA_REQUIRE);
    luaL_dostring(lua, "table.insert(package.searchers, 2, tos_require)");

    // Load runtime
    LUA_INIT_RUNTIME();

    // Load runtime overrides
    LUA_INIT_RUNTIME_OVERRIDES(lua);

    // Load runtime api
    LUA_INIT_RUNTIME_API(lua);
}

const char* EMSCRIPTEN_KEEPALIVE LUA_RUNTIME_CALL(char* function_name, char* function_args) {
    //printf("LUA_RUNTIME_CALL(%s, %s)\n", function_name, function_args);
    const char* result;
    const char* error;

    // Initialize
    LUA_INIT();

    // Push debug.traceback reference
    lua_getglobal(lua, "debug");
    lua_getfield(lua, -1, "traceback");
    lua_replace(lua, -2);

    // Push function name and arguments
    lua_getglobal(lua, "LUA_RUNTIME_CALL");
    lua_pushstring(lua, function_name);
    lua_pushstring(lua, function_args);

    // Call function (2 arguments, 1 result). debug.traceback reference is located at -arguments - 2
    if (lua_pcall(lua, 2, 1, -2 - 2) != LUA_OK) {
        error = lua_tostring(lua, -1);
        EM_ASM({
            console.error('LUA_RUNTIME_CALL failed. Error: ', UTF8ToString($0));
        }, error);

        // Remove error and debug.tracebak from the stack
        lua_pop(lua, 2);
        return "$ERROR$";
    }

    // Pop result from stack and return it
    result = lua_tostring(lua, -1);
    lua_pop(lua, 1);

    return result;
}

// Thanks https://stackoverflow.com/a/12256526
int LUA_TRACEBACK() {
    printf("TRACEBACK 1\n");
    if (!lua_isstring(lua, 1))  /* 'message' not a string? */
        return 1;  /* keep it intact */
    
    printf("TRACEBACK 2\n");
    lua_getglobal(lua, "debug");
    if (!lua_istable(lua, -1)) {
        lua_pop(lua, 1);
        return 1;
    }

    printf("TRACEBACK 3\n");
    lua_getfield(lua, -1, "traceback");
    if (!lua_isfunction(lua, -1)) {
        lua_pop(lua, 2);
        return 1;
    }
    
    printf("TRACEBACK 4\n");
    lua_pushvalue(lua, 1);  /* pass error message */
    lua_pushinteger(lua, 2);  /* skip this function and traceback */
    lua_call(lua, 2, 1);  /* call debug.traceback */
    printf("TRACEBACK 5\n");

    return 1;
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