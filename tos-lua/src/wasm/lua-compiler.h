#include <emscripten.h>
#include <stdlib.h>
#include <string.h> 
#include "../../lua/src/lua.h"
#include "../../lua/src/lualib.h"
#include "../../lua/src/lauxlib.h"
#include "../../lua/src/lobject.h"

static lua_State* lua;
static char* output;
static size_t output_size;

void LUA_INIT();
char* LUA_COMPILE(const char *script);
int LUA_WRITER(lua_State* L, const void* input, size_t input_size, void* ignore);