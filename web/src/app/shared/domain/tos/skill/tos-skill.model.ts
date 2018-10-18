import {TOSAttackType, TOSElement, TOSEntity, TOSStat} from "../entity/tos-entity.model";
import {TOSBuildStats} from "../tos-build";
import {TOSRepositoryService} from "../tos-repository.service";
import {TOSAttribute} from "../attribute/tos-attribute.model";
import {TOSGem} from "../item/gem/tos-gem.model";
import {TOSJob} from "../job/tos-job.model";

export class TOSSkill extends TOSEntity {
  private static readonly LUA_CONTEXT: string[] = [ // Some global functions used by the formulas
    'var GetAbility = (a, b) => null;',
    'var GetExProp = (a, b) => null;',
    'var GetSumOfEquipItem = (a, b) => 0;',
    'var IsBuffApplied = (a, b) => null;',
    'var IsPVPServer = (a) => 0;',
    'var TryGetProp = (a, b) => a ? a[b] : null;',
    'var skillOwner = ' + JSON.stringify({ ClassName: 'PC' }) + ';',
    'var value = 0;',
    'var zone = null;',
  ];
  private static readonly STATS_RUNTIME = { // Player stats used by the formulas
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
    'MINATK': TOSStat.ATTACK_LIMIT_MIN,
    'MINMATK': 'Minimum Magic Attack',
    'MINPATK': 'Minimum Physical Attack',
  };

  private readonly effect: string;
  private readonly effect_CaptionRatio: string[];
  private readonly effect_CaptionRatio2: string[];
  private readonly effect_CaptionRatio3: string[];
  private readonly effect_CaptionTime: string[];
  private readonly effect_SkillAtkAdd: string[];
  private readonly effect_SkillFactor: string[];
  private readonly effect_SkillSR: string[];
  private readonly effect_SpendItemCount: string[];
  private readonly effect_SpendPoison: string[];
  private readonly effect_SpendSP: string[];
  private readonly levelMax: number;
  private readonly prop_BasicPoison: number;
  private readonly prop_LvUpSpendPoison: number;
  private readonly prop_SklAtkAdd: number;
  private readonly prop_SklAtkAddByLevel: number;
  private readonly prop_SklFactor: number;
  private readonly prop_SklFactorByLevel: number;
  private readonly prop_SklSR: number;
  private readonly prop_SpendItemBaseCount: number;
  private readonly sp: number;

  private link_Attributes: TOSAttribute[];
  private link_Gem: TOSGem;
  private link_Job: TOSJob;

  readonly CoolDown: number;
  readonly DescriptionHTML: string;
  readonly Element: TOSElement;
  readonly IsEnchanter: boolean;
  readonly IsPardoner: boolean;
  readonly IsShinobi: boolean;
  readonly LevelPerCircle: number;
  readonly OverHeat: number;
  readonly RequiredCircle: number;
  readonly RequiredStance: TOSSkillRequiredStance[];
  readonly RequiredStanceCompanion: TOSSkillRequiredStanceCompanion;
  readonly RequiredSubWeapon: boolean;
  readonly SPPerLevel: number;
  readonly TypeAttack: TOSAttackType;


  constructor(private json: TOSSkill) {
    super(json, 'skills');

    this.DescriptionHTML = this.tooltipToHTML(this.Description);
    this.Description = null;

    this.CoolDown = +json.CoolDown;
    this.effect = this.tooltipToHTML(json['Effect'] + '');
    this.effect_CaptionRatio = json['Effect_CaptionRatio']
      ? JSON.parse(json['Effect_CaptionRatio'])
      : null;
    this.effect_CaptionRatio2 = json['Effect_CaptionRatio2']
      ? JSON.parse(json['Effect_CaptionRatio2'])
      : null;
    this.effect_CaptionRatio3 = json['Effect_CaptionRatio3']
      ? JSON.parse(json['Effect_CaptionRatio3'])
      : null;
    this.effect_CaptionTime = json['Effect_CaptionTime']
      ? JSON.parse(json['Effect_CaptionTime'])
      : null;
    this.effect_SkillAtkAdd = json['Effect_SkillAtkAdd']
      ? JSON.parse(json['Effect_SkillAtkAdd'])
      : null;
    this.effect_SkillFactor = json['Effect_SkillFactor']
      ? JSON.parse(json['Effect_SkillFactor'])
      : null;
    this.effect_SkillSR = json['Effect_SkillSR']
      ? JSON.parse(json['Effect_SkillSR'])
      : null;
    this.effect_SpendItemCount = json['Effect_SpendItemCount']
      ? JSON.parse(json['Effect_SpendItemCount'])
      : null;
    this.effect_SpendPoison = json['Effect_SpendPoison']
      ? JSON.parse(json['Effect_SpendPoison'])
      : null;
    this.effect_SpendSP = json['Effect_SpendSP']
      ? JSON.parse(json['Effect_SpendSP'])
      : null;
    this.Element = Object.values(TOSElement)[+json.Element];
    this.IsEnchanter = (json.IsEnchanter + '') == 'True';
    this.IsPardoner = (json.IsPardoner + '') == 'True';
    this.IsShinobi = (json.IsShinobi + '') == 'True';
    this.levelMax = +json['LevelMax'];
    this.LevelPerCircle = +json.LevelPerCircle;
    this.OverHeat = +json.OverHeat;
    this.prop_BasicPoison = +json['Prop_BasicPoison'];
    this.prop_LvUpSpendPoison = +json['Prop_LvUpSpendPoison'];
    this.prop_SklAtkAdd = +json['Prop_SklAtkAdd'];
    this.prop_SklAtkAddByLevel = +json['Prop_SklAtkAddByLevel'];
    this.prop_SklFactor = +json['Prop_SklFactor'];
    this.prop_SklFactorByLevel = +json['Prop_SklFactorByLevel'];
    this.prop_SklSR = +json['Prop_SklSR'];
    this.prop_SpendItemBaseCount = +json['Prop_SpendItemBaseCount'];
    this.RequiredCircle = +json.RequiredCircle;
    this.RequiredStance = json.RequiredStance
      ? JSON
        .parse(json.RequiredStance + '')
        .map(json => new TOSSkillRequiredStance(json))
      : null;
    this.RequiredStanceCompanion = Object.values(TOSSkillRequiredStanceCompanion)[+json.RequiredStanceCompanion];
    this.RequiredSubWeapon = (json.RequiredSubWeapon + '') == 'True';
    this.sp = +json['SP'];
    this.SPPerLevel = +json.SPPerLevel;
    this.TypeAttack = Object.values(TOSAttackType)[+json.TypeAttack];
  }

  get Link_Attributes(): TOSAttribute[] {
    return this.link_Attributes = this.link_Attributes
      ? this.link_Attributes
      : this.json.Link_Attributes
        ? JSON
          .parse(this.json.Link_Attributes + '')
          .map(value => TOSRepositoryService.findAttributesById(value))
        : null;
  }

  get Link_Gem(): TOSGem {
    return this.link_Gem = this.link_Gem
      ? this.link_Gem
      : this.json.Link_Gem
        ? TOSRepositoryService.findGemsById(+this.json.Link_Gem)
        : null;
  }

  get Link_Job(): TOSJob {
    return this.link_Job = this.link_Job
      ? this.link_Job
      : this.json.Link_Job
        ? TOSRepositoryService.findJobsById(+this.json.Link_Job)
        : null;
  }

  Effect(level: number, stats: TOSBuildStats, showFactors: boolean): string {
    //console.log('effect:', this.effect);
    let dependencies: string[] = [];
    let effect: string = this.effect;

    // Match effect properties (e.g. #{SkillFactor}#%{nl}AoE Attack Ratio: #{SkillSR}
    this.EffectProps.forEach(match => {
      // console.log('prop:', match[1]);
      let prop = match[1];
      let value = this.effectToValue(prop, level, stats);

      for (let dependency of value.dependencies)
        if (dependencies.indexOf(dependency) == -1)
          dependencies.push(dependency);

      if (showFactors && level == 0) {
        effect = effect.replace(match[0], '<b>[' + prop + ']</b>')
      } else {
        effect = effect.replace(match[0], value.value + (value.dependencies.length ? '*' : ''));
      }
    });

    // Add dependencies (if available)
    if (dependencies) {
      effect = effect + '\n';
      dependencies.forEach(value => effect = effect + "\n* Depends on Character's " + value);
    }

    return effect.replace(/{nl}/g, '\n');
    //console.log(this.effectSkillFactor.join('\n'))
    //lua.run({ skill: { SklFactor: this.prop_SklFactor, SklFactorByLevel: this.prop_SklFactorByLevel, Level: this.level.getValue() }}, this.effectSkillFactor.join('\n'), onResult);
  }
  EffectFormula(level: number, prop: string, stats: TOSBuildStats): string {
    return this.effectToHuman(level, prop, stats);
  }
  get EffectProps(): string[] {
    let match: RegExpExecArray;
    let regexEffect = /(?:#{(\w+)}#)+/g;
    let result = [];

    while (match = regexEffect.exec(this.effect))
      result.push(match);

    return result;
  }

  LevelMax(circle?: number): number {
    return circle != undefined
      ? Math.min(this.levelMax, (circle - this.RequiredCircle + 1) * this.LevelPerCircle)
      : this.levelMax;
  }
  SP(level: number): number { return Math.floor(this.sp + this.SPPerLevel * (level - 1)) }

  get BasicPoison(): number { return this.prop_BasicPoison; }
  get ClassName(): string { return '"' + this.$ID_NAME + '"'; }
  get LvUpSpendPoison(): number { return this.prop_LvUpSpendPoison; }
  get SklAtkAdd(): number { return this.prop_SklAtkAdd; }
  get SklAtkAddByLevel(): number { return this.prop_SklAtkAddByLevel; }
  get SklFactor(): number { return this.prop_SklFactor; }
  get SklFactorByLevel(): number { return this.prop_SklFactorByLevel; }
  get SklSR(): number { return this.prop_SklSR; }
  get SpendItemBaseCount(): number { return this.prop_SpendItemBaseCount; }

  private effectProp(prop: string): string[] {
    return this['effect_' + prop];
  }
  private effectToEval(prop: string, level: number, stats: TOSBuildStats, includeContext: boolean): { dependencies: string[], func: string[], pc: any, skill: any} {
    let dependencies: string[] = [];
    let effect = this.effectProp(prop);
    let pc: object = { CON: stats.CON, DEX: stats.DEX, INT: stats.INT, MNA: stats.SPR, STR: stats.STR };
    let skill: object = { Level: Math.max(1, level), SP: this.sp };
    let match: RegExpExecArray;

    // Prepare player and skill
    effect.forEach(line => {
      // Note: we need to reset these on every new line so it doesn't skip matches
      let regexPlayer = /(?:pc\.(\w+))+/g;
      let regexSkill = /(?:skill\.(\w+))+/g;

      // Match player properties (e.g. value = value + pc.MINPATK * (Monk2_abil.Level*0.2))
      while (match = regexPlayer.exec(line)) {
        let prop: string = match[1];
        pc[prop] = pc[prop] || 1;

        dependencies.push(TOSSkill.STATS_RUNTIME[prop] + '');
      }

      // Match skill properties (e.g. local value = skill.SklAtkAdd + (skill.Level - 1) * skill.SklAtkAddByLevel;)
      while (match = regexSkill.exec(line)) {
        let prop: string = match[1];

        if (prop == 'SkillFactor')
          skill[prop] = this.effectToValue(prop, level, stats).value;
        else if (skill[prop] == undefined)
          skill[prop] = this[prop]
      }
    });

    // Execute function
    let func: string[] = [];
    func.push('(function () {');
    if (includeContext) func.push('var pc = ' + JSON.stringify(pc) + ';');
    if (includeContext) func.push('var skill = ' + JSON.stringify(skill) + ';');
    if (includeContext) func = func.concat(TOSSkill.LUA_CONTEXT);
    func = func.concat(effect);
    func.push('}())');

    //console.log('Executing effect (', prop, ') function:\n', func.join('\n'));
    return { dependencies, func, pc, skill };
  }
  private effectToHuman(level: number, prop: string, stats: TOSBuildStats): string {
    let effect = this.effectToEval(prop, level, stats, false);
    let match: RegExpExecArray;
    let result: string[] = [];
    let skill = effect.skill;

    for (let line of effect.func) {
      let lineOriginal = line;

      // Note: we need to reset these on every new line so it doesn't skip matches
      let regexAbility = /GetAbility\(pc, ["'](.+)["']\)/g;
      let regexGetProp = /TryGetProp\((.+), "(.+)"\)/g;
      let regexPlayer = /(?:pc\.(\w+))+/g;
      let regexSkill = /(?:skill\.(\w+))+/g;

      while (match = regexAbility.exec(lineOriginal)) {
        let attribute = TOSRepositoryService.findAttributesByIdName(match[1]);
        if (attribute)
          line = line.replace(match[0], '<b>[' + attribute.Name + ']</b>');
      }

      while (match = regexGetProp.exec(lineOriginal)) {
        line = line.replace(match[0], match[1] + '.' + match[2]);
      }

      while (match = regexPlayer.exec(lineOriginal)) {
        line = line.replace(match[0], 'player.' + match[1]);
      }

      while (match = regexSkill.exec(lineOriginal)) {
        let prop: string = match[1];

        if (skill[prop] != undefined && prop != 'Level')
          line = line.replace(match[0], skill[prop]);
        else
          line = line.replace(match[0], '<b>' + match[0] + '</b>')
      }

      line = line.replace(/!=/g, 'not');
      line = line.replace(/&&/g, 'and');
      line = line.replace(/null/g, 'Null');

      result.push(line)
    }

    return result
      .slice(1, result.length - 1)
      .join('\n');
  }
  private effectToValue(prop: string, level: number, stats: TOSBuildStats): { dependencies: string[], value: number } {
    let effect = this.effectToEval(prop, level, stats, true);
    return { dependencies: effect.dependencies, value: eval(effect.func.join('\n')) };
  }

  private tooltipToHTML(description: string): string {
    if (description == null) return null;

    let regexColor = /{(#.+?)}{ol}(\[.+?\]){\/}{\/}/g;
    let match: RegExpExecArray;

    while (match = regexColor.exec(description)) {
      if (match[2].indexOf('speedofatk'))
        match[2] = match[2].replace('{img tooltip_speedofatk}', ' <img src="assets/images/skill_attackspeed.png" /> ');

      description = description.replace(match[0], '<span style="color: ' + match[1] + '">' + match[2] + '</span>');
    }

    return description.replace(/{\/}/g, '');
  }
}

export class TOSSkillRequiredStance {
  Icon: string;
  Name: string;

  constructor(json: TOSSkillRequiredStance) {
    this.Icon = 'assets/icons/' + json.Icon + '.png';
    this.Name = json.Name;
  }
}

export enum TOSSkillRequiredStanceCompanion {
  BOTH = 'Yes',
  NO = 'No',
  YES = 'Exclusive'
}
