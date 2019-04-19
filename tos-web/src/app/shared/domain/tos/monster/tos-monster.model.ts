import {TOSItem} from "../item/tos-item.model";
import {
  ITOSItem,
  ITOSMap,
  ITOSMonster,
  ITOSMonsterDrop,
  ITOSMonsterSpawn,
  TOSDataSet,
  TOSElement,
  TOSEquipmentMaterial,
  TOSMonsterRace,
  TOSMonsterRank,
  TOSMonsterRankService,
  TOSMonsterSize,
  TOSMonsterSizeService
} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {TOSNPC} from "./tos-npc.model";

export class TOSMonster extends TOSNPC implements ITOSMonster {

  constructor(json: TOSMonster) {
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

  get Link_Drops() { return this.$lazyPropertyLink('Link_Drops', value => this.TOSMonsterDropFactory(value)) as Observable<TOSMonsterDrop[]> }
  get Link_Spawns() { return this.$lazyPropertyLink('Link_Spawns', value => this.TOSMonsterSpawn(value)) as Observable<TOSMonsterSpawn[]> }

  private TOSMonsterDropFactory(value: TOSMonsterDrop): Observable<TOSMonsterDrop> {
    return fromPromise((async () => {
      let object = new TOSMonsterDrop(value);
          object.Item = !isNaN(+object.Item)
            ? await TOSDomainService.itemsByIdLink(+object.Item).toPromise()
            : new TOSItem(null, object.Item as TOSItem);

      return object;
    })());
  }
  private TOSMonsterSpawn(value: TOSMonsterSpawn): Observable<TOSMonsterSpawn> {
    return fromPromise((async () => {
      let object = new TOSMonsterSpawn(value);
          object.Map = await TOSDomainService.mapsById(+object.Map).toPromise();

      return object;
    })());
  }

}

export class TOSMonsterDrop implements ITOSMonsterDrop {
  Chance: number;
  Item: ITOSItem;
  Quantity_MAX: number;
  Quantity_MIN: number;

  constructor(json: TOSMonsterDrop) {
    this.Chance = +json.Chance;
    this.Item = json.Item;
    this.Quantity_MAX = +json.Quantity_MAX;
    this.Quantity_MIN = +json.Quantity_MIN;
  }

  get Url() { return this.Item.Url };

}

export class TOSMonsterSpawn implements ITOSMonsterSpawn {
  Map: ITOSMap;
  Population: number;
  TimeRespawn: number;

  constructor(json: TOSMonsterSpawn) {
    this.Map = json.Map;
    this.Population = +json.Population;
    this.TimeRespawn = +json.TimeRespawn;
  }

  get Url() { return this.Map.Url };

}
