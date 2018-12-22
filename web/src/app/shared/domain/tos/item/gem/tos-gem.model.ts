import {TOSItem} from "../tos-item.model";
import {ITOSGem, ITOSGemBonus, ITOSSkill, TOSDataSet, TOSGemSlot, TOSGemType, TOSStat} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Observable} from "rxjs";

export class TOSGem extends TOSItem implements ITOSGem {

  constructor(json: TOSGem) {
    super(TOSDataSet.GEMS, json);
  }

  get BonusBoots() { return this.$lazyPropertyJSONArray('BonusBoots', value => new TOSGemBonus(value)) }
  get BonusGloves() { return this.$lazyPropertyJSONArray('BonusGloves', value => new TOSGemBonus(value)) }
  get BonusSubWeapon() { return this.$lazyPropertyJSONArray('BonusSubWeapon', value => new TOSGemBonus(value)) }
  get BonusTopAndBottom() { return this.$lazyPropertyJSONArray('BonusTopAndBottom', value => new TOSGemBonus(value)) }
  get BonusWeapon() { return this.$lazyPropertyJSONArray('BonusWeapon', value => new TOSGemBonus(value)) }

  get Link_Skill() { return this.$lazyPropertyLink('Link_Skill', value => TOSDomainService.skillsById(value)) as Observable<ITOSSkill> }

  get TypeGem() { return this.$lazyPropertyEnum('TypeGem', TOSGemType) }

  Bonus(level: number): { [key:string]: TOSGemBonus[]} {
    return Object
      .values(TOSGemSlot)
      .reduce((result, slot, i) => {
        if (this['Bonus' + slot])
          result[slot] = [
            this['Bonus' + slot][(level - 1) * 2],
            this['Bonus' + slot][(level - 1) * 2 + 1]
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
