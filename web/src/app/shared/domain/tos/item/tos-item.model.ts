export class TOSItem {
  $ID: number;
  $ID_NAME: string;
  Description: string;
  Icon: string;
  Icon_Tooltip: string;
  Link_Collection: number[];
  Link_Monster: number[];
  Name: string;
  Price: number;
  TimeCoolDown: number;
  TimeLifeTime: number;
  Tradable: string;
  Type: string;
  Weight: number;

  constructor(json: TOSItem) {
    this.$ID = json.$ID;
    this.$ID_NAME = json.$ID_NAME;
    this.Description = json.Description.split("{nl}").join("\n");
    this.Icon = json.Icon;
    this.Icon_Tooltip = json.Icon_Tooltip;
    this.Link_Collection = json.Link_Collection;
    this.Link_Monster = json.Link_Monster;
    this.Name = json.Name;
    this.Price = json.Price;
    this.Tradable = json.Tradable;
    this.TimeCoolDown = +json.TimeCoolDown;
    this.TimeLifeTime = +json.TimeLifeTime;
    this.Type = new TOSItemType(+json.Type).toString();
    this.Weight = json.Weight;
  }

  public isTradable(tradable: TOSItemTradable): boolean {
    return this.Tradable[tradable] == '1';
  }

}

export enum TOSItemTradable {
  MARKET,
  PLAYER,
  SHOP,
  TEAM
}

enum TOSItemTypeEnum {
  ARMBAND,
  ARMOR,
  BOOK,
  CARD,
  COLLECTION,
  CUBE,
  DRUG,
  EQUIPMENT,
  EVENT,
  EXPORB,
  FISHINGROD,
  GEM,
  HELMET,
  ICOR,
  MAGICAMULET,
  MATERIAL,
  PASTEBAIT,
  PETARMOR,
  PETWEAPON,
  PREMIUM,
  QUEST,
  RECIPE,
  SUBWEAPON,
  UNUSED,
  WEAPON,
  $ANY$,
}

export class TOSItemType {

  public static readonly ARMBAND = new TOSItemType(TOSItemTypeEnum.ARMBAND);
  public static readonly ARMOR = new TOSItemType(TOSItemTypeEnum.ARMOR);
  public static readonly BOOK = new TOSItemType(TOSItemTypeEnum.BOOK);
  public static readonly CARD = new TOSItemType(TOSItemTypeEnum.CARD);
  public static readonly COLLECTION = new TOSItemType(TOSItemTypeEnum.COLLECTION);
  public static readonly CUBE = new TOSItemType(TOSItemTypeEnum.CUBE);
  public static readonly DRUG = new TOSItemType(TOSItemTypeEnum.DRUG);
  public static readonly EQUIPMENT = new TOSItemType(TOSItemTypeEnum.EQUIPMENT);
  public static readonly EVENT = new TOSItemType(TOSItemTypeEnum.EVENT);
  public static readonly FISHINGROD = new TOSItemType(TOSItemTypeEnum.FISHINGROD);
  public static readonly GEM = new TOSItemType(TOSItemTypeEnum.GEM);
  public static readonly HELMET = new TOSItemType(TOSItemTypeEnum.HELMET);
  public static readonly MAGICAMULET = new TOSItemType(TOSItemTypeEnum.MAGICAMULET);
  public static readonly MATERIAL = new TOSItemType(TOSItemTypeEnum.MATERIAL);
  public static readonly PASTEBAIT = new TOSItemType(TOSItemTypeEnum.PASTEBAIT);
  public static readonly PETARMOR = new TOSItemType(TOSItemTypeEnum.PETARMOR);
  public static readonly PETWEAPON = new TOSItemType(TOSItemTypeEnum.PETWEAPON);
  public static readonly PREMIUM = new TOSItemType(TOSItemTypeEnum.PREMIUM);
  public static readonly QUEST = new TOSItemType(TOSItemTypeEnum.QUEST);
  public static readonly RECIPE = new TOSItemType(TOSItemTypeEnum.RECIPE);
  public static readonly SUBWEAPON = new TOSItemType(TOSItemTypeEnum.SUBWEAPON);
  public static readonly UNUSED = new TOSItemType(TOSItemTypeEnum.UNUSED);
  public static readonly WEAPON = new TOSItemType(TOSItemTypeEnum.WEAPON);
  public static readonly $ANY$ = new TOSItemType(TOSItemTypeEnum.$ANY$);

  constructor(private _enum: TOSItemTypeEnum) {}

  public toString(): string {
    switch (this._enum) {
      case TOSItemTypeEnum.ARMBAND:     return 'Arm Band';
      case TOSItemTypeEnum.ARMOR:       return 'Armor';
      case TOSItemTypeEnum.BOOK:        return 'Book';
      case TOSItemTypeEnum.CARD:        return 'Card';
      case TOSItemTypeEnum.COLLECTION:  return 'Collection';
      case TOSItemTypeEnum.CUBE:        return 'Cube';
      case TOSItemTypeEnum.DRUG:        return 'Drug';
      case TOSItemTypeEnum.EQUIPMENT:   return 'Equipment';
      case TOSItemTypeEnum.EVENT:       return 'Event';
      case TOSItemTypeEnum.FISHINGROD:  return 'Fishing Rod';
      case TOSItemTypeEnum.GEM:         return 'Gem';
      case TOSItemTypeEnum.HELMET:      return 'Helmet';
      case TOSItemTypeEnum.MAGICAMULET: return 'Magic Amulet';
      case TOSItemTypeEnum.MATERIAL:    return 'Material';
      case TOSItemTypeEnum.PASTEBAIT:   return 'Paste Bait';
      case TOSItemTypeEnum.PETARMOR:    return 'Pet Armor';
      case TOSItemTypeEnum.PETWEAPON:   return 'Pet Weapon';
      case TOSItemTypeEnum.PREMIUM:     return 'Premium';
      case TOSItemTypeEnum.QUEST:       return 'Quest';
      case TOSItemTypeEnum.RECIPE:      return 'Recipe';
      case TOSItemTypeEnum.SUBWEAPON:   return 'Sub Weapon';
      case TOSItemTypeEnum.UNUSED:      return 'Unused';
      case TOSItemTypeEnum.WEAPON:      return 'Weapon';
      case TOSItemTypeEnum.$ANY$:       return 'Any';
      default:                          return null;
    }
  }

  public static valueOf(value: string): TOSItemType {
    switch (value) {
      case 'Arm Band':                  return TOSItemType.ARMBAND;
      case 'Armor':                     return TOSItemType.ARMOR;
      case 'Book':                      return TOSItemType.BOOK;
      case 'Card':                      return TOSItemType.CARD;
      case 'Collection':                return TOSItemType.COLLECTION;
      case 'Cube':                      return TOSItemType.CUBE;
      case 'Drug':                      return TOSItemType.DRUG;
      case 'Equipment':                 return TOSItemType.EQUIPMENT;
      case 'Event':                     return TOSItemType.EVENT;
      case 'Fishing Rod':               return TOSItemType.FISHINGROD;
      case 'Gem':                       return TOSItemType.GEM;
      case 'Helmet':                    return TOSItemType.HELMET;
      case 'Magic Amulet':              return TOSItemType.MAGICAMULET;
      case 'Material':                  return TOSItemType.MATERIAL;
      case 'Paste Bait':                return TOSItemType.PASTEBAIT;
      case 'Pet Armor':                 return TOSItemType.PETARMOR;
      case 'Pet Weapon':                return TOSItemType.PETWEAPON;
      case 'Premium':                   return TOSItemType.PREMIUM;
      case 'Quest':                     return TOSItemType.QUEST;
      case 'Recipe':                    return TOSItemType.RECIPE;
      case 'Sub Weapon':                return TOSItemType.SUBWEAPON;
      case 'Unused':                    return TOSItemType.UNUSED;
      case 'Weapon':                    return TOSItemType.WEAPON;
      case 'Any':                       return TOSItemType.$ANY$;
      default:                          return null;
    }
  }
}
