#include "lua-compiler.h"

void EMSCRIPTEN_KEEPALIVE LUA_INIT() {
    // Initialize a new LUA state, and load the default libraries
    lua = luaL_newstate();
	luaL_openlibs(lua);
}

char* EMSCRIPTEN_KEEPALIVE LUA_COMPILE(const char *script) {
    // Free output from previous run
    if (output != NULL)
        free(output);
    
    // Initialize output
    output = malloc(128 * 1024 * 1024 * sizeof(char));
    output_size = 0;

    // Load script into stack, dump it into bytecodes and remove it from stack
    luaL_loadstring(lua, script);
    lua_dump(lua, (lua_Writer) LUA_WRITER, &output, 1);
    lua_pop(lua, 1);

    // Remove the final : from the output and terminate the string
    output[output_size - 1] = '\0';

    // Return compiled script bytecodes
    return output;
}

int LUA_WRITER(lua_State* L, const void* input, size_t input_size, void* ignore) {
    //printf("<lua_writer> %lu + %lu -> %lu\n", output_size, input_size, output_size + input_size * 3 * sizeof(char));

    // Print in a binary format, separated by commas (eg. 1B:4C:75:61:00)
    for (int i = 0; i < input_size; i ++) {
        sprintf(output + output_size, "%02X:", ((unsigned char*) input)[i]);
        output_size += 3 * sizeof(char);
    }
    
    return 0;
}