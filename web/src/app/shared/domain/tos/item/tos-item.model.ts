import {TOSEntity} from "../tos-entity.model";
import {
  ITOSItem,
  ITOSMonster,
  TOSDataSet,
  TOSItemTradability,
  TOSItemType
} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";

export class TOSItem extends TOSEntity implements ITOSItem {

  constructor(dataset: TOSDataSet, json: TOSItem) {
    super(dataset, json);
  }

  get Link_Collections() { return this.$lazyPropertyJSONArray('Link_Collections', value => TOSDomainService.collectionsById[value]) }
  get Link_Cubes() { return this.$lazyPropertyJSONArray('Link_Cubes', value => TOSDomainService.cubesById[value]) }
  get Link_MonsterDrops() { return this.$lazyPropertyJSONArray('Link_MonsterDrops', value => new TOSItemDropLink(value)) }
  get Link_RecipeMaterial() { return this.$lazyPropertyJSONArray('Link_RecipeMaterial', value => TOSDomainService.recipesById[value]) }
  get Link_RecipeTarget() { return this.$lazyPropertyJSONArray('Link_RecipeTarget', value => TOSDomainService.recipesById[value]) }

  get Price() { return this.$lazyPropertyNumber('Price') }
  get TimeCoolDown() { return this.$lazyPropertyNumber('TimeCoolDown') }
  get TimeLifeTime() { return this.$lazyPropertyNumber('TimeLifeTime') }
  get Tradability() { return this.$lazyPropertyString('Tradability') }
  get Type() { return this.$lazyPropertyEnum('Type', TOSItemType) }
  get Weight() { return this.$lazyPropertyNumber('Weight') }

  public isTradable(tradable: TOSItemTradability): boolean {
    let index = Object.values(TOSItemTradability).indexOf(tradable);
    return this.Tradability && this.Tradability[index] == '1';
  }

}

export class TOSItemDropLink {
  Chance: number;
  Monster: ITOSMonster;

  public constructor(json: TOSItemDropLink) {
    this.Chance = +json.Chance;
    this.Monster = TOSDomainService.monstersById[+json.Monster];
  }

}
