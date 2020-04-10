import {Injectable} from '@angular/core';
import {ITOSBuild, TOSStat} from "../domain/tos/tos-domain";
import {TOSDomainService} from "../domain/tos/tos-domain.service";
import {LEVEL_LIMIT} from "../domain/tos/tos-build";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class LUAService {

  // Some global functions used by IMC
  private static readonly LUA_CONTEXT: string[] = [
    '// LUA CONTEXT BEGIN ---------------------------',
    'var PARTY_NORMAL = 0;',
    'var GetAbility = (a, b) => null;',
    'var GetClassList = (a) => null;',
    'var GetClassByNameFromList = (a) => null;',
    'var GetExProp = (a, b) => null;',
    'var GetJobHistoryString = (a) => null;',
    'var GetJobHistoryList = (pc) => pc.JobHistoryList;',
    'var GetMyJobHistoryString = (a) => null;',
    'var GetSumOfEquipItem = (a, b) => 0;',
    'var GetZoneName = (a) => null;',
    'var TryGetProp = (a, b, c) => a && a[b] || c;',
    'var IsBuffApplied = (a, b) => null;',
    'var IsRaidField = (a) => 0;',
    'var IsPVPField = (a) => 0;',
    'var IsPVPServer = (a) => 0;',
    'var IsServerSection = (a) => 0;',
    'var IsServerObj = (a) => 0;',
    'var SCR_COMMON_COOLDOWN_DECREASE = (pc, basicCooldown) => basicCooldown;',
    'var string = { find: (a, b) => a.indexOf(b) != -1 ? a.indexOf(b) : null };',
    'var StringSplit = (a, b) => a.split(b);',
    'var tonumber = (a) => +a;',
    'var i = 0;',
    'var owner = pc;',
    'var session = { party: {' +
    '   GetMyPartyObj: (a) => null,' +
    '   GetPartyMemberList: (a) => null,' +
    '} };',
    'var skillOwner = pc;',
    'var value = 0;',
    'var zone = null;',
    '// LUA CONTEXT END ---------------------------',
  ];

  // Some player stats used by the formulas
  private static readonly STATS_RUNTIME = {
    'CON': TOSStat.CON,
    'DEX': TOSStat.DEX,
    'INT': TOSStat.INT,
    'MNA': TOSStat.SPR,
    'STR': TOSStat.STR,
    'Lv': 'Level',
    'HR': TOSStat.ACCURACY,
    'MHP': TOSStat.HP,
    'MSP': TOSStat.SP,
    'SR': TOSStat.AOE_ATTACK_RATIO,
    'MSPD': TOSStat.MOVEMENT_SPEED,
    'MDEF': TOSStat.DEFENSE_MAGICAL,
    'DEF': TOSStat.DEFENSE_PHYSICAL,
    'PATK': TOSStat.ATTACK_PHYSICAL,
    'MATK': TOSStat.ATTACK_MAGICAL,
    'MAXATK': TOSStat.ATTACK_LIMIT_MAX,
    'MAXMATK': 'Maximum Magic Attack',
    'MAXPATK': 'Minimum Physical Attack',
    'MAXPATK_SUB': 'Maximum Physical Attack (Sub-Weapon)',
    'MINATK': TOSStat.ATTACK_LIMIT_MIN,
    'MINMATK': 'Minimum Magic Attack',
    'MINPATK': 'Minimum Physical Attack',
    'MINPATK_SUB': 'Minimum Physical Attack (Sub-Weapon)',
  };

  constructor() { }

  static eval(build: ITOSBuild, source: string[], context?: object): Observable<string | number> {
    return fromPromise((async () => {
      let func = (await this.parse(build, source, context).toPromise()).func;
      return eval(func.join('\n'));
    })())
  }

  static human(build: ITOSBuild, source: string[], context?: object): Observable<string> {
    return fromPromise((async () => {
      let func = (await this.parse(build, source, context, true).toPromise()).func;
          func = await Promise.all(func.map(async (line) => {
            // Note: we need to reset these on every new line so it doesn't skip matches
            let lineOriginal = line;
            let regexGetProp = /TryGetProp\((\w+), "(\w+)"\)/g;
            let regexAbility = /GetAbility\(pc, ["'](.+)["']\)/g;
            let match: RegExpExecArray;

            line = line.replace(/\/\*{b}\*\/(.+?)\/\*{b}\*\//g, '<b>$1</b>');  // Apply bolds
            line = line.replace(/(?:pc\.(\w+))+/g, 'player.$1');              // Rename pc to player
            line = line.replace(/!=/g, 'not');
            line = line.replace(/&&/g, 'and');
            line = line.replace(/null/g, 'Null');

            // TryGetProp(a, b) - return the 'b' property of the 'a' object
            while (match = regexGetProp.exec(lineOriginal)) {
              line = line.replace(match[0], match[1] + '.' + match[2]);
            }

            // GetAbility(pc, ability) - replace with attribute name
            while (match = regexAbility.exec(lineOriginal)) {
              let attribute = await TOSDomainService.attributesByIdName(match[1]).toPromise();
              if (attribute)
                line = line.replace(match[0], '<b>[' + attribute.Name + ']</b>');
              else
                line = line.replace(match[0], 'Null');
            }

            return line;
          }));

      return func
        .slice(1, -1)
        .join('\n');
    })());
  }

  static parse(build: ITOSBuild, source: string[], context?: object, human?: boolean): Observable<{ dependencies: string[], func: string[] }> {
    return fromPromise((async () => {
      let dependencies: string[] = [];
      let skill = context && context['skill'] || {};
      let player = context && context['player'] || {};
          player.ClassName = 'PC';
          player.JobHistoryList = build.Jobs && build.Jobs.map(value => value.$ID);
          player.Lv = LEVEL_LIMIT; // TODO: get level from build

      context && delete context['skill'];
      context && delete context['player'];

      // Process source code
      source = await Promise.all(source.map(async line => {
        // Note: we need to reset these on every new line so it doesn't skip matches
        let lineOriginal = line;
        let regexGetJobGrade = /GetJobGradeByName\(pc, (.+)\)/g;
        let regexGetJobLevelByName = /GetJobLevelByName\(pc, curJobClsName\)/g;
        let regexGetSkill = /GetSkill\(pc, (.+)\)/g;
        let regexPlayer = /(?:pc\.(\w+))+/g;
        let regexSkill = /(?:skill\.(\w+))+/g;
        let match: RegExpExecArray;

        // GetJobLevelByName(pc, curJobClsName);

        line = line.replace('GetTotalJobCount(pc)', build.Rank + '');

        // GetJobGrade(pc, job) - return the circle of the requested job
        while (match = regexGetJobGrade.exec(lineOriginal)) {
          let jobName = (['"', "'"].indexOf(match[1][0]) > -1 ? match[1] : context[match[1]]).slice(1, -1);
          let job = await TOSDomainService.jobsByIdName(jobName).toPromise();

          line = line.replace(match[0], build.jobCircle(job) + '');
        }

        // GetJobGradeByName(pc, curJobClsName) - return the circle for the current job
        while (match = regexGetJobLevelByName.exec(lineOriginal)) {
          let jobName = player['JobName'].slice(1, -1);
          let job = await TOSDomainService.jobsByIdName(jobName).toPromise();

          line = line.replace(match[0], build.jobCircle(job) + '');
        }

        // GetSkill(pc, skill) - return a reference of the requested skill (with level)
        while (match = regexGetSkill.exec(lineOriginal)) {
          let skillName = (['"', "'"].indexOf(match[1][0]) > -1 ? match[1] : context[match[1]]).slice(1, -1);
          let skill = await TOSDomainService.skillsByIdName(skillName).toPromise();

          line = line.replace(match[0], JSON.stringify({ LevelByDB: build.skillLevel(skill) }));
        }

        // Player properties - replace available properties in-place, make remaining ones bold
        while (match = regexPlayer.exec(lineOriginal)) {
          let prop: string = match[1];

          // Hotfix: Ignore in case we're the left operand (e.g. skill.SklSr = 17)
          if (lineOriginal.indexOf('=') > lineOriginal.indexOf(prop))
            continue;

          if (player[prop] != undefined && prop != 'Lv') {
            line = line.replace(match[0], player[prop]);
          } else {
            // Note: we need to slice in case there are multiple occurrences on the string (as we replace with the same matched value)
            line =
              line.slice(0, match.index) +
              line.slice(match.index).replace(match[0], '/*{b}*/' + match[0] + '/*{b}*/')
          }

          player[prop] = player[prop] || 1;

          // Note: some stats are runtime only (e.g. MINPATK)
          dependencies.push(LUAService.STATS_RUNTIME[prop] + '');
        }

        // Skill properties - replace available properties in-place, make remaining ones bold
        while (match = regexSkill.exec(lineOriginal)) {
          let prop: string = match[1];

          // Hotfix: Ignore in case we're the left operand (e.g. skill.SklSr = 17)
          if (lineOriginal.indexOf('=') > lineOriginal.indexOf(prop))
            continue;

          if (skill[prop] != undefined && prop != 'Level')
            line = line.replace(match[0], skill[prop]);
          else
            // Note: we need to slice in case there are multiple occurrences on the string (as we replace with the same matched value)
            line =
              line.slice(0, match.index) +
              line.slice(match.index).replace(match[0], '/*{b}*/' + match[0] + '/*{b}*/')
        }

        return line;
      }));

      let func: string[] = [];
          func.push('(function () {');

      // Initialize context
      if (!human) {
        func.push('var pc = ' + JSON.stringify(player) + ';');
        func.push('var skill = ' + JSON.stringify(skill) + ';');
        func = func.concat(LUAService.LUA_CONTEXT);

        Object
          .keys(context)
          .forEach(key => {
            let value = typeof context[key] == 'object' ? JSON.parse(context[key]) : context[key];
            func.push('var ' + key + ' = ' + value + ';')
          });
      }

      // Execute
      func = func.concat(source);
      func.push('}())');

      //console.log('eval', func.join('\n'));
      return { dependencies, func };
    })())
  }

}
