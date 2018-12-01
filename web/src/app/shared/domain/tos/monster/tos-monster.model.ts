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
  TOSMonsterRank, TOSMonsterRankService,
  TOSMonsterSize, TOSMonsterSizeService
} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";

export class TOSMonster extends TOSEntity implements ITOSMonster {

  constructor(private json: TOSMonster) {
    super(TOSDataSet.MONSTERS, json);

    this.$comparators['Rank'] = TOSMonsterRankService.comparator;
    this.$comparators['Size'] = TOSMonsterSizeService.comparator;
  }

  get Armor() { return this.$lazyPropertyEnum('Armor', TOSEquipmentMaterial) }
  get Element() { return this.$lazyPropertyEnum('Element', TOSElement) }
  get EXP() { return this.$lazyPropertyNumber('EXP') }
  get EXPClass() { return this.$lazyPropertyNumber('EXPClass') }
  get Level() { return this.$lazyPropertyNumber('Level') }
  get Race() { return this.$lazyPropertyEnum('Race', TOSMonsterRace) }
  get Rank() { return this.$lazyPropertyEnum('Rank', TOSMonsterRank) }
  get Size() { return this.$lazyPropertyEnum('Size', TOSMonsterSize) }
  get Stat_CON() { return this.$lazyPropertyNumber('Stat_CON') }
  get Stat_DEX() { return this.$lazyPropertyNumber('Stat_DEX') }
  get Stat_INT() { return this.$lazyPropertyNumber('Stat_INT') }
  get Stat_SPR() { return this.$lazyPropertyNumber('Stat_SPR') }
  get Stat_STR() { return this.$lazyPropertyNumber('Stat_STR') }
  get Stat_HP() { return this.$lazyPropertyNumber('Stat_HP') }
  get Stat_SP() { return this.$lazyPropertyNumber('Stat_SP') }
  get Stat_ATTACK_MAGICAL_MAX() { return this.$lazyPropertyNumber('Stat_ATTACK_MAGICAL_MAX') }
  get Stat_ATTACK_MAGICAL_MIN() { return this.$lazyPropertyNumber('Stat_ATTACK_MAGICAL_MIN') }
  get Stat_ATTACK_PHYSICAL_MAX() { return this.$lazyPropertyNumber('Stat_ATTACK_PHYSICAL_MAX') }
  get Stat_ATTACK_PHYSICAL_MIN() { return this.$lazyPropertyNumber('Stat_ATTACK_PHYSICAL_MIN') }
  get Stat_DEFENSE_MAGICAL() { return this.$lazyPropertyNumber('Stat_DEFENSE_MAGICAL') }
  get Stat_DEFENSE_PHYSICAL() { return this.$lazyPropertyNumber('Stat_DEFENSE_PHYSICAL') }
  get Stat_Accuracy() { return this.$lazyPropertyNumber('Stat_Accuracy') }
  get Stat_Evasion() { return this.$lazyPropertyNumber('Stat_Evasion') }
  get Stat_CriticalDamage() { return this.$lazyPropertyNumber('Stat_CriticalDamage') }
  get Stat_CriticalDefense() { return this.$lazyPropertyNumber('Stat_CriticalDefense') }
  get Stat_CriticalRate() { return this.$lazyPropertyNumber('Stat_CriticalRate') }
  get Stat_BlockPenetration() { return this.$lazyPropertyNumber('Stat_BlockPenetration') }
  get Stat_BlockRate() { return this.$lazyPropertyNumber('Stat_BlockRate') }

  get Link_Drops() { return this.$lazyPropertyJSONArray('Link_Drops', value => new TOSMonsterDropLink(value)) }
  get Link_Spawns() { return this.$lazyPropertyJSONArray('Link_Spawns', value => new TOSMonsterSpawnLink(value)) }

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
