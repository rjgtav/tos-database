import {TOSEntity} from "../tos-entity.model";
import {
  ITOSCollection,
  ITOSCube,
  ITOSItem,
  ITOSItemDrop,
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
  }

  get Link_Collections() { return this.$lazyPropertyLink('Link_Collections', value => TOSDomainService.collectionsById(value)) as Observable<ITOSCollection[]> }
  get Link_Cubes() { return this.$lazyPropertyLink('Link_Cubes', value => TOSDomainService.cubesById(value)) as Observable<ITOSCube[]> }
  get Link_MonsterDrops() { return this.$lazyPropertyLink('Link_MonsterDrops', value => this.TOSItemDropLinkFactory(value)) as Observable<TOSItemDrop[]> }
  get Link_RecipeMaterial() { return this.$lazyPropertyLink('Link_RecipeMaterial', value => TOSDomainService.recipesById(value)) as Observable<ITOSRecipe> }
  get Link_RecipeTarget() { return this.$lazyPropertyLink('Link_RecipeTarget', value => TOSDomainService.recipesById(value)) as Observable<ITOSRecipe> }

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

  private TOSItemDropLinkFactory(value: TOSItemDrop): Observable<TOSItemDrop> {
    return fromPromise((async () => {
      let object = new TOSItemDrop(value);
          object.Monster = await TOSDomainService.monstersById(+object.Monster).toPromise();

      return object;
    })())
  }

}

export class TOSItemDrop implements ITOSItemDrop {
  Chance: number;
  Monster: ITOSMonster;

  public constructor(json: TOSItemDrop) {
    this.Chance = +json.Chance;
    this.Monster = json.Monster;
  }

  get Url() { return this.Monster.Url }

}
