import {TOSEntity} from "../tos-entity.model";
import {TOSItem} from "../item/tos-item.model";
import {
  ITOSItem,
  ITOSMap,
  ITOSMonster,
  ITOSMonsterDropLink,
  ITOSMonsterSpawnLink,
  TOSDataSet,
  TOSElement,
  TOSEquipmentMaterial,
  TOSMonsterRace,
  TOSMonsterRank,
  TOSMonsterSize
} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";

export class TOSMonster extends TOSEntity implements ITOSMonster{
  private link_Drops: TOSMonsterDropLink[];
  private link_Spawns: TOSMonsterSpawnLink[];

  readonly Armor: TOSEquipmentMaterial;
  readonly Element: TOSElement;
  readonly Level: number;
  readonly Race: TOSMonsterRace;
  readonly Rank: TOSMonsterRank;
  readonly Size: TOSMonsterSize;
  readonly EXP: number;
  readonly EXPClass: number;
  readonly Stat_CON: number;
  readonly Stat_DEX: number;
  readonly Stat_INT: number;
  readonly Stat_SPR: number;
  readonly Stat_STR: number;
  readonly Stat_HP: number;
  readonly Stat_SP: number;
  readonly Stat_ATTACK_MAGICAL_MAX: number;
  readonly Stat_ATTACK_MAGICAL_MIN: number;
  readonly Stat_DEFENSE_MAGICAL: number;
  readonly Stat_ATTACK_PHYSICAL_MAX: number;
  readonly Stat_ATTACK_PHYSICAL_MIN: number;
  readonly Stat_DEFENSE_PHYSICAL: number;
  readonly Stat_Accuracy: number;
  readonly Stat_Evasion: number;
  readonly Stat_CriticalDamage: number;
  readonly Stat_CriticalDefense: number;
  readonly Stat_CriticalRate: number;
  readonly Stat_BlockPenetration: number;
  readonly Stat_BlockRate: number;

  constructor(private json: TOSMonster) {
    super(TOSDataSet.MONSTERS, json);

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
  }

  get Link_Drops(): TOSMonsterDropLink[] {
    return this.link_Drops = this.link_Drops
      ? this.link_Drops
      : this.json.Link_Drops
        ? JSON
            .parse(this.json.Link_Drops + '')
            .map(value => new TOSMonsterDropLink(value))
        : null;
  }

  get Link_Spawns(): TOSMonsterSpawnLink[] {
    return this.link_Spawns = this.link_Spawns
      ? this.link_Spawns
      : this.json.Link_Spawns
        ? JSON
          .parse(this.json.Link_Spawns + '')
          .map(value => new TOSMonsterSpawnLink(value))
        : null;
  }

}

export class TOSMonsterDropLink implements ITOSMonsterDropLink {
  Chance: number;
  Item: ITOSItem;
  Quantity_MAX: number;
  Quantity_MIN: number;

  constructor(json: TOSMonsterDropLink) {
    this.Chance = +json.Chance;
    this.Item = json.Item
      ? !isNaN(+json.Item)
        ? TOSDomainService.itemsByIdLink(+json.Item)
        : new TOSItem(null, json.Item as TOSItem)
      : null;
    this.Quantity_MAX = +json.Quantity_MAX;
    this.Quantity_MIN = +json.Quantity_MIN;
  }

}

export class TOSMonsterSpawnLink implements ITOSMonsterSpawnLink {
  Map: ITOSMap;
  Population: number;
  TimeRespawn: number;

  constructor(json: TOSMonsterSpawnLink) {
    this.Map = TOSDomainService.mapsById[+json.Map];
    this.Population = +json.Population;
    this.TimeRespawn = +json.TimeRespawn;
  }

}
