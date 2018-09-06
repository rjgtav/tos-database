import {TOSClassTree, TOSEntity, TOSEntityLink, TOSStat} from "../../entity/tos-entity.model";
import {TOSItem} from "../tos-item.model";

export class TOSEquipment extends TOSItem {
  Bonus: TOSEquipmentBonus[];
  Durability: number;
  Grade: TOSEquipmentGrade;
  Material: TOSEquipmentMaterial;
  Potential: number;
  RequiredClass: string;
  RequiredLevel: number;
  Set: TOSEquipmentSet;
  Sockets: number;
  SocketsLimit: number;
  Stars: number;
  Stat_ATTACK_MAGICAL: number;
  Stat_ATTACK_PHYSICAL_MAX: number;
  Stat_ATTACK_PHYSICAL_MIN: number;
  Stat_DEFENSE_MAGICAL: number;
  Stat_DEFENSE_PHYSICAL: number;
  TypeAttack: TOSEquipmentAttackType;
  TypeEquipment: TOSEquipmentType;
  Unidentified: boolean;
  UnidentifiedRandom: boolean;


  constructor(json: TOSEquipment) {
    super(json);

    this.$comparators['Grade'] = TOSEquipmentGrade.comparator;

    this.Bonus = json.Bonus
      ? JSON
        .parse(json.Bonus + '')
        .map(json => new TOSEquipmentBonus(json))
        .sort((a, b) => TOSStat.comparator(a.Stat, b.Stat))
      : null;
    this.Durability = +json.Durability;
    this.Grade = Object.values(TOSEquipmentGrade)[+json.Grade];
    this.Material = Object.values(TOSEquipmentMaterial)[+json.Material];
    this.Potential = +json.Potential;
    this.RequiredClass = json.RequiredClass;
    this.RequiredLevel = +json.RequiredLevel;
    this.Sockets = +json.Sockets;
    this.SocketsLimit = +json.SocketsLimit;
    this.Stars = +json.Stars;
    this.Stat_ATTACK_MAGICAL = +json.Stat_ATTACK_MAGICAL;
    this.Stat_ATTACK_PHYSICAL_MAX = +json.Stat_ATTACK_PHYSICAL_MAX;
    this.Stat_ATTACK_PHYSICAL_MIN = +json.Stat_ATTACK_PHYSICAL_MIN;
    this.Stat_DEFENSE_MAGICAL = +json.Stat_DEFENSE_MAGICAL;
    this.Stat_DEFENSE_PHYSICAL = +json.Stat_DEFENSE_PHYSICAL;
    this.TypeAttack = Object.values(TOSEquipmentAttackType)[+json.TypeAttack];
    this.TypeEquipment = Object.values(TOSEquipmentType)[+json.TypeEquipment];
    this.Unidentified = (json.Unidentified + '') == 'True';
    this.UnidentifiedRandom = (json.UnidentifiedRandom + '') == 'True';

    this.Set = json.Set
      ? new TOSEquipmentSet(JSON.parse(json.Set + ''))
      : null;
  }

  public isUsableBy(classTree: TOSClassTree): boolean {
    let index = Object.values(TOSClassTree).indexOf(classTree);
    return this.RequiredClass[index] == '1';
  }

}

export enum TOSEquipmentAttackType {
  PIERCING = 'Piercing',
  BOW = 'Missile: Bow',
  CANNON = 'Missile: Cannon',
  GUN = 'Missile: Gun',
  SLASH = 'Slash',
  STRIKE = 'Strike',
  THRUST = 'Thrust',
  UNKNOWN = '',
}

export class TOSEquipmentBonus {
  Stat: TOSStat;
  Value?: number;
  ValueHTML?: string;

  constructor(json: string[]) {
    this.Stat = Object.values(TOSStat)[+json[0]];
    this.Value = isNaN(+json[1]) ? null : +json[1];
    this.ValueHTML = isNaN(+json[1]) ? json[1] : null;

    // HotFix: add special bonus' arrows
    if (this.ValueHTML) {
      this.ValueHTML = this.ValueHTML.split('{img green_up_arrow 16 16}').join('<span class="text-success">▲</span> ');
      this.ValueHTML = this.ValueHTML.split('{img red_down_arrow 16 16}').join('<span class="text-danger">▼</span> ');
    }
  }
}

export enum TOSEquipmentGrade {
  LEGENDARY = 'Legendary',
  MAGIC = 'Magic',
  NORMAL = 'Normal',
  RARE = 'Rare',
  UNIQUE = 'Unique',
}

export namespace TOSEquipmentGrade {

  export function comparator(a: TOSEquipmentGrade, b: TOSEquipmentGrade): -1 | 0 | 1 {
    let i = TOSEquipmentGrade.getOrder(a);
    let j = TOSEquipmentGrade.getOrder(b);

    return (i < j) ? -1 : (i > j) ? 1 : 0;
  }

  export function getColor(value: TOSEquipmentGrade): string {
    if (value == TOSEquipmentGrade.NORMAL)    return '#999999';
    if (value == TOSEquipmentGrade.MAGIC)     return '#42BAF7';
    if (value == TOSEquipmentGrade.RARE)      return '#CE69EF';
    if (value == TOSEquipmentGrade.UNIQUE)    return '#EF6900';
    if (value == TOSEquipmentGrade.LEGENDARY) return '#F4E409';
  }

  export function getOrder(value: TOSEquipmentGrade) {
    if (value == TOSEquipmentGrade.NORMAL)    return 0;
    if (value == TOSEquipmentGrade.MAGIC)     return 1;
    if (value == TOSEquipmentGrade.RARE)      return 2;
    if (value == TOSEquipmentGrade.UNIQUE)    return 3;
    if (value == TOSEquipmentGrade.LEGENDARY) return 4;
  }

}

export enum  TOSEquipmentMaterial {
  CLOTH = 'Cloth',
  GHOST = 'Ghost',
  LEATHER = 'Leather',
  PLATE = 'Plate',
  UNKNOWN = '',
}

// Note: we can't put this one on a separate class otherwise it generates a circular dependency
export class TOSEquipmentSet extends TOSEntity {
  Bonus2: string;
  Bonus3: string;
  Bonus4: string;
  Bonus5: string;
  Bonus6: string;
  Bonus7: string;

  Link_Items: TOSEntityLink[];

  constructor(json: TOSEquipmentSet) {
    super(json);

    this.Bonus2 = json.Bonus2;
    this.Bonus3 = json.Bonus3;
    this.Bonus4 = json.Bonus4;
    this.Bonus5 = json.Bonus5;
    this.Bonus6 = json.Bonus6;
    this.Bonus7 = json.Bonus7;

    this.Link_Items = json.Link_Items
      ? (typeof json.Link_Items == 'string' ? JSON.parse(json.Link_Items + '') : json.Link_Items)
        .map(json => json != null ? new TOSEntityLink(json) : json)
        .filter(link => link != null) // TODO: while we don't finish implementing the entire dataset
      : null;

  }

  public get Bonus(): { [key:number]: TOSEquipmentBonus[]} {
    return [this.Bonus2, this.Bonus3, this.Bonus4, this.Bonus5, this.Bonus6, this.Bonus7]
      .map(bonusGroup => (bonusGroup || '')
        .split('{nl}')
        .map(bonus => bonus ? new TOSEquipmentBonus([TOSStat.UNKNOWN.toString(), bonus]) : null)
        .filter(bonus => bonus))
      .reduce((result, bonusGroup, i) => {
        if (bonusGroup.length) result[i + 2] = bonusGroup;
        return result;
      }, {});
  }

}

export enum TOSEquipmentType {
  BOTTOM = 'Pants',
  BRACELET = 'Bracelets',
  CANNON = 'Cannons',
  CHARM = 'Charm',
  COSTUME_ARMBAND = 'Armband',
  COSTUME_EFFECT = 'Effect Costumes',
  COSTUME_HAIR = 'Hair',
  COSTUME_HAIR_ACCESSORY = 'Hair Accessories',
  COSTUME_HELMET = 'Helmets',
  COSTUME_LENS = 'Lens',
  COSTUME_OUTFIT = 'Costume',
  COSTUME_SPECIAL = 'Special Costume',
  COSTUME_TOY = 'Toys',
  COSTUME_WING = 'Wings',
  DAGGER = 'Daggers',
  GLOVES = 'Gloves',
  NECKLACE = 'Necklaces',
  ONE_HANDED_BOW = 'Crossbows',
  ONE_HANDED_GUN = 'Pistols',
  ONE_HANDED_MACE = 'Maces',
  ONE_HANDED_SPEAR = 'Spears',
  ONE_HANDED_STAFF = 'Rods',
  ONE_HANDED_SWORD = 'Swords',
  RAPIER = 'Rapiers',
  SHIELD = 'Shields',
  SHOES = 'Shoes',
  TOP = 'Shirts',
  TWO_HANDED_BOW = 'Bows',
  TWO_HANDED_GUN = 'Muskets',
  TWO_HANDED_MACE = '2H Maces',
  TWO_HANDED_SPEAR = '2H Spears',
  TWO_HANDED_STAFF = 'Staffs',
  TWO_HANDED_SWORD = '2H Swords',
}

export namespace TOSEquipmentType {
  export function toStringFull(value: TOSEquipmentType) {
    if (value == TOSEquipmentType.COSTUME_LENS)           return 'Lens';
    if (value == TOSEquipmentType.COSTUME_HAIR_ACCESSORY) return 'Hair Accessory';

    let result = (value + '');
        result = result.replace('2H', 'Two-Handed');
        result = result.endsWith('s') ? result.substr(0, result.length - 1) : result;

    return result;
  }
}
