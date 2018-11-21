import {TOSEntity} from "../tos-entity.model";
import {
  ITOSAttribute, ITOSBuild,
  ITOSGem,
  ITOSJob,
  ITOSSkill,
  ITOSSkillRequiredStance,
  TOSAttackType,
  TOSDataSet,
  TOSElement,
  TOSSkillRequiredStanceCompanion,
} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";
import {LUAService} from "../../../service/lua.service";

export class TOSSkill extends TOSEntity implements ITOSSkill {

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
  private readonly prop_BasicSP: number;
  private readonly prop_LvUpSpendPoison: number;
  private readonly prop_LvUpSpendSp: number;
  private readonly prop_SklAtkAdd: number;
  private readonly prop_SklAtkAddByLevel: number;
  private readonly prop_SklFactor: number;
  private readonly prop_SklFactorByLevel: number;
  private readonly prop_SklSR: number;
  private readonly prop_SpendItemBaseCount: number;
  private readonly sp: string;

  private description: string;
  private link_Attributes: ITOSAttribute[];
  private link_Gem: ITOSGem;
  private link_Job: ITOSJob;

  readonly CoolDown: number;
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
  readonly TypeAttack: TOSAttackType;

  constructor(private json: TOSSkill) {
    super(TOSDataSet.SKILLS, json);

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
    this.prop_BasicSP = +json['Prop_BasicSP'];
    this.prop_LvUpSpendPoison = +json['Prop_LvUpSpendPoison'];
    this.prop_LvUpSpendSp = +json['Prop_LvUpSpendSp'];
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
    this.sp = json['SP']
      ? JSON.parse(json['SP'] + '')
      : null;
    this.TypeAttack = Object.values(TOSAttackType)[+json.TypeAttack];
  }

  get Description(): string {
    return this.description = this.description
      ? this.description
      : this.tooltipToHTML(this.json.Description);
  }

  get Link_Attributes(): ITOSAttribute[] {
    return this.link_Attributes = this.link_Attributes
      ? this.link_Attributes
      : this.json.Link_Attributes
        ? JSON
          .parse(this.json.Link_Attributes + '')
          .map(value => TOSDomainService.attributesById[value])
        : null;
  }

  get Link_Gem(): ITOSGem {
    return this.link_Gem = this.link_Gem
      ? this.link_Gem
      : this.json.Link_Gem
        ? TOSDomainService.gemsById[+this.json.Link_Gem]
        : null;
  }

  get Link_Job(): ITOSJob {
    return this.link_Job = this.link_Job
      ? this.link_Job
      : this.json.Link_Job
        ? TOSDomainService.jobsById[+this.json.Link_Job]
        : null;
  }

  Effect(build: ITOSBuild, showFactors: boolean): string {
    //console.log('effect:', this.effect);
    let dependencies: string[] = [];
    let effect: string = this.effect;
    let level = build.skillLevel(this);

    // Match effect properties (e.g. #{SkillFactor}#%{nl}AoE Attack Ratio: #{SkillSR}
    this.EffectProps.forEach(match => {
      // console.log('prop:', match[1]);
      let prop = match[1];
      let result = this.effectToEval(prop, build);

      for (let dependency of result.dependencies)
        if (dependencies.indexOf(dependency) == -1)
          dependencies.push(dependency);

      if (showFactors && level == 0) {
        effect = effect.replace(match[0], '<b>[' + prop + ']</b>')
      } else {
        effect = effect.replace(match[0], result.value + (result.dependencies.length ? '*' : ''));
      }
    });

    // Add dependencies (if available)
    if (dependencies) {
      effect = effect + '\n';
      dependencies.forEach(value => effect = effect + "\n* Depends on Character's " + value);
    }

    return effect.replace(/{nl}/g, '\n');
  }
  EffectFormula(prop: string, build: ITOSBuild): string {
    return this.effectToHuman(prop, build);
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
  SP(build: ITOSBuild): number {
    return this.effectToEval('sp', build).value;
  }

  private effectContext(prop: string, build: ITOSBuild, human?: boolean): object {
    let player = !human ? {
      CON: build.Stats.CON,
      DEX: build.Stats.DEX,
      INT: build.Stats.INT,
      MNA: build.Stats.SPR,
      STR: build.Stats.STR,
    } : null;
    let skill = {
      'BasicPoison': this.prop_BasicPoison,
      'BasicSP': this.prop_BasicSP,
      'ClassName': '"' + this.$ID_NAME + '"',
      'Level': Math.max(1, build.skillLevel(this)),
      'LvUpSpendPoison': this.prop_LvUpSpendPoison,
      'LvUpSpendSp': this.prop_LvUpSpendSp,
      'SklAtkAdd': this.prop_SklAtkAdd,
      'SklAtkAddByLevel': this.prop_SklAtkAddByLevel,
      'SklFactor': this.prop_SklFactor,
      'SklFactorByLevel': this.prop_SklFactorByLevel,
      'SklSR': this.prop_SklSR,
      'SpendItemBaseCount': this.prop_SpendItemBaseCount,
    };

    if (prop != 'SkillFactor' && this.effectSource('SkillFactor'))
      skill['SkillFactor'] = this.effectToEval('SkillFactor', build).value;

    return { player, skill }
  }
  private effectToEval(prop: string, build: ITOSBuild): { dependencies: string[], value: number } {
    let source = this.effectSource(prop);
    let context = this.effectContext(prop, build);

    let result = LUAService.parse(build, source, context);
    return { dependencies: result.dependencies, value: eval(result.func.join('\n')) };
  }
  private effectToHuman(prop: string, build: ITOSBuild): string {
    let source = this.effectSource(prop);
    let context = this.effectContext(prop, build, true);

    return LUAService.human(build, source, context);
  }
  private effectSource(prop: string): string[] {
    return this[prop] != undefined
      ? this[prop]
      : this['effect_' + prop];
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

    return description
      .replace(/{\/}/g, '')
      .replace(/{nl}/g, '\n');
  }
}

export class TOSSkillRequiredStance implements ITOSSkillRequiredStance {
  Icon: string;
  Name: string;

  constructor(json: TOSSkillRequiredStance) {
    this.Icon = 'assets/icons/' + json.Icon + '.png';
    this.Name = json.Name;
  }
}
