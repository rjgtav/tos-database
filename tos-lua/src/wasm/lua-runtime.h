#include <emscripten.h>
#include <emscripten/fetch.h>
#include <string.h> 
#include "../../lua/src/lua.h"
#include "../../lua/src/lualib.h"
#include "../../lua/src/lauxlib.h"

static int lua_initialized = 0;
static lua_State* lua;

void LUA_INIT();
const char* LUA_RUNTIME_CALL(char* function_name, char* args);
