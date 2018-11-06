import {TOSItem} from "../tos-item.model";
import {ITOSGem, ITOSGemBonus, ITOSSkill, TOSDataSet, TOSGemSlot, TOSGemType, TOSStat} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";

export class TOSGem extends TOSItem implements ITOSGem {
  private readonly bonusBoots: TOSGemBonus[];
  private readonly bonusGloves: TOSGemBonus[];
  private readonly bonusSubWeapon: TOSGemBonus[];
  private readonly bonusTopAndBottom: TOSGemBonus[];
  private readonly bonusWeapon: TOSGemBonus[];
  private link_Skill: ITOSSkill;

  readonly TypeGem: TOSGemType;

  constructor(json: TOSGem) {
    super(TOSDataSet.GEMS, json);

    for (let slot of Object.values(TOSGemSlot)) {
      this['bonus' + slot] = json['Bonus' + slot]
        ? JSON
          .parse(json['Bonus' + slot] + '')
          .map(json => new TOSGemBonus(json))
        : null;
    }

    this.TypeGem = Object.values(TOSGemType)[+json.TypeGem];
  }

  get Link_Skill(): ITOSSkill {
    return this.link_Skill = this.link_Skill
      ? this.link_Skill
      : (this.json as TOSGem).Link_Skill
        ? TOSDomainService.skillsById[+(this.json as TOSGem).Link_Skill]
        : null;
  }

  Bonus(level: number): { [key:string]: TOSGemBonus[]} {
    return Object
      .values(TOSGemSlot)
      .reduce((result, slot, i) => {
        if (this['bonus' + slot])
          result[slot] = [
            this['bonus' + slot][(level - 1) * 2],
            this['bonus' + slot][(level - 1) * 2 + 1]
          ];

        return result;
      }, {})
  }

}

export class TOSGemBonus implements ITOSGemBonus {
  Slot: TOSGemSlot;
  Stat: string | TOSStat;
  Value: number;

  constructor(json: TOSGemBonus) {
    this.Slot = Object.values(TOSGemSlot)[+json.Slot];
    this.Stat = Object.values(TOSStat)[+json.Stat] || json.Stat;
    this.Value = +json.Value;
  }

  toString(): string {
    let string = isNaN(this.Value)
      ? this.Stat as string
      : this.Stat + ' ' + (this.Value > 0 ? '+ ' : this.Value < 0 ? '- ' : '') + Math.abs(this.Value);

                        string = string.split('+').join('<span class="text-success">▲</span>');
    if (this.Value < 0) string = string.split('-').join('<span class="text-danger">▼</span>');

    return string;
  }

}
