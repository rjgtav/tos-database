let origin = location.origin + '/';
    origin = origin + (origin.indexOf('github.io') > 0 ? 'tos-database/' : '');

// Load LUA runtime
self['importScripts'](origin + 'assets/worker/lua.min.js');

let LUA;

//===========================================================================================================
//  Main
//===========================================================================================================
self.onmessage = async function(event) {
  let message = event.data;
  let cmd = message.cmd;
  let payload = message.payload;

  switch (cmd) {
    case 'call':
      postResponse(cmd, message.nonce, luaRuntimeCall(payload.functionName, ...payload.functionArgs));
      break;
    case 'load':
      // Download WASM
      let url = payload.url.toLowerCase();
      let xhr = new XMLHttpRequest();

      await new Promise((resolve, reject) => {
        xhr.onload = event => resolve();
        xhr.onprogress = event => postResponse('loadProgress', -1, { progress: event.loaded / event.total });
        xhr.open('GET', url);
        xhr.responseType = 'arraybuffer';
        xhr.send();
      });

      // Initialize WASM
      await new Promise((resolve, reject) => {
        LUA = Module({
          noExitRuntime: true,
          noInitialRun: true,
          wasmBinary: new Uint8Array(xhr.response),
          postRun: () => resolve()
        });
      });

      // Initialize LUA Runtime
      luaRuntimeCall('LUA_RUNTIME_INIT', payload.language, payload.region);

      /*
      // Testing
      let monster = {
        "CON_BM": 0,
        "MHP_BM": 0,
        "ClassID": 57102,
        "Level": 61,
        "STR_Rate": 6,
        "CON_Rate": 5,
        "INT_Rate": 3,
        "MNA_Rate": 5,
        "DEX_Rate": 4,
        "Blockable": 0,
        "HPCount": 0,
        "ATK_RANGE": 140,
        "EXP_Rate": 100,
        "JEXP_Rate": 100,
        "SuperDropRegenRatio": 100,
        "SuperDropRatio": 100,
        "SuperExpRegenRatio": 12000,
        "Scale": 0.7,
        "WlkMSPD": 0,
        "RunMSPD": 0,
        "SurroundSize": 3,
        "KDArmor": 999,
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
        "SecPerAngle": 1,
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
        "BornTime": 850,
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
        "DialogRotate": 1,
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
        "ClassName": "boss_Iltiswort_Q1",
        "Boss_UseZone": "f_rokas_25",
        "Name": "일티스워트",
        "EventHandler": "",
        "Summons": "boss_summon_spiderweb/boss_summon_fireball",
        "Missile": "",
        "StatType": 59,
        "Journal": "boss_Iltiswort",
        "SET": "Iltiswort",
        "SET_ANI": "Iltiswort",
        "SkillType": "boss_Iltiswort",
        "DropItemList": "boss_Iltiswort_Q1",
        "Attribute": "Poison",
        "RaceType": "Forester",
        "ArmorMaterial": "Cloth",
        "MoveType": "Holding",
        "Size": "XL",
        "DebuffRank": "Normal",
        "UniqueName": "",
        "JobName": "",
        "RingCommand": "",
        "Tactics": "",
        "BTree": "BasicBoss",
        "SimpleAI": "",
        "AIType": "",
        "CustomAlramBGM": "",
        "BornScript": "",
        "DeadScript": "",
        "HeadIcon": "",
        "Icon": "mon_onion",
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
        "MonRank": "Boss",
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
        "Rotate": "NO",
        "OBB": "YES",
        "Obstacle": "NO",
        "OBBSize": "50;50;120",
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
        "Desc": "강력한 식물 몬스터들에게서 찾을 수 있는 장점은 대개 그들이 움직이지 못하는 고정형이라는 사실 정도입니다.",
        "HateMark": "YES"
      };

      let function_name = 'SCR_Get_MON_MHP';
      let args = JSON.stringify([monster]);

      monster['Lv'] = monster['Level'];
      monster['CON'] = luaRuntimeCall('SCR_Get_MON_CON', monster);
      monster['MHP'] = luaRuntimeCall('SCR_Get_MON_MHP', monster);

      console.log('Monster CON:', monster['CON'], 'HP:', monster['MHP']);
      */

      postResponse(cmd, message.nonce, null);
      break;
  }
};

//===========================================================================================================
//  Methods
//===========================================================================================================
function luaRuntimeCall(functionName, ...functionArgs) {
  let result = LUA.ccall('LUA_RUNTIME_CALL', 'string', ['string', 'string'], [functionName, JSON.stringify(functionArgs)]);

  if (result == null)
    return result;
  if (result === '$ERROR$')
    throw new Error('An error has occurred during LUA_RUNTIME_CALL. Please check the previous log message for details');

  return JSON.parse(result);
}

function postResponse(cmd, nonce, payload) {
  self.postMessage({ cmd, nonce, payload });
}
