import {TOSElement, TOSEntity, TOSEntityLink} from "../entity/tos-entity.model";
import {TOSEquipmentMaterial} from "../item/equipment/tos-equipment.model";

export class TOSMonster extends TOSEntity {
  Armor: TOSEquipmentMaterial;
  Element: TOSElement;
  Level: number;
  Race: TOSMonsterRace;
  Rank: TOSMonsterRank;
  Size: TOSMonsterSize;
  EXP: number;
  EXPClass: number;
  Stat_CON: number;
  Stat_DEX: number;
  Stat_INT: number;
  Stat_SPR: number;
  Stat_STR: number;
  Stat_HP: number;
  Stat_SP: number;
  Stat_ATTACK_MAGICAL_MAX: number;
  Stat_ATTACK_MAGICAL_MIN: number;
  Stat_DEFENSE_MAGICAL: number;
  Stat_ATTACK_PHYSICAL_MAX: number;
  Stat_ATTACK_PHYSICAL_MIN: number;
  Stat_DEFENSE_PHYSICAL: number;
  Stat_Accuracy: number;
  Stat_Evasion: number;
  Stat_CriticalDamage: number;
  Stat_CriticalDefense: number;
  Stat_CriticalRate: number;
  Stat_BlockPenetration: number;
  Stat_BlockRate: number;

  Link_Drops: TOSMonsterDropLink[];
  Link_Spawns: TOSMonsterSpawnLink[];

  constructor(json: TOSMonster) {
    super(json);

    this.$comparators['Rank'] = TOSMonsterRank.comparator;
    this.$comparators['Size'] = TOSMonsterSize.comparator;

    this.Armor = Object.values(TOSEquipmentMaterial)[+json.Armor];
    this.Element = Object.values(TOSElement)[+json.Element];
    this.Level = +json.Level;
    this.Race = Object.values(TOSMonsterRace)[+json.Race];
    this.Rank = Object.values(TOSMonsterRank)[+json.Rank];
    this.Size = Object.values(TOSMonsterSize)[+json.Size];
    this.EXP = +json.EXP;
    this.EXPClass = +json.EXPClass;
    this.Stat_CON = +json.Stat_CON;
    this.Stat_DEX = +json.Stat_DEX;
    this.Stat_INT = +json.Stat_INT;
    this.Stat_SPR = +json.Stat_SPR;
    this.Stat_STR = +json.Stat_STR;
    this.Stat_HP = +json.Stat_HP;
    this.Stat_SP = +json.Stat_SP;
    this.Stat_ATTACK_MAGICAL_MAX = +json.Stat_ATTACK_MAGICAL_MAX;
    this.Stat_ATTACK_MAGICAL_MIN = +json.Stat_ATTACK_MAGICAL_MIN;
    this.Stat_ATTACK_PHYSICAL_MAX = +json.Stat_ATTACK_PHYSICAL_MAX;
    this.Stat_ATTACK_PHYSICAL_MIN = +json.Stat_ATTACK_PHYSICAL_MIN;
    this.Stat_DEFENSE_MAGICAL = +json.Stat_DEFENSE_MAGICAL;
    this.Stat_DEFENSE_PHYSICAL = +json.Stat_DEFENSE_PHYSICAL;
    this.Stat_Accuracy = +json.Stat_Accuracy;
    this.Stat_Evasion = +json.Stat_Evasion;
    this.Stat_CriticalDamage = +json.Stat_CriticalDamage;
    this.Stat_CriticalDefense = +json.Stat_CriticalDefense;
    this.Stat_CriticalRate = +json.Stat_CriticalRate;
    this.Stat_BlockPenetration = +json.Stat_BlockPenetration;
    this.Stat_BlockRate = +json.Stat_BlockRate;

    this.Link_Drops = json.Link_Drops
      ? JSON
        .parse(json.Link_Drops + '')
        .map(json => new TOSMonsterDropLink(json))
        //.filter(link => link.Item != null)
      : null;
    this.Link_Spawns = json.Link_Spawns
      ? JSON.parse(json.Link_Spawns + '').map(json => new TOSMonsterSpawnLink(json))
      : null;
  }

}

export class TOSMonsterDropLink {
  Chance: number;
  Item: TOSEntityLink;
  Quantity_MAX: number;
  Quantity_MIN: number;

  constructor(json: TOSMonsterDropLink) {
    this.Chance = +json.Chance;
    this.Item = json.Item ? new TOSEntityLink(json.Item) : null;
    this.Quantity_MAX = +json.Quantity_MAX;
    this.Quantity_MIN = +json.Quantity_MIN;
  }

}

export class TOSMonsterSpawnLink {
  Map: TOSEntityLink;
  Population: number;
  TimeRespawn: number;

  constructor(json: TOSMonsterSpawnLink) {
    this.Map = new TOSEntityLink(json.Map);
    this.Population = +json.Population;
    this.TimeRespawn = +json.TimeRespawn;
  }

}

export enum TOSMonsterRace {
  BEAST = 'Beast',
  DEMON = 'Demon',
  INSECT = 'Insect',
  MUTANT = 'Mutant',
  PLANT = 'Plant',
}

export namespace TOSMonsterRace {

  export function getIcon(value: TOSMonsterRace): string {
    return 'assets/images/monster_race_' + value.toString().toLowerCase() + '.png';
  }

}

export enum TOSMonsterRank {
  BOSS = 'Boss',
  ELITE = 'Elite',
  NORMAL = 'Normal',
  SPECIAL = 'Special',
}

export namespace TOSMonsterRank {

  export function comparator(a: TOSMonsterRank, b: TOSMonsterRank): -1 | 0 | 1 {
    let i = TOSMonsterRank.getOrder(a);
    let j = TOSMonsterRank.getOrder(b);

    return (i < j) ? -1 : (i > j) ? 1 : 0;
  }

  export function getOrder(value: TOSMonsterRank) {
    if (value == TOSMonsterRank.NORMAL) return 0;
    if (value == TOSMonsterRank.ELITE)  return 1;
    if (value == TOSMonsterRank.BOSS)   return 2;
  }

}

export enum TOSMonsterSize {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL'
}

export namespace TOSMonsterSize {

  export function comparator(a: TOSMonsterSize, b: TOSMonsterSize): -1 | 0 | 1 {
    let i = TOSMonsterSize.getOrder(a);
    let j = TOSMonsterSize.getOrder(b);

    return (i < j) ? -1 : (i > j) ? 1 : 0;
  }

  export function getOrder(value: TOSMonsterSize) {
    if (value == TOSMonsterSize.S)  return 0;
    if (value == TOSMonsterSize.M)  return 1;
    if (value == TOSMonsterSize.L)  return 2;
    if (value == TOSMonsterSize.XL) return 3;
  }

}

export enum TOSMonsterType {
  
}
