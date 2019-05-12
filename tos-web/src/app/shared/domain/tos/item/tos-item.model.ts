import {TOSEntity, TOSEntityLink} from "../tos-entity.model";
import {
  ITOSCollection,
  ITOSCube,
  ITOSItem,
  ITOSItemLinkMap,
  ITOSItemLinkMonster,
  ITOSMap,
  ITOSMonster,
  ITOSRecipe,
  TOSDataSet,
  TOSItemTradability,
  TOSItemType
} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

export class TOSItem extends TOSEntity implements ITOSItem {

  constructor(dataset: TOSDataSet, json: TOSItem) {
    super(dataset, json);

    this.Selected = true;
  }

  get Link_Collections() { return this.$lazyPropertyLink('Link_Collections', value => TOSDomainService.collectionsById(value)) as Observable<ITOSCollection[]> }
  get Link_Cubes() { return this.$lazyPropertyLink('Link_Cubes', value => TOSDomainService.cubesById(value)) as Observable<ITOSCube[]> }
  get Link_Monsters() { return this.$lazyPropertyLink('Link_Monsters', value => this.TOSItemLinkMonster(value)) as Observable<TOSItemLinkMonster[]> }
  get Link_RecipeMaterial() { return this.$lazyPropertyLink('Link_RecipeMaterial', value => TOSDomainService.recipesById(value)) as Observable<ITOSRecipe> }
  get Link_RecipeTarget() { return this.$lazyPropertyLink('Link_RecipeTarget', value => TOSDomainService.recipesById(value)) as Observable<ITOSRecipe> }
  get Link_Maps() { return this.$lazyPropertyLink('Link_Maps', value => this.TOSItemLinkMap(value)) as Observable<TOSItemLinkMap[]> }
  get Link_Maps_Exploration() { return this.$lazyPropertyLink('Link_Maps_Exploration', value => this.TOSItemLinkMap(value)) as Observable<TOSItemLinkMap[]> }

  get Price() { return this.$lazyPropertyNumber('Price') }
  get TimeCoolDown() { return this.$lazyPropertyNumber('TimeCoolDown') }
  get TimeLifeTime() { return this.$lazyPropertyNumber('TimeLifeTime') }
  get Tradability() { return this.$lazyPropertyString('Tradability') }
  get Type() { return this.$lazyPropertyEnum('Type', TOSItemType) }
  get Weight() { return this.$lazyPropertyNumber('Weight') }

  public isTradable(tradable: TOSItemTradability): boolean {
    let index = Object.values(TOSItemTradability).indexOf(tradable);
    return this.Tradability && this.Tradability[index] == 'T';
  }

  private TOSItemLinkMonster(value: TOSItemLinkMonster): Observable<TOSItemLinkMonster> {
    return fromPromise((async () => {
      let object = new TOSItemLinkMonster(value);
          object.Monster = await TOSDomainService.monstersById(+object.Monster).toPromise();

      return object;
    })())
  }
  private TOSItemLinkMap(value: TOSItemLinkMap): Observable<TOSItemLinkMap> {
    return fromPromise((async () => {
      let object = new TOSItemLinkMap(value);
          object.Map = await TOSDomainService.mapsById(+object.Map).toPromise();

      return object;
    })());
  }

}

export class TOSItemLinkMonster extends TOSEntityLink<ITOSMonster> implements ITOSItemLinkMonster {
  Chance: number;
  Monster: ITOSMonster;
  Quantity_MAX: number;
  Quantity_MIN: number;

  public constructor(json: TOSItemLinkMonster) {
    super();

    this.Chance = +json.Chance;
    this.Monster = json.Monster;
    this.Quantity_MAX = +json.Quantity_MAX;
    this.Quantity_MIN = +json.Quantity_MIN;
  }

  get Link() { return this.Monster }

}

export class TOSItemLinkMap extends TOSEntityLink<ITOSMap> implements ITOSItemLinkMap {
  Chance: number;
  Map: ITOSMap;
  Quantity_MAX: number;
  Quantity_MIN: number;

  constructor(json: TOSItemLinkMap) {
    super();

    this.Chance = +json.Chance;
    this.Map = json.Map;
    this.Quantity_MAX = +json.Quantity_MAX;
    this.Quantity_MIN = +json.Quantity_MIN;
  }

  get Link() { return this.Map }

}
