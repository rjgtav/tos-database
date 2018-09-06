import {TOSEntity, TOSEntityLink} from "../entity/tos-entity.model";

export class TOSItem extends TOSEntity {
  Price: number;
  TimeCoolDown: number;
  TimeLifeTime: number;
  Tradability: string;
  Type: string;
  Weight: number;

  Link_Collections: TOSEntityLink[];
  Link_Cubes: TOSEntityLink[];
  Link_MonsterDrops: TOSItemDropLink[];
  Link_RecipeTarget: TOSEntityLink[];
  Link_RecipeMaterial: TOSEntityLink[];

  constructor(json: TOSItem) {
    super(json);

    this.Price = json.Price;
    this.Tradability = json.Tradability;
    this.TimeCoolDown = +json.TimeCoolDown;
    this.TimeLifeTime = +json.TimeLifeTime;
    this.Type = Object.values(TOSItemType)[+json.Type];
    this.Weight = json.Weight;

    this.Link_Collections = json.Link_Collections
      ? JSON.parse(json.Link_Collections + '').map(json => new TOSEntityLink(json))
      : null;
    this.Link_Cubes = json.Link_Cubes
      ? JSON.parse(json.Link_Cubes + '').map(json => new TOSEntityLink(json))
      : null;
    this.Link_MonsterDrops = json.Link_MonsterDrops
      ? JSON.parse(json.Link_MonsterDrops + '').map(json => new TOSItemDropLink(json))
      : null;
    this.Link_RecipeMaterial = json.Link_RecipeMaterial
      ? JSON.parse(json.Link_RecipeMaterial + '').map(json => new TOSEntityLink(json))
      : null;
    this.Link_RecipeTarget = json.Link_RecipeTarget
      ? JSON.parse(json.Link_RecipeTarget + '').map(json => new TOSEntityLink(json))
      : null;
  }

  public isTradable(tradable: TOSItemTradability): boolean {
    let index = Object.values(TOSItemTradability).indexOf(tradable);
    return this.Tradability[index] == '1';
  }

}

export class TOSItemDropLink {
  Chance: number;
  Monster: TOSEntityLink;

  public constructor(json: TOSItemDropLink) {
    this.Chance = +json.Chance;
    this.Monster = new TOSEntityLink(json.Monster);
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
