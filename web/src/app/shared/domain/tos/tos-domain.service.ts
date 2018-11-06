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

  public static attributes: ITOSAttribute[];
  public static attributesById: {[key: number]: ITOSAttribute};
  public static attributesByIdName: {[key: string]: ITOSAttribute};
  public static attributesByJob: {[key: number]: ITOSAttribute[]};
  public static attributesBySkill: {[key: number]: ITOSAttribute[]};

  public static books: ITOSBook[];
  public static booksById: {[key: number]: ITOSBook};

  public static cards: ITOSCard[];
  public static cardsById: {[key: number]: ITOSCard};

  public static collections: ITOSCollection[];
  public static collectionsById: {[key: number]: ITOSCollection};

  public static cubes: ITOSCube[];
  public static cubesById: {[key: number]: ITOSCube};

  public static equipment: ITOSEquipment[];
  public static equipmentById: {[key: number]: ITOSEquipment};

  public static equipmentSets: ITOSEquipmentSet[];
  public static equipmentSetsById: {[key: number]: ITOSEquipmentSet};

  public static gems: ITOSGem[];
  public static gemsById: {[key: number]: ITOSGem};

  public static items: ITOSItem[];
  public static itemsById: {[key: number]: ITOSItem};
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

  public static jobs: ITOSJob[];
  public static jobsById: {[key: number]: ITOSJob};
  public static jobsByIdName: {[key: string]: ITOSJob};
  public static jobsByTree: {[key: string]: ITOSJob[]};

  public static maps: ITOSMap[];
  public static mapsById: {[key: number]: ITOSMap};

  public static monsters: ITOSMonster[];
  public static monstersById: {[key: number]: ITOSMonster};

  public static recipes: ITOSRecipe[];
  public static recipesById: {[key: number]: ITOSRecipe};

  public static skills: ITOSSkill[];
  public static skillsById: {[key: number]: ITOSSkill};
  public static skillsByIdName: {[key: string]: ITOSSkill};
  public static skillsByJob: {[key: number]: ITOSSkill[]};

}
