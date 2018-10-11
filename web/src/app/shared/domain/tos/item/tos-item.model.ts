import {TOSEntity} from "../entity/tos-entity.model";
import {TOSCollection} from "./collection/tos-collection.model";
import {TOSCube} from "./cube/tos-cube.model";
import {TOSRepositoryService} from "../tos-repository.service";
import {TOSMonster} from "../monster/tos-monster.model";

export class TOSItem extends TOSEntity {
  private link_Collections: TOSCollection[];
  private link_Cubes: TOSCube[];
  private link_MonsterDrops: TOSItemDropLink[];
  private link_RecipeMaterial: TOSItem[];
  private link_RecipeTarget: TOSItem[];

  readonly Price: number;
  readonly TimeCoolDown: number;
  readonly TimeLifeTime: number;
  readonly Tradability: string;
  readonly Type: string;
  readonly Weight: number;

  constructor(protected json: TOSItem, url: string) {
    super(json, url);

    this.Price = json.Price;
    this.Tradability = json.Tradability;
    this.TimeCoolDown = +json.TimeCoolDown;
    this.TimeLifeTime = +json.TimeLifeTime;
    this.Type = Object.values(TOSItemType)[+json.Type];
    this.Weight = json.Weight;
  }

  get Link_Collections(): TOSCollection[] {
    return this.link_Collections = this.link_Collections
      ? this.link_Collections
      : this.json.Link_Collections
        ? JSON
          .parse(this.json.Link_Collections + '')
          .map(value => TOSRepositoryService.findCollectionsById(value))
        : null;
  }

  get Link_Cubes(): TOSCube[] {
    return this.link_Cubes = this.link_Cubes
      ? this.link_Cubes
      : this.json.Link_Cubes
        ? JSON
          .parse(this.json.Link_Cubes + '')
          .map(value => TOSRepositoryService.findCubesById(value))
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

  get Link_RecipeMaterial(): TOSItem[] {
    return this.link_RecipeMaterial = this.link_RecipeMaterial
      ? this.link_RecipeMaterial
      : this.json.Link_RecipeMaterial
        ? JSON
          .parse(this.json.Link_RecipeMaterial + '')
          .map(value => TOSRepositoryService.findItemsById(value))
        : null;
  }

  get Link_RecipeTarget(): TOSItem[] {
    return this.link_RecipeTarget = this.link_RecipeTarget
      ? this.link_RecipeTarget
      : this.json.Link_RecipeTarget
        ? JSON
          .parse(this.json.Link_RecipeTarget + '')
          .map(value => TOSRepositoryService.findItemsById(value))
        : null;
  }

  public isTradable(tradable: TOSItemTradability): boolean {
    let index = Object.values(TOSItemTradability).indexOf(tradable);
    return this.Tradability && this.Tradability[index] == '1';
  }

}

export class TOSItemDropLink {
  Chance: number;
  Monster: TOSMonster;

  public constructor(json: TOSItemDropLink) {
    this.Chance = +json.Chance;
    this.Monster = TOSRepositoryService.findMonstersById(+json.Monster);
  }

}

export enum TOSItemTradability {
  MARKET = 'Market',
  PLAYER = 'Players',
  SHOP = 'NPC Shops',
  TEAM = 'Team Storage'
}

export enum TOSItemType {
  ARMBAND = 'Arm Band',
  ARMOR = 'Armor',
  BOOK = 'Books',
  CARD = 'Card',
  COLLECTION = 'Collection',
  CUBE = 'Cubes',
  DRUG = 'Consumables',
  EQUIPMENT = 'Equipment',
  EVENT = 'Event',
  EXPORB = 'Experience Orb',
  FISHINGROD = 'Fishing Rod',
  GEM = 'Gem',
  HELMET = 'Helmet',
  ICOR = 'Icor',
  MAGICAMULET = 'Magic Amulet',
  MATERIAL = 'Material',
  PASTEBAIT = 'Paste Bait',
  PETARMOR = 'Companion Armor',
  PETWEAPON = 'Companion Weapon',
  PREMIUM = 'Premium',
  QUEST = 'Quest',
  RECIPE = 'Recipe',
  SUBWEAPON = 'Sub Weapon',
  UNUSED = 'Unused',
  WEAPON = 'Weapon',
}
