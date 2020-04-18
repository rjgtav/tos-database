const childProcess = require('child_process');
const fs = require('fs');
const glob = require("glob");
const papaparse = require('papaparse');
const path = require('path');

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

const REGION_iTOS = 'iTOS';
const REGION_jTOS = 'jTOS';
const REGION_kTEST = 'kTEST';
const REGION_kTOS = 'kTOS';
const REGION_twTOS = 'twTOS';
const REGION = process.argv[2] || REGION_iTOS;

if ([REGION_iTOS, REGION_jTOS, REGION_kTOS, REGION_kTEST, REGION_twTOS].indexOf(REGION) === -1)
    throw Error('Invalid region: ' + REGION);

const SRC = path.join('.', 'src');
const SRC_lua = path.join(SRC, 'lua');
const SRC_wasm = path.join(SRC, 'wasm');

const TOS_INPUT = path.join('..', 'tos-parser', 'input', REGION);
const TOS_INPUT_DATA = path.join(TOS_INPUT, 'data');
const TOS_INPUT_DATA_IES = path.join(TOS_INPUT_DATA, 'ies.ipf');

const TOS_WEB = path.join('..', 'tos-web');
const TOS_WEB_SRC = path.join(TOS_WEB, 'src');
const TOS_WEB_SRC_ASSETS = path.join(TOS_WEB_SRC, 'assets');
const TOS_WEB_SRC_ASSETS_WORKER = path.join(TOS_WEB_SRC_ASSETS, 'worker');

(async function() {
    let bash = '/bin/bash';
    let emsdk_env = path.join('.', 'emsdk', 'emsdk_env.sh');
    let lua = path.join('.', 'lua', 'src');
    let lua_lib = path.join(lua, 'liblua.a');
    let lua_files;
    let lua_files_names;
    let Module;
    let result;
    let src_wasm = path.join(SRC, 'wasm');
    let src_wasm_lua_compiler = path.join(src_wasm, 'lua-compiler.c');
    let src_wasm_lua_runtime = path.join(src_wasm, 'lua-runtime.c');
    let src_wasm_lua_runtime_libs = path.join(src_wasm, 'lua-runtime-libs.h');
    let src_wasm_lua_runtime_overrides = path.join(src_wasm, 'lua-runtime-overrides.h');
    let src_wasm_lua_runtime_scripts = path.join(src_wasm, 'lua-runtime-scripts.h');
    let wasm_lua_compiler = path.join('dist', 'lua-compiler.js');
    let wasm_lua_runtime = path.join('..', 'tos-web-server', 'www', 'assets', 'region', REGION.toLowerCase(), 'lua', 'lua.js');
    let writer;

    // 0. Clear emscripten cache
    //console.log('0. Clear emscripten cache');
    //childProcess.spawnSync(`${ bash } -c 'source ${ emsdk_env } && emcc --clear-cache'`, { shell: true, stdio: 'inherit' });

    // 1. Compile LUA into WASM
    console.log('1. Compile LUA into WASM');
    result = childProcess.spawnSync(`${ bash } -c 'source ${ emsdk_env } && cd ${ lua } && make generic CC="emcc -s WASM=1"'`, { shell: true, stdio: 'inherit' });
    result.status !== 0 && error('1. Compile LUA into WASM');

    // 2. Compile LUA Compiler into WASM
    console.log('2. Compile LUA Compiler into WASM');
    result = childProcess.spawnSync(`${ bash } -c 'source ${ emsdk_env } && emcc -I${ lua } ${ src_wasm_lua_compiler } ${ lua_lib } -O3 -s ALLOW_MEMORY_GROWTH=1 -s TOTAL_MEMORY=128MB -s WASM=1 -s EXTRA_EXPORTED_RUNTIME_METHODS=["ccall"] -o ${ wasm_lua_compiler }'`, { shell: true, stdio: 'inherit' });
    result.status !== 0 && error('2. Compile LUA Compiler into WASM');

    // 3. Load LUA Compiler
    console.log('3. Load LUA Compiler');
    Module = await new Promise((resolve, reject) => {
        let Module = require(path.join('..', wasm_lua_compiler));
            Module.onRuntimeInitialized = () => resolve(Module);
    });

    Module._LUA_INIT();

    // 4. Generate additional LUA files
    console.log('4. Generate additional LUA files');
    lua_generate_sharedconst();

    // 5. Compile TOS Libraries into LUA
    console.log('5. Compile TOS libs into LUA');
    lua_files = glob.sync(`${ TOS_INPUT }/release/lua/json*.lua`);
    lua_files.forEach(value => lua_file_clean(value));
    lua_files_names = [];

    writer = fs.createWriteStream(src_wasm_lua_runtime_libs, { flags: 'w' });

    for (let i = 0; i < lua_files.length; i ++) {
        //console.log(`Compiling ${ lua_files[i] }...`);
        let lua_file = lua_files[i];
        let lua_module_name = path.basename(lua_file);
            lua_module_name = lua_module_name.slice(0, lua_module_name.lastIndexOf('.'));

        let lua_runtime = Module.ccall('LUA_COMPILE', 'string', ['string'], [fs.readFileSync(lua_file, 'utf8')]);
            lua_runtime = '0x' + lua_runtime.split(':').join(',0x');
            lua_runtime = `static const char LUA_LIB_${ lua_module_name }[] = { ${ lua_runtime } };\n`;

        await writer_write(lua_runtime, writer);

        lua_files_names.push(lua_module_name);
    }

    await writer_write(`
int LUA_REQUIRE(lua_State* lua) {
    const char* name = luaL_checkstring(lua, 1);
    
    ${ lua_files_names.map(value => `   if (strcmp(name, "${ value }") == 0) { luaL_loadbuffer(lua, LUA_LIB_${ value }, sizeof(LUA_LIB_${ value }), name); return 1; }`).join('\n    ') }
    
    return 0;
}
    `, writer);

    writer.close();

    // 6. Compile TOS into LUA
    console.log('6. Compile TOS scripts into LUA');
    lua_files = glob.sync(`${ SRC_lua }/**/*.lua`).concat(glob.sync(`${ TOS_INPUT }/data/**/*.lua`));
    lua_files = lua_files.filter(value => value.indexOf('addon_d.ipf') === -1);
    lua_files.forEach(value => lua_file_clean(value));
    lua_files_names = [];

    writer = fs.createWriteStream(src_wasm_lua_runtime_scripts, { flags: 'w' });

    for (let i = 0; i < lua_files.length; i ++) {
        //console.log(`Compiling ${ lua_files[i - 1] }...`);
        let lua_file = lua_files[i];
        let lua_module_name = i;

        let lua_runtime = Module.ccall('LUA_COMPILE', 'string', ['string'], [fs.readFileSync(lua_file, 'utf8')]);
            lua_runtime = '0x' + lua_runtime.split(':').join(',0x');
            lua_runtime = `static const char LUA_SCRIPT_${ lua_module_name }[] = { ${ lua_runtime } };\n`;

        await writer_write(lua_runtime, writer);

        lua_files_names.push(lua_module_name);
    }

    await writer_write(`
void LUA_INIT_RUNTIME_SCRIPT(const char* script, size_t script_size) {
    luaL_loadbuffer(lua, script, script_size, "runtime");
    lua_pcall(lua, 0, LUA_MULTRET, 0);
}

void LUA_INIT_RUNTIME() {
    ${ lua_files_names.map(value => `    LUA_INIT_RUNTIME_SCRIPT(LUA_SCRIPT_${ value }, sizeof(LUA_SCRIPT_${ value }));`).join('\n') }
}
    `, writer);

    writer.close();

    // 7. Compile LUA Runtime into WASM. More information: https://emscripten.org/docs/tools_reference/emcc.html
    console.log('7. Compile LUA Runtime into WASM');
    result = childProcess.spawnSync([`${ bash } -c 'source ${ emsdk_env }`,
        `&& emcc -I${ lua } ${ src_wasm_lua_runtime } ${ lua_lib }`,
        `-Os`, // Optimization level
        `-g4`, // Include Debugging Information
        `-s ASSERTIONS=1`,
        `-s DEMANGLE_SUPPORT=1`,
        `-s SAFE_HEAP=1`,
        `-s ALLOW_MEMORY_GROWTH=1`,
        `-s ENVIRONMENT="worker"`,
        `-s MODULARIZE=1`, // So we can initialize it manually
        `-s TOTAL_MEMORY=128MB`,
        `-s WASM=1`,
        `-s STACK_OVERFLOW_CHECK=2`,
        `-s EXTRA_EXPORTED_RUNTIME_METHODS=["ccall"]`,
        `-o ${ wasm_lua_runtime }
    '`].join(' '), { shell: true, stdio: 'inherit' });
    result.status !== 0 && error('7. Compile LUA Runtime into WASM');

    // Move lua-runtime.js into tos-web source
    fs.renameSync(wasm_lua_runtime, path.join(TOS_WEB_SRC_ASSETS_WORKER, 'lua.min.js'));
    fs.renameSync(wasm_lua_runtime.replace('.js', '.wasm'), wasm_lua_runtime.replace('.js', '.wasm.js'));

    /*
    // Testing (Note: don't forget to change the environment above to 'node')
    await new Promise((resolve, reject) => {
        Module = require(path.join('..', wasm_lua_runtime));
        Module = Module({
            wasmBinary: new Uint8Array(fs.readFileSync(wasm_lua_runtime.replace('.js', '.wasm'))),
            onRuntimeInitialized: () => resolve(),
        });
    });

    let monster = {
        "CON_BM": 0,
        "MHP_BM": 0,
        "ClassID": 57018,
        "Level": 46,
        "STR_Rate": 10,
        "CON_Rate": 5,
        "INT_Rate": 4,
        "MNA_Rate": 2,
        "DEX_Rate": 6,
        "Blockable": 0,
        "HPCount": 0,
        "ATK_RANGE": 150,
        "EXP_Rate": 150,
        "JEXP_Rate": 150,
        "SuperDropRegenRatio": 100,
        "SuperDropRatio": 100,
        "SuperExpRegenRatio": 12000,
        "Scale": 0.3,
        "WlkMSPD": 32,
        "RunMSPD": 40,
        "SurroundSize": 3,
        "KDArmor": 1,
        "Drop_Etc": 0,
        "Drop_Gold": 0,
        "Drop_Weapon1": 0,
        "Drop_Weapon2": 0,
        "Drop_Armor1": 0,
        "Drop_Armor2": 0,
        "Hardness_ATK": 1,
        "Hardness_DEF": 1,
        "BaseOffset": 0,
        "FIXMSPD_BM": 0,
        "SecPerAngle": 2,
        "GuardImpactTime": 1500,
        "FixedAttack": 0,
        "FixedDefence": 0,
        "FixedLife": 0,
        "MonSR": 1,
        "MonSDR": 1,
        "BLOCK": 0,
        "PARRY": 0,
        "HitRng": 50,
        "SearchRange": 120,
        "AniASPD": 2500,
        "NumOfAttack": 3,
        "HitTime1": 0,
        "HitTime2": 0,
        "HitTime3": 0,
        "BornTime": 1500,
        "DeadTime": 1500,
        "DyingTime": 700,
        "MinR": 1,
        "MaxR": 20,
        "ForceVel": 100,
        "SplRange": 0,
        "SplLimit": 0,
        "SplDam": 0,
        "BuffFreq": 0,
        "Ratio": 1,
        "PreDelay": 0,
        "LifeTime": 0,
        "Range": 0,
        "AppTime": 50,
        "HitRadius": -1,
        "Mass": 1,
        "Hit": 100,
        "RHP": 0,
        "KP": 100,
        "Hits": 1,
        "KDownPower": 100,
        "KDownVAngle": 10,
        "Stat": 0,
        "ACC": 0,
        "CRASH": 0,
        "KDRank": 1,
        "TargetMark": 1,
        "TargetWindow": 1,
        "Hide": 0,
        "ShowBaseInfoUI": 1,
        "DialogRotate": 0,
        "DialogChaseDist": 0,
        "MaxDialog": 0,
        "QuestCount1": 0,
        "QuestCount2": 0,
        "QuestCount3": 0,
        "QuestCount4": 0,
        "NumArg1": 0,
        "NumArg2": 0,
        "NumArg3": 0,
        "NumArg4": 0,
        "UseAiOutOfPC": 0,
        "MonDmgRate": 1,
        "ShieldRate": 0,
        "HitDelayFix": 1,
        "CantGenRange": 0,
        "ClassName": "Galok",
        "Boss_UseZone": "",
        "Name": "갈록",
        "EventHandler": "handler_bs_painbarrier/handler_atk_bleed",
        "Summons": "",
        "Missile": "",
        "StatType": 13,
        "Journal": "Galok",
        "SET": "monster_Galok",
        "SET_ANI": "Galok",
        "SkillType": "Galok",
        "DropItemList": "Galok",
        "Attribute": "Dark",
        "RaceType": "Velnias",
        "ArmorMaterial": "Leather",
        "MoveType": "Normal",
        "Size": "L",
        "DebuffRank": "",
        "UniqueName": "",
        "JobName": "",
        "RingCommand": "",
        "Tactics": "",
        "BTree": "BasicMonster",
        "SimpleAI": "",
        "AIType": "",
        "CustomAlramBGM": "",
        "BornScript": "",
        "DeadScript": "",
        "HeadIcon": "",
        "Icon": "mon_Galok",
        "MinimapIcon": "",
        "TooltipType": "CreateMon",
        "TargetIcon": "",
        "ModelType": "3D",
        "BoneScale": "",
        "AttachEffectIndex": "",
        "DeadEffect": "",
        "AttackType": "ATK",
        "HitType": "Melee",
        "HitProof": "NO",
        "HitValue": "YES",
        "DialogCursor": "DIALOG",
        "Faction": "Monster",
        "GroupName": "Monster",
        "Feature1": "",
        "Feature2": "",
        "OnCheat": "YES",
        "MonRank": "Elite",
        "Grade": "Grade8",
        "BornAni": "",
        "SpecialDefType": "",
        "SpecialAtkType": "",
        "ImmuneBuff_BM": "",
        "ImmuneDebuff": "",
        "JobType": "Warrior",
        "Race1": "",
        "Race2": "",
        "Race3": "",
        "LayerType": "Terrestrial",
        "WpnType": "Sword",
        "SkinType": "Metal",
        "BlowSoundType": "Sword",
        "DefSoundType": "Flesh",
        "BlkSoundType": "Sword",
        "AtkType": "Single",
        "ClassType": "Melee",
        "SplType": "",
        "Buff": "",
        "DefType": "",
        "BlkType": "",
        "Rotate": "YES",
        "OBB": "NO",
        "Obstacle": "NO",
        "OBBSize": "0;0;0",
        "Interactive": "YES",
        "Hittable": "YES",
        "DropItemIndex": "",
        "KdDead": "TRUE",
        "HoldProof": "NO",
        "PrevTMName": "",
        "TMName": "",
        "NextTMName": "",
        "PrevTSName": "",
        "TSName": "",
        "NextTSName": "",
        "IdleScript": "",
        "ActiveSpawn": "",
        "Enter": "",
        "Leave": "",
        "Dialog": "",
        "Occupation": "",
        "ViewInvi": "FALSE",
        "SizeFont": "{@st43}",
        "QuestName": "",
        "OnlyPCCheck": "YES",
        "StrArg1": "",
        "StrArg2": "",
        "NpcMark": "",
        "TargetMsg": "",
        "UseTitle": "YES",
        "AlwaysTitle": "NO",
        "Ridable": "NO",
        "OBBCheck": "YES",
        "WeaponMaterial": "ThinIron",
        "ResistType": "",
        "WeakType": "",
        "MergeTable1": "MonsterConst",
        "MergeClass1": "MonsterCP",
        "MergeTable2": "Actor",
        "MergeClass2": "Actor",
        "Icon_Wiki": "",
        "Desc": "갈록은 마계에서 일꾼들을 감독하던 몬스터입니다.",
        "HateMark": "YES"
    };

    let function_name = 'SCR_Get_MON_MHP';
    let args = JSON.stringify([monster]);

    monster['Lv'] = monster['Level'];
    monster['CON'] = Module.ccall('LUA_RUNTIME_CALL', 'string', ['string', 'string'], ['SCR_Get_MON_CON', JSON.stringify([monster])]);
    monster['MHP'] = Module.ccall('LUA_RUNTIME_CALL', 'string', ['string', 'string'], ['SCR_Get_MON_MHP', JSON.stringify([monster])]);

    console.log('Monster CON:', monster['CON'], 'HP:', monster['MHP']);
    */
})();

function error(message) {
    throw new Error(message);
}

function lua_file_clean(path) {
    fs.writeFileSync(path, fs
        .readFileSync(path, 'utf8')
        .replace(/\uFeFF/g, '') // unexpected symbol near char(239)
        .replace(/\\{/g, '{') // invalid escape sequence near '\{'
        .replace(/\\}/g, '}') // invalid escape sequence near '\}'
    )
}
function lua_generate_sharedconst() {
    let sharedconst = path.join(TOS_INPUT_DATA_IES, 'sharedconst.ies');
        sharedconst = papaparse.parse(fs.readFileSync(sharedconst, 'utf8'), {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        }).data;

        sharedconst = sharedconst
            .filter(value => value['UseInScript'] === 'YES')
            .map(value => `${ value['ClassName'] } = ${ value['Value'] };`);

    fs.writeFileSync(path.join(SRC_lua, 'sharedconst.lua'), sharedconst.join('\n'));
}

function writer_write(data, writer) {
    return new Promise((resolve, reject) => writer.write(data, 'utf8', () => resolve()));
}