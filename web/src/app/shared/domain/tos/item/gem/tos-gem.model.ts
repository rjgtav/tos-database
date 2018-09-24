import {TOSItem} from "../tos-item.model";
import {TOSEntityLink, TOSStat} from "../../entity/tos-entity.model";

export class TOSGem extends TOSItem {
  static readonly SLOTS = ['TopAndBottom', 'Boots', 'Gloves', 'Weapon', 'SubWeapon'];

  BonusBoots: TOSGemBonus[];
  BonusGloves: TOSGemBonus[];
  BonusSubWeapon: TOSGemBonus[];
  BonusTopAndBottom: TOSGemBonus[];
  BonusWeapon: TOSGemBonus[];
  TypeGem: TOSGemType;

  Link_Skill: TOSEntityLink;

  constructor(json: TOSGem) {
    super(json);

    for (let slot of TOSGem.SLOTS) {
      this['Bonus' + slot] = json['Bonus' + slot]
        ? JSON
          .parse(json['Bonus' + slot] + '')
          .map(json => new TOSGemBonus(json))
        : null;
    }

    this.TypeGem = Object.values(TOSGemType)[+json.TypeGem];
    this.Link_Skill = json.Link_Skill ? new TOSEntityLink(json.Link_Skill) : null;
  }

  getBonus(level: number): { [key:string]: TOSGemBonus[]} {
    return TOSGem.SLOTS
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

export class TOSGemBonus {
  Slot: TOSGemSlot;
  Stat: String | TOSStat;
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

export enum TOSGemType {
  SKILL = 'Skill',
  STATS = 'Stats',
}

export enum TOSGemSlot {
  BOOTS = 'Boots',
  GLOVES = 'Gloves',
  SUBWEAPON = 'Sub Weapon',
  TOPLEG = 'Top/Bottom',
  WEAPON = 'Weapon'
}
