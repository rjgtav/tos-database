export interface TOSItem {
  $ID: number;
  $ID_NAME: string;
  Description: string;
  Icon: string;
  Icon_Tooltip: string;
  Link_Collection: number[];
  Link_Monster: number[];
  Name: string;
  Tradable: string;
  Type: TOSItemType;
  Weight: number;
}

export enum TOSItemType {
  ARMBAND,
  ARMOR,
  BOOK,
  CARD,
  COLLECTION,
  CUBE,
  DRUG,
  EQUIPMENT,
  EVENT,
  FISHINGROD,
  GEM,
  HELMET,
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
}

export abstract class TOSItemTypeUtil {
  public static toString(o: TOSItemType): string {
    switch (+o) {
      case TOSItemType.ARMBAND:     return 'Arm Band';
      case TOSItemType.ARMOR:       return 'Armor';
      case TOSItemType.BOOK:        return 'Book';
      case TOSItemType.CARD:        return 'Card';
      case TOSItemType.COLLECTION:  return 'Collection';
      case TOSItemType.CUBE:        return 'Cube';
      case TOSItemType.DRUG:        return 'Drug';
      case TOSItemType.EQUIPMENT:   return 'Equipment';
      case TOSItemType.EVENT:       return 'Event';
      case TOSItemType.FISHINGROD:  return 'Fishing Rod';
      case TOSItemType.GEM:         return 'Gem';
      case TOSItemType.HELMET:      return 'Helmet';
      case TOSItemType.MAGICAMULET: return 'Magic Amulet';
      case TOSItemType.MATERIAL:    return 'Material';
      case TOSItemType.PASTEBAIT:   return 'Paste Bait';
      case TOSItemType.PETARMOR:    return 'Pet Armor';
      case TOSItemType.PETWEAPON:   return 'Pet Weapon';
      case TOSItemType.PREMIUM:     return 'Premium';
      case TOSItemType.QUEST:       return 'Quest';
      case TOSItemType.RECIPE:      return 'Recipe';
      case TOSItemType.SUBWEAPON:   return 'Sub Weapon';
      case TOSItemType.UNUSED:      return 'Unused';
      case TOSItemType.WEAPON:      return 'Weapon';
      default:                      return o + '';
    }
  }
}
