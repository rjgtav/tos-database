import {TOSEntity, TOSEntityLink} from "../entity/tos-entity.model";

export class TOSItem extends TOSEntity {
  Price: number;
  TimeCoolDown: number;
  TimeLifeTime: number;
  Tradability: string;
  Type: string;
  Weight: number;

  Link_Collections: TOSEntityLink[];
  Link_Drops: TOSItemDropLink[];
  Link_Recipes: TOSEntityLink[];

  constructor(json: TOSItem) {
    super(json);

    this.$ID = json.$ID;
    this.$ID_NAME = json.$ID_NAME;
    this.Description = json.Description.split("{nl}").join("\n");
    this.Icon = json.Icon;
    this.Name = json.Name;

    this.Price = json.Price;
    this.Tradability = json.Tradability;
    this.TimeCoolDown = +json.TimeCoolDown;
    this.TimeLifeTime = +json.TimeLifeTime;
    this.Type = Object.values(TOSItemType)[+json.Type];
    this.Weight = json.Weight;

    this.Link_Collections = json.Link_Collections
      ? JSON.parse(json.Link_Collections + '').map(json => new TOSEntityLink(json))
      : null;
    this.Link_Drops = json.Link_Drops
      ? JSON.parse(json.Link_Drops + '').map(json => new TOSItemDropLink(json))
      : null;
    this.Link_Recipes = json.Link_Recipes
      ? JSON.parse(json.Link_Recipes + '').map(json => new TOSEntityLink(json))
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
    this.Chance = json.Chance;
    this.Monster = json.Monster;
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
