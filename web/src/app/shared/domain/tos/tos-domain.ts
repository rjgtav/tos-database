/*====================================================================================================================+
 | Enums
 *====================================================================================================================*/
import {TOSBuild, TOSBuildStats} from "./tos-build";

export enum TOSAttackType {
  PIERCING = 'Piercing',
  BOW = 'Missile: Bow',
  CANNON = 'Missile: Cannon',
  GUN = 'Missile: Gun',
  MAGIC = 'Magic',
  MELEE = 'Melee',
  SLASH = 'Slash',
  STRIKE = 'Strike',
  THRUST = 'Thrust',
  UNKNOWN = '',
}

export enum TOSCardType {
  ATTACK = 'Attack',
  DEFENSE = 'Defense',
  LEGENDARY = 'Legendary',
  REINFORCE = 'Reinforce Cards',
  STATS = 'Stats',
  UTILITY = 'Utility'
}

export enum TOSClassTree {
  ARCHER = 'Archer',
  CLERIC = 'Cleric',
  SWORDSMAN = 'Swordsman',
  WIZARD = 'Wizard',
}

export enum TOSDataSet {
  ATTRIBUTES = 'attributes',
  BOOKS = 'books',
  CARDS = 'cards',
  COLLECTIONS = 'collections',
  CUBES = 'cubes',
  EQUIPMENT = 'equipment',
  EQUIPMENT_SETS = 'equipment-sets',
  GEMS = 'gems',
  ITEMS = 'items',
  JOBS = 'jobs',
  MAPS = 'maps',
  MONSTERS = 'monsters',
  RECIPES = 'recipes',
  SKILLS = 'skills',
}
export namespace TOSDataSet {
  export const VALUES: { label: string, options: TOSDataSet[] }[] = [
    {
      label: 'Items',
      options: [
        TOSDataSet.BOOKS,
        TOSDataSet.CARDS,
        TOSDataSet.COLLECTIONS,
        TOSDataSet.CUBES,
        TOSDataSet.EQUIPMENT,
        TOSDataSet.EQUIPMENT_SETS,
        TOSDataSet.GEMS,
        TOSDataSet.ITEMS,
        TOSDataSet.RECIPES,
      ],
    },
    {
      label: 'Player',
      options: [
        TOSDataSet.ATTRIBUTES,
        TOSDataSet.JOBS,
        TOSDataSet.SKILLS,
      ],
    },
    {
      label: 'World',
      options: [
        TOSDataSet.MONSTERS,
      ],
    }
  ];

  export function toLabel(value: TOSDataSet): string {
    if (value == TOSDataSet.JOBS) return 'Classes';
    if (value == null || (value + '') == '') return null;

    return (value || '').toString() // Convert to Human Form
      .split('-')
      .map(value => value[0].toUpperCase() + value.slice(1))
      .join(' ');
  }
  export function toProperty(value: TOSDataSet): string {
    return (value || '').toString() // Convert to camelCase
      .split('-')
      .map((value, index) => index > 0 ? value[0].toUpperCase() + value.slice(1) : value)
      .join('');
  }
  export function toUrl(value: TOSDataSet) {
    if (value == TOSDataSet.JOBS) return 'classes';
    return value.toString();
  }
}

export enum TOSElement {
  DARK = 'Dark',
  EARTH = 'Earth',
  FIRE = 'Fire',
  HOLY = 'Holy',
  ICE = 'Ice',
  LIGHTNING = 'Lightning',
  MELEE = 'None',
  POISON = 'Poison',
  PSYCHOKINESIS = 'Psychokinesis',
}
export namespace TOSElement {
  export function getIcon(value: TOSElement): string {
    return 'assets/images/element_' + value.toString().toLowerCase() + '.png';
  }
}

export enum TOSEquipmentGrade {
  LEGENDARY = 'Legendary',
  MAGIC = 'Magic',
  NORMAL = 'Normal',
  RARE = 'Rare',
  UNIQUE = 'Unique',
}
export namespace TOSEquipmentGrade {

  export function comparator(a: TOSEquipmentGrade, b: TOSEquipmentGrade): -1 | 0 | 1 {
    let i = TOSEquipmentGrade.getOrder(a);
    let j = TOSEquipmentGrade.getOrder(b);

    return (i < j) ? -1 : (i > j) ? 1 : 0;
  }

  export function getColor(value: TOSEquipmentGrade): string {
    if (value == TOSEquipmentGrade.NORMAL)    return '#999999';
    if (value == TOSEquipmentGrade.MAGIC)     return '#42BAF7';
    if (value == TOSEquipmentGrade.RARE)      return '#CE69EF';
    if (value == TOSEquipmentGrade.UNIQUE)    return '#EF6900';
    if (value == TOSEquipmentGrade.LEGENDARY) return '#F4E409';
  }

  export function getOrder(value: TOSEquipmentGrade) {
    if (value == TOSEquipmentGrade.NORMAL)    return 0;
    if (value == TOSEquipmentGrade.MAGIC)     return 1;
    if (value == TOSEquipmentGrade.RARE)      return 2;
    if (value == TOSEquipmentGrade.UNIQUE)    return 3;
    if (value == TOSEquipmentGrade.LEGENDARY) return 4;
  }

}

export enum  TOSEquipmentMaterial {
  CLOTH = 'Cloth',
  GHOST = 'Ghost',
  LEATHER = 'Leather',
  PLATE = 'Plate',
  UNKNOWN = '',
}

export enum TOSEquipmentType {
  BOTTOM = 'Pants',
  BRACELET = 'Bracelets',
  CANNON = 'Cannons',
  CHARM = 'Charm',
  COSTUME_ARMBAND = 'Armband',
  COSTUME_EFFECT = 'Effect Costumes',
  COSTUME_HAIR = 'Hair',
  COSTUME_HAIR_ACCESSORY = 'Hair Accessories',
  COSTUME_HELMET = 'Helmets',
  COSTUME_LENS = 'Lens',
  COSTUME_OUTFIT = 'Costume',
  COSTUME_SPECIAL = 'Special Costume',
  COSTUME_TOY = 'Toys',
  COSTUME_WING = 'Wings',
  DAGGER = 'Daggers',
  GLOVES = 'Gloves',
  NECKLACE = 'Necklaces',
  ONE_HANDED_BOW = 'Crossbows',
  ONE_HANDED_GUN = 'Pistols',
  ONE_HANDED_MACE = 'Maces',
  ONE_HANDED_SPEAR = 'Spears',
  ONE_HANDED_STAFF = 'Rods',
  ONE_HANDED_SWORD = 'Swords',
  RAPIER = 'Rapiers',
  SEAL = 'Seals',
  SHIELD = 'Shields',
  SHOES = 'Shoes',
  TOP = 'Shirts',
  TWO_HANDED_BOW = 'Bows',
  TWO_HANDED_GUN = 'Muskets',
  TWO_HANDED_MACE = '2H Maces',
  TWO_HANDED_SPEAR = '2H Spears',
  TWO_HANDED_STAFF = 'Staffs',
  TWO_HANDED_SWORD = '2H Swords',
}
export namespace TOSEquipmentType {
  export function toStringFull(value: TOSEquipmentType) {
    if (value == TOSEquipmentType.COSTUME_LENS)           return 'Lens';
    if (value == TOSEquipmentType.COSTUME_HAIR_ACCESSORY) return 'Hair Accessory';

    let result = (value + '');
    result = result.replace('2H', 'Two-Handed');
    result = result.endsWith('s') ? result.substr(0, result.length - 1) : result;

    return result;
  }
}

export enum TOSGemType {
  SKILL = 'Skill',
  STATS = 'Stats',
}
export enum TOSGemSlot {
  BOOTS = 'Boots',
  GLOVES = 'Gloves',
  SUBWEAPON = 'SubWeapon',
  TOPBOTTOM = 'TopAndBottom',
  WEAPON = 'Weapon'
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

export enum TOSJobDifficulty {
  EASY = 'Easy',
  HARD = 'Hard',
  NORMAL = 'Normal',
}
export enum TOSJobTree {
  ARCHER = 'Archer',
  CLERIC = 'Cleric',
  SCOUT = 'Scout',
  WARRIOR = 'Warrior',
  WIZARD = 'Wizard',
}
export enum TOSJobType {
  ATTACK = 'Attack',
  ATTACK_INSTALL = 'Attack with Installations',
  ATTACK_MANEUVERING = 'Attack with Mobility',
  ATTACK_SUMMON = 'Attack with Summons',
  CRAFTING = 'Crafting',
  DEFENSE = 'Defense',
  DEFENSE_PROVOKE = 'Defense with Provoke',
  SUPPORT = 'Support',
  SUPPORT_CONTROL = 'Support with Control',
  SUPPORT_PARTY = 'Support with Party',
}

export enum TOSMonsterRace {
  BEAST = 'Beast',
  DEMON = 'Demon',
  INSECT = 'Insect',
  MUTANT = 'Mutant',
  PLANT = 'Plant',
}
export namespace TOSMonsterRace {
  export function getIcon(value: TOSMonsterRace): string {
    return 'assets/images/monster_race_' + value.toString().toLowerCase() + '.png';
  }
}

export enum TOSMonsterRank {
  BOSS = 'Boss',
  ELITE = 'Elite',
  NORMAL = 'Normal',
  SPECIAL = 'Special',
}
export namespace TOSMonsterRank {

  export function comparator(a: TOSMonsterRank, b: TOSMonsterRank): -1 | 0 | 1 {
    let i = TOSMonsterRank.getOrder(a);
    let j = TOSMonsterRank.getOrder(b);

    return (i < j) ? -1 : (i > j) ? 1 : 0;
  }

  export function getOrder(value: TOSMonsterRank) {
    if (value == TOSMonsterRank.NORMAL) return 0;
    if (value == TOSMonsterRank.ELITE)  return 1;
    if (value == TOSMonsterRank.BOSS)   return 2;
  }

}

export enum TOSMonsterSize {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL'
}
export namespace TOSMonsterSize {

  export function comparator(a: TOSMonsterSize, b: TOSMonsterSize): -1 | 0 | 1 {
    let i = TOSMonsterSize.getOrder(a);
    let j = TOSMonsterSize.getOrder(b);

    return (i < j) ? -1 : (i > j) ? 1 : 0;
  }

  export function getOrder(value: TOSMonsterSize) {
    if (value == TOSMonsterSize.S)  return 0;
    if (value == TOSMonsterSize.M)  return 1;
    if (value == TOSMonsterSize.L)  return 2;
    if (value == TOSMonsterSize.XL) return 3;
  }

}

export enum TOSSkillRequiredStanceCompanion {
  BOTH = 'Yes',
  NO = 'No',
  YES = 'Exclusive'
}

export enum TOSStat {
  CON = 'CON',
  DEX = 'DEX',
  INT = 'INT',
  SPR = 'SPR',
  STR = 'STR',
  HP = 'Maximum HP',
  HP_RECOVERY = 'HP Recovery',
  SP = 'Maximum SP',
  SP_RECOVERY = 'SP Recovery',
  SP_RECOVERY_TIME = 'SP Recovery Time',
  ATTACK_ELEMENT_DARK = 'Dark Property Attack',
  ATTACK_ELEMENT_EARTH = 'Earth Property Attack',
  ATTACK_ELEMENT_FIRE = 'Fire Property Attack',
  ATTACK_ELEMENT_HOLY = 'Holy Property Attack',
  ATTACK_ELEMENT_ICE = 'Ice Property Attack',
  ATTACK_ELEMENT_LIGHTNING = 'Lightning Property Attack',
  ATTACK_ELEMENT_POISON = 'Poison Property Attack',
  ATTACK_ELEMENT_PSYCHOKINESIS = 'Psychokinesis Property Attack',
  ATTACK_LIMIT_MAX = 'Maximum Attack',
  ATTACK_LIMIT_MIN = 'Minimum Attack',
  ATTACK_MATERIAL_CHAIN = 'Attack against Chain Armored Targets',
  ATTACK_MATERIAL_CLOTH = 'Attack against Cloth Armored Targets',
  ATTACK_MATERIAL_LEATHER = 'Attack against Leather-armor Targets',
  ATTACK_MATERIAL_GHOST = 'Attack against Ghost-armor Targets',
  ATTACK_MATERIAL_PLATE = 'Attack against Plate-armor Targets',
  ATTACK_RACE_BEAST = 'Attack against Beast-type Targets',
  ATTACK_RACE_DEVIL = 'Attack against Devil-type Targets',
  ATTACK_RACE_INSECT = 'Attack against Insect-type Targets',
  ATTACK_RACE_MUTANT = 'Attack against Mutant-type Targets',
  ATTACK_RACE_PLANT = 'Attack against Plant-type Targets',
  ATTACK_SIZE_SMALL = 'Attack against Small-size Targets',
  ATTACK_SIZE_MEDIUM = 'Attack against Medium-size Targets',
  ATTACK_SIZE_LARGE = 'Attack against Large-size Targets',
  ATTACK_TYPE_PIERCING = 'Piercing-type Attack',
  ATTACK_TYPE_SLASH = 'Slash-type Attack',
  ATTACK_TYPE_STRIKE = 'Strike-type Attack',
  ATTACK_MAGICAL = 'Magic Attack',
  ATTACK_MAGICAL_AMPLIFICATION = 'Magic Amplification',
  ATTACK_PHYSICAL = 'Physical Attack',
  ATTACK_ANGLE = 'Attack Angle',
  ATTACK_RANGE = 'Attack Range',
  DEFENSE_ELEMENT_DARK = 'Dark Property Resistance',
  DEFENSE_ELEMENT_EARTH = 'Earth Property Resistance',
  DEFENSE_ELEMENT_FIRE = 'Fire Property Resistance',
  DEFENSE_ELEMENT_HOLY = 'Holy Property Resistance',
  DEFENSE_ELEMENT_ICE = 'Ice Property Resistance',
  DEFENSE_ELEMENT_LIGHTNING = 'Lightning Property Resistance',
  DEFENSE_ELEMENT_POISON = 'Poison Property Resistance',
  DEFENSE_ELEMENT_PSYCHOKINESIS = 'Psychokinesis Property Resistance',
  DEFENSE_TYPE_PIERCING = 'Piercing Defense',
  DEFENSE_TYPE_SLASH = 'Slash Defense',
  DEFENSE_TYPE_STRIKE = 'Strike Defense',
  DEFENSE_MAGICAL = 'Magic Defense',
  DEFENSE_PHYSICAL = 'Physical Defense',
  ACCURACY = 'Accuracy',
  EVASION = 'Evasion',
  BLOCK = 'Block',
  BLOCK_PENETRATION = 'Block Penetration',
  BLOCK_RATE = 'Block Rate',
  BLOCK_RATE_FINAL = 'Final Block Rate',
  CRITICAL_ATTACK = 'Critical Attack',
  CRITICAL_ATTACK_MAGICAL = 'Critical Magic Attack',
  CRITICAL_DEFENSE = 'Critical Resistance',
  CRITICAL_RATE = 'Critical Rate',
  AOE_ATTACK_RATIO = 'AoE Attack Ratio',
  AOE_DEFENSE_RATIO = 'AoE Defense Ratio',
  MOVEMENT_SPEED = 'Movement Speed',
  LOOTING_CHANCE = 'Looting Chance',
  STAMINA = 'Stamina',
  STAMINA_RECOVERY = 'Stamina Recovery',
  UNKNOWN = ''
}
export namespace TOSStat {
  export function comparator(a: TOSStat, b: TOSStat): -1 | 0 | 1 {
    let i = Object.values(TOSStat).indexOf(a);
    let j = Object.values(TOSStat).indexOf(b);

    return (i < j) ? -1 : (i > j) ? 1 : 0;
  }
}

/*====================================================================================================================+
 | Interfaces
 *====================================================================================================================*/
export interface ITOSEntity {
  $ID: number;
  $ID_NAME: string;
  Dataset: string;
  Description: string;
  Icon: string;
  Name: string;
  Url: string;
}
export interface ITOSItem extends ITOSEntity {
  Price: number;
  TimeCoolDown: number;
  TimeLifeTime: number;
  Tradability: string;
  Type: string;
  Weight: number;
  Link_Collections: ITOSCollection[];
  Link_Cubes: ITOSCube[];
}

export interface ITOSAttribute extends ITOSEntity {
  DescriptionRequired: string;
  IsToggleable: boolean;
  LevelMax: number;
  Unlock: string[];
  UnlockArgs: { [key: number]: ITOSAttributeUnlockArg };

  Link_Jobs: ITOSJob[];
  Link_Skill: ITOSSkill;

  Price(level: number): number;
  PriceTotal(level: number): number;
}
export interface ITOSAttributeUnlockArg {
  UnlockArgStr: string;
  UnlockArgNum: number;
}

export interface ITOSBook extends ITOSItem {
  Pages: string[];
}

export interface ITOSCard extends ITOSItem {
  IconTooltip: string;
  MonsterElement: TOSElement;
  MonsterRace: TOSMonsterRace;
  Stat_Height: number;
  Stat_Legs: number;
  Stat_Weight: number;
  TypeCard: TOSCardType;
}

export interface ITOSCollection extends ITOSItem {
  Bonus: ITOSCollectionBonus[];
  Link_Items: ITOSItem[];
}
export interface ITOSCollectionBonus {
  Stat: string;
  Value: number;
}

export interface ITOSCube extends ITOSItem {
  Link_Items: ITOSItem[];
}

export interface ITOSEquipment extends ITOSItem {
  Bonus: ITOSEquipmentBonus[];
  Durability: number;
  Grade: TOSEquipmentGrade;
  Level: number;
  Material: TOSEquipmentMaterial;
  Potential: number;
  RequiredLevel: number;
  Sockets: number;
  SocketsLimit: number;
  Stars: number;
  Stat_ATTACK_MAGICAL: number;
  Stat_ATTACK_PHYSICAL_MAX: number;
  Stat_ATTACK_PHYSICAL_MIN: number;
  Stat_DEFENSE_MAGICAL: number;
  Stat_DEFENSE_PHYSICAL: number;
  TypeAttack: TOSAttackType;
  TypeEquipment: TOSEquipmentType;
  Unidentified: boolean;
  UnidentifiedRandom: boolean;

  IsAnvilAvailable: boolean;
  IsTranscendAvailable: boolean;
  Link_Set: ITOSEquipmentSet;

  AnvilATK(level: number): number;
  AnvilDEF(level: number): number;
  AnvilPrice(level: number): number;
  AnvilPriceTotal(level: number): number;

  IsUsableBy(tree: TOSClassTree): boolean;

  TranscendATKRatio(level: number): number;
  TranscendMDEFRatio(level: number): number;
  TranscendPDEFRatio(level: number): number;
  TranscendPrice(level: number): number;
  TranscendPriceTotal(level: number): number;
}
export interface ITOSEquipmentBonus {
  Stat: TOSStat;
  Value: number;
  ValueHTML: string;
}

export interface ITOSEquipmentSet extends ITOSEntity {
  Bonus: { [key:number]: ITOSEquipmentBonus[] }
  Link_Items: ITOSItem[];
}

export interface ITOSGem extends ITOSItem {
  TypeGem: TOSGemType;
  Link_Skill: ITOSSkill;

  Bonus(level: number): { [key:string]: ITOSGemBonus[]};
}
export interface ITOSGemBonus {
  Slot: TOSGemSlot;
  Stat: string | TOSStat;
  Value: number;
}

export interface ITOSJob extends ITOSEntity {
  CircleMax: number;
  JobDifficulty: TOSJobDifficulty;
  JobTree: TOSJobTree;
  JobType: TOSJobType[];
  IsHidden: boolean;
  IsSecret: boolean;
  Rank: number;
  Stat_CON: number;
  Stat_DEX: number;
  Stat_INT: number;
  Stat_SPR: number;
  Stat_STR: number;

  CircleAvailable: number[];
  IconAnimations: string[];
  Link_Attributes: ITOSAttribute[];
  Link_Skills: ITOSSkill[];

  unlockAvailable(build: TOSBuild): boolean;
}

export interface ITOSMap extends ITOSEntity {

}

export interface ITOSMonster extends ITOSEntity {
  Armor: TOSEquipmentMaterial;
  Element: TOSElement;
  Level: number;
  Race: TOSMonsterRace;
  Rank: TOSMonsterRank;
  Size: TOSMonsterSize;
  EXP: number;
  EXPClass: number;
  Stat_CON: number;
  Stat_DEX: number;
  Stat_INT: number;
  Stat_SPR: number;
  Stat_STR: number;
  Stat_HP: number;
  Stat_SP: number;
  Stat_ATTACK_MAGICAL_MAX: number;
  Stat_ATTACK_MAGICAL_MIN: number;
  Stat_DEFENSE_MAGICAL: number;
  Stat_ATTACK_PHYSICAL_MAX: number;
  Stat_ATTACK_PHYSICAL_MIN: number;
  Stat_DEFENSE_PHYSICAL: number;
  Stat_Accuracy: number;
  Stat_Evasion: number;
  Stat_CriticalDamage: number;
  Stat_CriticalDefense: number;
  Stat_CriticalRate: number;
  Stat_BlockPenetration: number;
  Stat_BlockRate: number;

  Link_Drops: ITOSMonsterDropLink[];
  Link_Spawns: ITOSMonsterSpawnLink[];
}
export interface ITOSMonsterDropLink {
  Chance: number;
  Item: ITOSItem;
  Quantity_MAX: number;
  Quantity_MIN: number;
}
export interface ITOSMonsterSpawnLink {
  Map: ITOSMap;
  Population: number;
  TimeRespawn: number;
}

export interface ITOSRecipe extends ITOSItem {
  Link_Materials: ITOSRecipeMaterial[];
  Link_Target: ITOSItem;
}
export interface ITOSRecipeMaterial {
  Item: ITOSItem;
  Quantity: number;
}

export interface ITOSSkill extends ITOSEntity {
  CoolDown: number;
  Element: TOSElement;
  IsEnchanter: boolean;
  IsPardoner: boolean;
  IsShinobi: boolean;
  LevelPerCircle: number;
  OverHeat: number;
  RequiredCircle: number;
  RequiredStance: ITOSSkillRequiredStance[];
  RequiredStanceCompanion: TOSSkillRequiredStanceCompanion;
  RequiredSubWeapon: boolean;
  SPPerLevel: number;
  TypeAttack: TOSAttackType;

  Link_Attributes: ITOSAttribute[];
  Link_Gem: ITOSGem;
  Link_Job: ITOSJob;

  Effect(level: number, stats: TOSBuildStats, showFactors: boolean): string;
  EffectFormula(level: number, prop: string, stats: TOSBuildStats): string;
  LevelMax(circle?: number): number;
}
export interface ITOSSkillRequiredStance {
  Icon: string;
  Name: string;
}
