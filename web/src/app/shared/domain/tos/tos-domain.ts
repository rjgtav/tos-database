import {Observable} from "rxjs";
import {TOSUrlService} from "../../service/tos-url.service";

/*====================================================================================================================+
 | Enums
 *====================================================================================================================*/
interface EnumService<T> {
  groupBy(): { header?: string, options: any[] }[];
  indexOf(value: T): number;
  toString(value: T): string;
}
function EnumServiceFactory<T>(enumeration: T): EnumService<any> {
  return {
    groupBy: () => [{ options: Object.values(enumeration) }],
    indexOf: (value: T) => Object.values(enumeration).indexOf(value),
    toString: (value: T) => Object.values(enumeration)[+value] + ''
  }
}

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
export const TOSCardTypeService = EnumServiceFactory(TOSCardType);

export enum TOSClassTree {
  ARCHER = 'Archer',
  CLERIC = 'Cleric',
  SCOUT = 'Scout',
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
      label: 'Character',
      options: [
        TOSDataSet.ATTRIBUTES,
        TOSDataSet.JOBS,
        TOSDataSet.SKILLS,
      ],
    },
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

export const
  TOSElementService = EnumServiceFactory(TOSElement) as EnumService<TOSElement> & {
    icon(value: TOSElement): string
  };
  TOSElementService.icon = (value: TOSElement) => 'assets/images/element_' + value.toString().toLowerCase() + '.png';

export enum TOSEquipmentGrade {
  LEGENDARY = 'Legendary',
  MAGIC = 'Magic',
  NORMAL = 'Normal',
  RARE = 'Rare',
  UNIQUE = 'Unique',
}
export const
  TOSEquipmentGradeService = EnumServiceFactory(TOSEquipmentGrade) as EnumService<TOSEquipmentGrade> & {
    comparator(a: TOSEquipmentGrade, b: TOSEquipmentGrade): -1 | 0 | 1;
    color(value: TOSEquipmentGrade): string;
    order(value: TOSEquipmentGrade): number;
  };
  TOSEquipmentGradeService.comparator = (a: TOSEquipmentGrade, b: TOSEquipmentGrade) => {
    let i = TOSEquipmentGradeService.order(a);
    let j = TOSEquipmentGradeService.order(b);

    return (i < j) ? -1 : (i > j) ? 1 : 0;
  };
  TOSEquipmentGradeService.color = (value: TOSEquipmentGrade) => {
    if (value == TOSEquipmentGrade.NORMAL)    return '#999999';
    if (value == TOSEquipmentGrade.MAGIC)     return '#42BAF7';
    if (value == TOSEquipmentGrade.RARE)      return '#CE69EF';
    if (value == TOSEquipmentGrade.UNIQUE)    return '#EF6900';
    if (value == TOSEquipmentGrade.LEGENDARY) return '#F4E409';
  };
  TOSEquipmentGradeService.order = (value: TOSEquipmentGrade) => {
    if (value == TOSEquipmentGrade.NORMAL)    return 0;
    if (value == TOSEquipmentGrade.MAGIC)     return 1;
    if (value == TOSEquipmentGrade.RARE)      return 2;
    if (value == TOSEquipmentGrade.UNIQUE)    return 3;
    if (value == TOSEquipmentGrade.LEGENDARY) return 4;
  };

export enum  TOSEquipmentMaterial {
  CLOTH = 'Cloth',
  GHOST = 'Ghost',
  LEATHER = 'Leather',
  PLATE = 'Plate',
  UNKNOWN = '',
}
export const TOSEquipmentMaterialService = EnumServiceFactory(TOSEquipmentMaterial);

export enum TOSEquipmentType {
  BOTTOM = 'Pants',
  BRACELET = 'Bracelets',
  CANNON = 'Cannons',
  CHARM = 'Charm',
  COSTUME_ARMBAND = 'Armband',
  COSTUME_DOLL = 'Doll',
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
export const
  TOSEquipmentTypeService = EnumServiceFactory(TOSEquipmentType) as EnumService<TOSEquipmentType> & {
    toStringHuman(value: TOSEquipmentType): string
  };
  TOSEquipmentTypeService.groupBy = () => [
    {
      header: 'Armor',
      options: [
        TOSEquipmentType.BRACELET,
        TOSEquipmentType.GLOVES,
        TOSEquipmentType.NECKLACE,
        TOSEquipmentType.BOTTOM,
        TOSEquipmentType.TOP,
        TOSEquipmentType.SHOES,
      ]
    },
    {
      header: 'Fashion',
      options: [
        TOSEquipmentType.COSTUME_ARMBAND,
        TOSEquipmentType.COSTUME_DOLL,
        TOSEquipmentType.COSTUME_EFFECT,
        TOSEquipmentType.COSTUME_HAIR,
        TOSEquipmentType.COSTUME_HAIR_ACCESSORY,
        TOSEquipmentType.COSTUME_HELMET,
        TOSEquipmentType.COSTUME_LENS,
        TOSEquipmentType.COSTUME_OUTFIT,
        TOSEquipmentType.COSTUME_SPECIAL,
        TOSEquipmentType.COSTUME_TOY,
        TOSEquipmentType.COSTUME_WING,
      ]
    },
    {
      header: '1-Handed Weapons',
      options: [
        TOSEquipmentType.ONE_HANDED_BOW,
        TOSEquipmentType.ONE_HANDED_MACE,
        TOSEquipmentType.RAPIER,
        TOSEquipmentType.ONE_HANDED_STAFF,
        TOSEquipmentType.ONE_HANDED_SPEAR,
        TOSEquipmentType.ONE_HANDED_SWORD,
      ]
    },
    {
      header: '2-Handed Weapons',
      options: [
        TOSEquipmentType.TWO_HANDED_BOW,
        TOSEquipmentType.CANNON,
        TOSEquipmentType.TWO_HANDED_MACE,
        TOSEquipmentType.TWO_HANDED_GUN,
        TOSEquipmentType.TWO_HANDED_SPEAR,
        TOSEquipmentType.TWO_HANDED_STAFF,
        TOSEquipmentType.TWO_HANDED_SWORD,
      ]
    },
    {
      header: 'Sub Weapons',
      options: [
        TOSEquipmentType.DAGGER,
        TOSEquipmentType.ONE_HANDED_GUN,
        TOSEquipmentType.SHIELD,
      ]
    },
    {
      header: 'Seals',
      options: [
        TOSEquipmentType.SEAL,
      ]
    },
  ];
  TOSEquipmentTypeService.toStringHuman = (value: TOSEquipmentType) => {
    if (value == TOSEquipmentType.COSTUME_LENS)           return 'Lens';
    if (value == TOSEquipmentType.COSTUME_HAIR_ACCESSORY) return 'Hair Accessory';

    let result = (value + '');
    result = result.replace('2H', 'Two-Handed');
    result = result.endsWith('s') ? result.substr(0, result.length - 1) : result;

    return result;
  };

export enum TOSGemType {
  SKILL = 'Skill',
  STATS = 'Stats',
}
export const TOSGemTypeService = EnumServiceFactory(TOSGemType);

export enum TOSGemSlot {
  BOOTS = 'Boots',
  GLOVES = 'Gloves',
  SUBWEAPON = 'SubWeapon',
  TOPBOTTOM = 'TopAndBottom',
  WEAPON = 'Weapon'
}
export const TOSGemSlotService = EnumServiceFactory(TOSGemSlot);

export enum TOSItemTradability {
  MARKET = 'Market',
  PLAYER = 'Players',
  SHOP = 'NPC Shops',
  TEAM = 'Team Storage'
}
export const TOSItemTradabilityService = EnumServiceFactory(TOSItemTradability);

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
  SEAL = 'Seal',
  SUBWEAPON = 'Sub Weapon',
  UNUSED = 'Unused',
  WEAPON = 'Weapon',
}
export const
  TOSItemTypeService = EnumServiceFactory(TOSItemType);
  TOSItemTypeService.groupBy = () => [
    {
      options: [
        TOSItemType.DRUG,
        TOSItemType.EVENT,
        TOSItemType.MATERIAL,
        TOSItemType.PREMIUM,
        TOSItemType.QUEST,
      ]
    },
  ];

export enum TOSJobDifficulty {
  EASY = 'Easy',
  HARD = 'Hard',
  NORMAL = 'Normal',
}
export const TOSJobDifficultyService = EnumServiceFactory(TOSJobDifficulty);

export enum TOSJobTree {
  ARCHER = 'Archer',
  CLERIC = 'Cleric',
  SCOUT = 'Scout',
  WARRIOR = 'Warrior',
  WIZARD = 'Wizard',
}
export const TOSJobTreeService = EnumServiceFactory(TOSJobTree);

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
export const TOSJobTypeService = EnumServiceFactory(TOSJobType);

export enum TOSMonsterRace {
  BEAST = 'Beast',
  DEMON = 'Demon',
  INSECT = 'Insect',
  MUTANT = 'Mutant',
  PLANT = 'Plant',
}
export const
  TOSMonsterRaceService = EnumServiceFactory(TOSMonsterRace) as EnumService<TOSMonsterRace> & {
    icon(value: TOSMonsterRace): string
  };
  TOSMonsterRaceService.icon = (value: TOSMonsterRace) => {
    return 'assets/images/monster_race_' + value.toString().toLowerCase() + '.png';
  };

export enum TOSMonsterRank {
  BOSS = 'Boss',
  ELITE = 'Elite',
  NORMAL = 'Normal',
  SPECIAL = 'Special',
}
export const
  TOSMonsterRankService = EnumServiceFactory(TOSMonsterRank) as EnumService<TOSMonsterRank> & {
    comparator(a: TOSMonsterRank, b: TOSMonsterRank): -1 | 0 | 1;
    order(value: TOSMonsterRank): number;
  };
  TOSMonsterRankService.comparator = (a: TOSMonsterRank, b: TOSMonsterRank) => {
    let i = TOSMonsterRankService.order(a);
    let j = TOSMonsterRankService.order(b);

    return (i < j) ? -1 : (i > j) ? 1 : 0;
  };
  TOSMonsterRankService.order = (value: TOSMonsterRank) => {
    if (value == TOSMonsterRank.NORMAL) return 0;
    if (value == TOSMonsterRank.ELITE)  return 1;
    if (value == TOSMonsterRank.BOSS)   return 2;
  };

export enum TOSMonsterSize {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL'
}
export const
  TOSMonsterSizeService = EnumServiceFactory(TOSMonsterSize) as EnumService<TOSMonsterSize> & {
    comparator(a: TOSMonsterSize, b: TOSMonsterSize): -1 | 0 | 1;
    order(value: TOSMonsterSize): number;
  };
  TOSMonsterSizeService.comparator = (a: TOSMonsterSize, b: TOSMonsterSize) => {
    let i = TOSMonsterSizeService.order(a);
    let j = TOSMonsterSizeService.order(b);

    return (i < j) ? -1 : (i > j) ? 1 : 0;
  };
  TOSMonsterSizeService.order = (value: TOSMonsterSize) => {
    if (value == TOSMonsterSize.S)  return 0;
    if (value == TOSMonsterSize.M)  return 1;
    if (value == TOSMonsterSize.L)  return 2;
    if (value == TOSMonsterSize.XL) return 3;
  };

export enum TOSSkillRequiredStanceCompanion {
  BOTH = 'Yes',
  NO = 'No',
  YES = 'Exclusive'
}
export const TOSSkillRequiredStanceCompanionService = EnumServiceFactory(TOSSkillRequiredStanceCompanion);

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
export const
  TOSStatService = EnumServiceFactory(TOSStat) as EnumService<TOSStat> & {
    comparator(a: TOSStat, b: TOSStat): -1 | 0 | 1;
    icon(stat: TOSStat): string;
  };
  TOSStatService.comparator = (a: TOSStat, b: TOSStat) => {
    let i = Object.values(TOSStat).indexOf(a);
    let j = Object.values(TOSStat).indexOf(b);

    return (i < j) ? -1 : (i > j) ? 1 : 0;
  };
  TOSStatService.icon = (stat: TOSStat) => {
    return TOSUrlService.Asset(null, 'assets/images/simulator_stat_' + stat.toLowerCase() + '.png');
  };

/*====================================================================================================================+
 | Interfaces
 *====================================================================================================================*/
export interface ITOSBuild {
  Job$: Observable<ITOSJob>;
  Jobs: ITOSJob[];
  JobTree: TOSJobTree;
  Rank: number;
  Skill$: Observable<ITOSSkill>;
  Stats: ITOSBuildStats;
  StatsBase: ITOSBuildStats;
  StatsBonus: ITOSBuildStats;
  StatsPoints$: Observable<number>;
  Version: number;

  jobAdd$(job: ITOSJob): Promise<void>;
  jobCircle(job: ITOSJob): number; // TODO: Remove after Re:Build releases globally
  jobCircleMax(job: ITOSJob): number;
  jobRanks(job: ITOSJob): number[]; // TODO: Remove after Re:Build releases globally
  jobRemove$(rank: number): Promise<void>;
  jobUnlockAvailable$(job: ITOSJob): Observable<boolean>;

  skillEffect$(skill: ITOSSkill, showFactors: boolean): Observable<string>;
  skillEffectFormula$(skill: ITOSSkill, prop: string): Observable<string>;
  skillLevel(skill: ITOSSkill): number;
  skillLevelIncrement$(skill: ITOSSkill, delta: number, rollOver?: boolean): Promise<void>;
  skillLevelIncrementAvailable$(skill: ITOSSkill, delta: number): Observable<boolean>;
  skillLevelMax$(skill: ITOSSkill): Observable<number>;
  skillPoints(job: ITOSJob): number;
  skillPointsMax(job: ITOSJob) : number;
  skillSP$(skill: ITOSSkill): Observable<number>;

  statsIncrementLevel(stat: string, delta: number): void;
  statsIncrementLevelAvailable(stat: string, delta: number): boolean;
  statsPointsMax(): number;
}
export interface ITOSBuildEncoded {
  jobs: string[],
  skills: { [key: number]: number },
  stats: ITOSBuildStats,
  version: number,
}
export interface ITOSBuildStats {
  CON: number,
  DEX: number,
  INT: number,
  SPR: number,
  STR: number,
}

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
  Link_Collections: Observable<ITOSCollection[]>;
  Link_Cubes: Observable<ITOSCube[]>;
  Link_MonsterDrops: Observable<ITOSItemDrop[]>;
  Link_RecipeMaterial: Observable<ITOSRecipe>;
  Link_RecipeTarget: Observable<ITOSRecipe>;

  isTradable(tradable: TOSItemTradability): boolean;
}
export interface ITOSItemDrop {
  Chance: number;
  Monster: ITOSMonster;
  Url: string;
}

export interface ITOSAttribute extends ITOSEntity {
  DescriptionRequired: string;
  IsToggleable: boolean;
  LevelMax: number;
  Unlock: string[];
  UnlockArgs: { [key: number]: ITOSAttributeUnlockArg };

  Link_Jobs: Observable<ITOSJob[]>;
  Link_Skill: Observable<ITOSSkill>;

  Price(level: number): number;
  PriceTotal(level: number): number;

  unlockAvailable(build: ITOSBuild): Observable<boolean>;
  unlockAvailableCheck(args: string[]): boolean;
}
export interface ITOSAttributeUnlockArg {
  UnlockArgStr: string;
  UnlockArgNum: number;
}

export interface ITOSBook extends ITOSItem {
  Pages: string;
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
  Link_Items: Observable<ITOSItem[]>;
}
export interface ITOSCollectionBonus {
  Stat: string;
  Value: number;
}

export interface ITOSCube extends ITOSItem {
  Link_Items: Observable<ITOSItem[]>;
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
  Link_Set: Observable<ITOSEquipmentSet>;

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
  Icon$: Observable<string>;
  Url$: Observable<string>;

  Link_Items: Observable<ITOSItem[]>;
}

export interface ITOSGem extends ITOSItem {
  TypeGem: TOSGemType;
  Link_Skill: Observable<ITOSSkill>;

  Bonus(level: number): { [key:string]: ITOSGemBonus[]};
}
export interface ITOSGemBonus {
  Stat: string | TOSStat;
  Value: number;
}

export interface ITOSJob extends ITOSEntity {
  CircleAvailable: number[];
  CircleMax: number;
  IconAnimations: string[];
  IsHidden: boolean;
  IsSecret: boolean;
  IsStarter: boolean;
  JobDifficulty: TOSJobDifficulty;
  JobTree: TOSJobTree;
  JobType: TOSJobType[];
  Rank: number;
  Stat_CON: number;
  Stat_DEX: number;
  Stat_INT: number;
  Stat_SPR: number;
  Stat_STR: number;
  StatBase_CON: number;
  StatBase_DEX: number;
  StatBase_INT: number;
  StatBase_SPR: number;
  StatBase_STR: number;

  Link_Attributes: Observable<ITOSAttribute[]>;
  Link_Skills: Observable<ITOSSkill[]>;
  Link_Skills$ID: number[];
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

  Link_Drops: Observable<ITOSMonsterDrop[]>;
  Link_Spawns: Observable<ITOSMonsterSpawn[]>;
}
export interface ITOSMonsterDrop {
  Chance: number;
  Item: ITOSItem;
  Quantity_MAX: number;
  Quantity_MIN: number;
  Url: string;
}
export interface ITOSMonsterSpawn {
  Map: ITOSMap;
  Population: number;
  TimeRespawn: number;
  Url: string;
}

export interface ITOSRecipe extends ITOSItem {
  Link_Materials: Observable<ITOSRecipeMaterial[]>;
  Link_Target: Observable<ITOSItem>;
}
export interface ITOSRecipeMaterial {
  Item: ITOSItem;
  Quantity: number;
  Url: string;
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
  TypeAttack: TOSAttackType;

  Link_Attributes: Observable<ITOSAttribute[]>;
  Link_Gem: Observable<ITOSGem>;
  Link_Job: Observable<ITOSJob>;
  Link_Job$ID: number;

  EffectDescription(build: ITOSBuild, showFactors: boolean): Observable<string>;
  EffectFormula(prop: string, build: ITOSBuild): Observable<string>;
  LevelMax(circle?: number): number;
  SPCost(build: ITOSBuild): Observable<number>;
}
export interface ITOSSkillRequiredStance {
  Icon: string;
  Name: string;
}
