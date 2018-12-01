import {
  ITOSAttribute,
  ITOSBook,
  ITOSCard,
  ITOSCollection,
  ITOSCube,
  ITOSEquipment,
  ITOSEquipmentSet,
  ITOSGem,
  ITOSItem,
  ITOSJob,
  ITOSMap,
  ITOSMonster,
  ITOSRecipe,
  ITOSSkill,
} from "./tos-domain";

export abstract class TOSDomainService {

  public static readonly ATTRIBUTES = 'Attributes';
  public static readonly ATTRIBUTES_BY_ID = 'AttributesById';
  public static readonly ATTRIBUTES_BY_ID_NAME = 'AttributesByIdName';
  public static readonly ATTRIBUTES_BY_JOB = 'AttributesByJob';
  public static readonly ATTRIBUTES_BY_SKILL = 'AttributesBySkill';

  public static readonly BOOKS = 'Books';
  public static readonly BOOKS_BY_ID = 'BooksById';

  public static readonly CARDS = 'Cards';
  public static readonly CARDS_BY_ID = 'CardsById';

  public static readonly COLLECTIONS = 'Collections';
  public static readonly COLLECTIONS_BY_ID = 'CollectionsById';

  public static readonly CUBES = 'Cubes';
  public static readonly CUBES_BY_ID = 'CubesById';

  public static readonly EQUIPMENT = 'Equipment';
  public static readonly EQUIPMENT_BY_ID = 'EquipmentById';

  public static readonly EQUIPMENT_SETS = 'EquipmentSets';
  public static readonly EQUIPMENT_SETS_BY_ID = 'EquipmentSetsById';

  public static readonly GEMS = 'Gems';
  public static readonly GEMS_BY_ID = 'GemsById';

  public static readonly ITEMS = 'Items';
  public static readonly ITEMS_BY_ID = 'ItemsById';

  public static readonly MONSTERS = 'Monsters';
  public static readonly MONSTERS_BY_ID = 'MonstersById';

  public static readonly MAPS = 'Maps';
  public static readonly MAPS_BY_ID = 'MapsById';

  public static readonly JOBS = 'Jobs';
  public static readonly JOBS_BY_ID = 'JobsById';
  public static readonly JOBS_BY_ID_NAME = 'JobsByIdName';
  public static readonly JOBS_BY_TREE = 'JobsByTree';

  public static readonly RECIPES = 'Recipes';
  public static readonly RECIPES_BY_ID = 'RecipesById';

  public static readonly SKILLS = 'Skills';
  public static readonly SKILLS_BY_ID = 'SkillsById';
  public static readonly SKILLS_BY_ID_NAME = 'SkillsByIdName';
  public static readonly SKILLS_BY_JOB = 'SkillsByJob';

  public static $loader: { [key: string]: () => any } = {};

  public static get attributes(): ITOSAttribute[] { return this.load(TOSDomainService.ATTRIBUTES) };
  public static get attributesById(): {[key: number]: ITOSAttribute} { return this.load(TOSDomainService.ATTRIBUTES_BY_ID) };
  public static get attributesByIdName(): {[key: string]: ITOSAttribute} { return this.load(TOSDomainService.ATTRIBUTES_BY_ID_NAME) };
  public static get attributesByJob(): {[key: number]: ITOSAttribute[]} { return this.load(TOSDomainService.ATTRIBUTES_BY_JOB) };
  public static get attributesBySkill(): {[key: number]: ITOSAttribute[]} { return this.load(TOSDomainService.ATTRIBUTES_BY_SKILL) };

  public static get books(): ITOSBook[] { return this.load(TOSDomainService.BOOKS) };
  public static get booksById(): {[key: number]: ITOSBook} { return this.load(TOSDomainService.BOOKS_BY_ID) };

  public static get cards(): ITOSCard[] { return this.load(TOSDomainService.CARDS) };
  public static get cardsById(): {[key: number]: ITOSCard} { return this.load(TOSDomainService.CARDS_BY_ID) };

  public static get collections(): ITOSCollection[] { return this.load(TOSDomainService.COLLECTIONS) };
  public static get collectionsById(): {[key: number]: ITOSCollection} { return this.load(TOSDomainService.COLLECTIONS_BY_ID) };

  public static get cubes(): ITOSCube[] { return this.load(TOSDomainService.CUBES) };
  public static get cubesById(): {[key: number]: ITOSCube} { return this.load(TOSDomainService.CUBES_BY_ID) };

  public static get equipment(): ITOSEquipment[] { return this.load(TOSDomainService.EQUIPMENT) };
  public static get equipmentById(): {[key: number]: ITOSEquipment} { return this.load(TOSDomainService.EQUIPMENT_BY_ID) };

  public static get equipmentSets(): ITOSEquipmentSet[] { return this.load(TOSDomainService.EQUIPMENT_SETS) };
  public static get equipmentSetsById(): {[key: number]: ITOSEquipmentSet} { return this.load(TOSDomainService.EQUIPMENT_SETS_BY_ID) };

  public static get gems(): ITOSGem[] { return this.load(TOSDomainService.GEMS) };
  public static get gemsById(): {[key: number]: ITOSGem} { return this.load(TOSDomainService.GEMS_BY_ID) };

  public static get items(): ITOSItem[] { return this.load(TOSDomainService.ITEMS) };
  public static get itemsById(): {[key: number]: ITOSItem} { return this.load(TOSDomainService.ITEMS_BY_ID) };
  public static itemsByIdLink = ($ID: number) => null
    || TOSDomainService.booksById[$ID]
    || TOSDomainService.cardsById[$ID]
    || TOSDomainService.collectionsById[$ID]
    || TOSDomainService.cubesById[$ID]
    || TOSDomainService.equipmentById[$ID]
    || TOSDomainService.gemsById[$ID]
    || TOSDomainService.itemsById[$ID]
    || TOSDomainService.recipesById[$ID]
  ;

  public static get jobs(): ITOSJob[] { return this.load(TOSDomainService.JOBS) };
  public static get jobsById(): {[key: number]: ITOSJob} { return this.load(TOSDomainService.JOBS_BY_ID) };
  public static get jobsByIdName(): {[key: string]: ITOSJob} { return this.load(TOSDomainService.JOBS_BY_ID_NAME) };
  public static get jobsByTree(): {[key: string]: ITOSJob[]} { return this.load(TOSDomainService.JOBS_BY_TREE) };

  public static get maps(): ITOSMap[] { return this.load(TOSDomainService.MAPS) };
  public static get mapsById(): {[key: number]: ITOSMap} { return this.load(TOSDomainService.MAPS_BY_ID) };

  public static get monsters(): ITOSMonster[] { return this.load(TOSDomainService.MONSTERS) };
  public static get monstersById(): {[key: number]: ITOSMonster} { return this.load(TOSDomainService.MONSTERS_BY_ID) };

  public static get recipes(): ITOSRecipe[] { return this.load(TOSDomainService.RECIPES) };
  public static get recipesById(): {[key: number]: ITOSRecipe} { return this.load(TOSDomainService.RECIPES_BY_ID) };

  public static get skills(): ITOSSkill[] { return this.load(TOSDomainService.SKILLS) };
  public static get skillsById(): {[key: number]: ITOSSkill} { return this.load(TOSDomainService.SKILLS_BY_ID) };
  public static get skillsByIdName(): {[key: string]: ITOSSkill} { return this.load(TOSDomainService.SKILLS_BY_ID_NAME) };
  public static get skillsByJob(): {[key: number]: ITOSSkill[]} { return this.load(TOSDomainService.SKILLS_BY_JOB) };

  private static load(key: string) {
    return this[key] = this[key] || this.$loader[key]();
  }
  public static clear(key: string) {
    this[key] = null;
  }

}
