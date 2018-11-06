import {TOSEntity} from "../tos-entity.model";
import {
  ITOSCollection,
  ITOSCube,
  ITOSItem,
  ITOSMonster,
  ITOSRecipe, TOSDataSet,
  TOSItemTradability,
  TOSItemType
} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";

export class TOSItem extends TOSEntity implements ITOSItem {
  private link_Collections: ITOSCollection[];
  private link_Cubes: ITOSCube[];
  private link_MonsterDrops: TOSItemDropLink[];
  private link_RecipeMaterial: ITOSRecipe[];
  private link_RecipeTarget: ITOSRecipe[];

  readonly Price: number;
  readonly TimeCoolDown: number;
  readonly TimeLifeTime: number;
  readonly Tradability: string;
  readonly Type: TOSItemType;
  readonly Weight: number;

  constructor(dataset: TOSDataSet, protected json: TOSItem) {
    super(dataset, json);

    this.Price = json.Price;
    this.Tradability = json.Tradability;
    this.TimeCoolDown = +json.TimeCoolDown;
    this.TimeLifeTime = +json.TimeLifeTime;
    this.Type = Object.values(TOSItemType)[+json.Type];
    this.Weight = json.Weight;
  }

  get Link_Collections(): ITOSCollection[] {
    return this.link_Collections = this.link_Collections
      ? this.link_Collections
      : this.json.Link_Collections
        ? JSON
          .parse(this.json.Link_Collections + '')
          .map(value => TOSDomainService.collectionsById[value])
        : null;
  }

  get Link_Cubes(): ITOSCube[] {
    return this.link_Cubes = this.link_Cubes
      ? this.link_Cubes
      : this.json.Link_Cubes
        ? JSON
          .parse(this.json.Link_Cubes + '')
          .map(value => TOSDomainService.cubesById[value])
        : null;
  }

  get Link_MonsterDrops(): TOSItemDropLink[] {
    return this.link_MonsterDrops = this.link_MonsterDrops
      ? this.link_MonsterDrops
      : this.json.Link_MonsterDrops
        ? JSON
          .parse(this.json.Link_MonsterDrops + '')
          .map(value => new TOSItemDropLink(value))
        : null;
  }

  get Link_RecipeMaterial(): ITOSRecipe[] {
    return this.link_RecipeMaterial = this.link_RecipeMaterial
      ? this.link_RecipeMaterial
      : this.json.Link_RecipeMaterial
        ? JSON
          .parse(this.json.Link_RecipeMaterial + '')
          .map(value => TOSDomainService.recipesById[value])
        : null;
  }

  get Link_RecipeTarget(): ITOSRecipe[] {
    return this.link_RecipeTarget = this.link_RecipeTarget
      ? this.link_RecipeTarget
      : this.json.Link_RecipeTarget
        ? JSON
          .parse(this.json.Link_RecipeTarget + '')
          .map(value => TOSDomainService.recipesById[value])
        : null;
  }

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
