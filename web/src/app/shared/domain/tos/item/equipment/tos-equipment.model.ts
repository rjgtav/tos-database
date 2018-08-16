import {TOSClassTree, TOSStat} from "../../entity/tos-entity.model";
import {TOSItem} from "../tos-item.model";

export class TOSEquipment extends TOSItem {
  Bonuses: TOSEquipmentBonus[];
  Durability: number;
  Grade: TOSEquipmentGrade;
  Material: TOSEquipmentMaterial;
  Potential: number;
  RequiredClass: string;
  RequiredLevel: number;
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

    this.Bonuses = json.Bonuses
      ? JSON
        .parse(json.Bonuses + '')
        .map(json => {
          let bonus = {
            Stat: Object.values(TOSStat)[+json[0]],
            Value: isNaN(+json[1]) ? null : +json[1],
            ValueHTML: isNaN(json[1]) ? json[1] : null,
          };

          // HotFix: add special bonus' arrows
          if (bonus.ValueHTML) {
            bonus.ValueHTML = bonus.ValueHTML.split('{img green_up_arrow 16 16}').join('<span class="text-success">▲</span> ');
            bonus.ValueHTML = bonus.ValueHTML.split('{img red_down_arrow 16 16}').join('<span class="text-danger">▼</span> ');
          }

          return bonus;
        })
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

export interface TOSEquipmentBonus {
  Stat: TOSStat;
  Value?: number;
  ValueHTML?: string;
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
    let result = (value + '');
        result = result.replace('2H', 'Two-Handed');
        result = result.endsWith('s') ? result.substr(0, result.length - 1) : result;

    return result;
  }
}
