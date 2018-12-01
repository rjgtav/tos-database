import {TOSEntity} from "../tos-entity.model";
import {
  ITOSBuild,
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

  constructor(json: TOSSkill) {
    super(TOSDataSet.SKILLS, json);
  }

  get Description() { return this.$lazyPropertyStringMultiline('Description', value => this.tooltipToHTML(value)) }
  get CoolDown() { return this.$lazyPropertyNumber('CoolDown') }

  get Effect(): string { return this.$lazyPropertyStringMultiline('Effect', value => this.tooltipToHTML(value)) }
  get Effect_CaptionRatio(): string[] { return this.$lazyPropertyJSONArray('Effect_CaptionRatio') as string[] }
  get Effect_CaptionRatio2(): string[] { return this.$lazyPropertyJSONArray('Effect_CaptionRatio2') as string[] }
  get Effect_CaptionRatio3(): string[] { return this.$lazyPropertyJSONArray('Effect_CaptionRatio3') as string[] }
  get Effect_CaptionTime(): string[] { return this.$lazyPropertyJSONArray('Effect_CaptionTime') as string[] }
  get Effect_SkillAtkAdd(): string[] { return this.$lazyPropertyJSONArray('Effect_SkillAtkAdd') as string[] }
  get Effect_SkillFactor(): string[] { return this.$lazyPropertyJSONArray('Effect_SkillFactor') as string[] }
  get Effect_SkillSR(): string[] { return this.$lazyPropertyJSONArray('Effect_SkillSR') as string[] }
  get Effect_SpendItemCount(): string[] { return this.$lazyPropertyJSONArray('Effect_SpendItemCount') as string[] }
  get Effect_SpendPoison(): string[] { return this.$lazyPropertyJSONArray('Effect_SpendPoison') as string[] }
  get Effect_SpendSP(): string[] { return this.$lazyPropertyJSONArray('Effect_SpendSP') as string[] }
  get SP(): string[] { return this.$lazyPropertyJSONArray('SP') as string[] }

  get Element() { return this.$lazyPropertyEnum('Element', TOSElement) }
  get IsEnchanter() { return this.$lazyPropertyBoolean('IsEnchanter') }
  get IsPardoner() { return this.$lazyPropertyBoolean('IsPardoner') }
  get IsShinobi() { return this.$lazyPropertyBoolean('IsShinobi') }
  get LevelPerCircle() { return this.$lazyPropertyNumber('LevelPerCircle') }

  get Link_Attributes() { return this.$lazyPropertyJSONArray('Link_Attributes', value => TOSDomainService.attributesById[value]) }
  get Link_Gem() { return this.$lazyPropertyLink('Link_Gem', value => TOSDomainService.gemsById[value]) }
  get Link_Job() { return this.$lazyPropertyLink('Link_Job', value => TOSDomainService.jobsById[value]) }

  get OverHeat() { return this.$lazyPropertyNumber('OverHeat') }

  get Prop_BasicPoison() { return this.$lazyPropertyNumber('Prop_BasicPoison') }
  get Prop_BasicSP() { return this.$lazyPropertyNumber('Prop_BasicSP') }
  get Prop_LvUpSpendPoison() { return this.$lazyPropertyNumber('Prop_LvUpSpendPoison') }
  get Prop_LvUpSpendSp() { return this.$lazyPropertyNumber('Prop_LvUpSpendSp') }
  get Prop_SklAtkAdd() { return this.$lazyPropertyNumber('Prop_SklAtkAdd') }
  get Prop_SklAtkAddByLevel() { return this.$lazyPropertyNumber('Prop_SklAtkAddByLevel') }
  get Prop_SklFactor() { return this.$lazyPropertyNumber('Prop_SklFactor') }
  get Prop_SklFactorByLevel() { return this.$lazyPropertyNumber('Prop_SklFactorByLevel') }
  get Prop_SklSR() { return this.$lazyPropertyNumber('Prop_SklSR') }
  get Prop_SpendItemBaseCount() { return this.$lazyPropertyNumber('Prop_SpendItemBaseCount') }

  get RequiredCircle() { return this.$lazyPropertyNumber('RequiredCircle') }
  get RequiredStance() { return this.$lazyPropertyJSONArray('RequiredStance', value => new TOSSkillRequiredStance(value)) }
  get RequiredStanceCompanion() { return this.$lazyPropertyEnum('RequiredStanceCompanion', TOSSkillRequiredStanceCompanion) }
  get RequiredSubWeapon() { return this.$lazyPropertyBoolean('RequiredSubWeapon') }
  get TypeAttack() { return this.$lazyPropertyEnum('TypeAttack', TOSAttackType) }

  EffectDescription(build: ITOSBuild, showFactors: boolean): string {
    //console.log('effect:', this.Effect);
    let dependencies: string[] = [];
    let effect: string = this.Effect;
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

    while (match = regexEffect.exec(this.Effect))
      result.push(match);

    return result;
  }

  LevelMax(circle?: number): number {
    let levelMax = +this.$json['LevelMax'];

    return circle != undefined
      ? Math.min(levelMax, (circle - this.RequiredCircle + 1) * this.LevelPerCircle)
      : levelMax;
  }

  SPCost(build: ITOSBuild): number {
    return this.effectToEval('SP', build).value;
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
      'BasicPoison': this.Prop_BasicPoison,
      'BasicSP': this.Prop_BasicSP,
      'ClassName': '"' + this.$ID_NAME + '"',
      'Level': Math.max(1, build.skillLevel(this)),
      'LvUpSpendPoison': this.Prop_LvUpSpendPoison,
      'LvUpSpendSp': this.Prop_LvUpSpendSp,
      'SklAtkAdd': this.Prop_SklAtkAdd,
      'SklAtkAddByLevel': this.Prop_SklAtkAddByLevel,
      'SklFactor': this.Prop_SklFactor,
      'SklFactorByLevel': this.Prop_SklFactorByLevel,
      'SklSR': this.Prop_SklSR,
      'SpendItemBaseCount': this.Prop_SpendItemBaseCount,
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
      : this['Effect_' + prop];
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

export class TOSSkillRequiredStance implements ITOSSkillRequiredStance {
  Icon: string;
  Name: string;

  constructor(json: TOSSkillRequiredStance) {
    this.Icon = 'assets/icons/' + json.Icon + '.png';
    this.Name = json.Name;
  }
}
