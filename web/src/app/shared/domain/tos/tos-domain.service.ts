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
  TOSJobTree,
  TOSJobTreeService,
} from "./tos-domain";
import {CRUDPage, CRUDPageResult} from "../../service/CRUD.resolver";
import {CRUDRepository} from "../../service/CRUD.repository";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

export abstract class TOSDomainService {

  public static readonly ATTRIBUTES             = 'Attributes';
  public static readonly ATTRIBUTES_BY_ID       = '$ID';
  public static readonly ATTRIBUTES_BY_ID_NAME  = '$ID_NAME';
  public static readonly ATTRIBUTES_BY_JOB      = 'Link_Jobs.$ID';
  public static readonly ATTRIBUTES_BY_SKILL    = 'Link_Skill.$ID';

  public static readonly BOOKS                  = 'Books';
  public static readonly BOOKS_BY_ID            = '$ID';

  public static readonly CARDS                  = 'Cards';
  public static readonly CARDS_BY_ID            = '$ID';

  public static readonly COLLECTIONS            = 'Collections';
  public static readonly COLLECTIONS_BY_ID      = '$ID';

  public static readonly CUBES                  = 'Cubes';
  public static readonly CUBES_BY_ID            = '$ID';

  public static readonly EQUIPMENT              = 'Equipment';
  public static readonly EQUIPMENT_BY_ID        = '$ID';

  public static readonly EQUIPMENT_SETS         = 'EquipmentSets';
  public static readonly EQUIPMENT_SETS_BY_ID   = '$ID';

  public static readonly GEMS                   = 'Gems';
  public static readonly GEMS_BY_ID             = '$ID';

  public static readonly ITEMS                  = 'Items';
  public static readonly ITEMS_BY_ID            = '$ID';

  public static readonly MONSTERS               = 'Monsters';
  public static readonly MONSTERS_BY_ID         = '$ID';

  public static readonly MAPS                   = 'Maps';
  public static readonly MAPS_BY_ID             = '$ID';

  public static readonly JOBS                   = 'Jobs';
  public static readonly JOBS_BY_ID             = '$ID';
  public static readonly JOBS_BY_ID_NAME        = '$ID_NAME';
  public static readonly JOBS_BY_TREE           = 'JobTree';
  public static readonly JOBS_BY_STARTER        = 'IsStarter';

  public static readonly RECIPES                = 'Recipes';
  public static readonly RECIPES_BY_ID          = '$ID';

  public static readonly SKILLS                 = 'Skills';
  public static readonly SKILLS_BY_ID           = '$ID';
  public static readonly SKILLS_BY_ID_NAME      = '$ID_NAME';
  public static readonly SKILLS_BY_JOB          = 'Link_Job.$ID';

  public static $repository: { [key: string]: CRUDRepository<any> } = {};

  public static attributes(page: CRUDPage): Observable<CRUDPageResult<ITOSAttribute>>       { return this.$repository[TOSDomainService.ATTRIBUTES].find(page) };
  public static attributesById($ID: number): Observable<ITOSAttribute>                      { return this.$repository[TOSDomainService.ATTRIBUTES].findBy($ID, TOSDomainService.ATTRIBUTES_BY_ID) };
  public static attributesByIdName($ID_NAME: string): Observable<ITOSAttribute>             { return this.$repository[TOSDomainService.ATTRIBUTES].findBy($ID_NAME, TOSDomainService.ATTRIBUTES_BY_ID_NAME) };
  public static attributesByJob(job: ITOSJob): Observable<ITOSAttribute[]>                  { return this.$repository[TOSDomainService.ATTRIBUTES].findBy(job.$ID, TOSDomainService.ATTRIBUTES_BY_JOB) };
  public static attributesBySkill(skill: ITOSSkill): Observable<ITOSAttribute[]>            { return this.$repository[TOSDomainService.ATTRIBUTES].findBy(skill.$ID, TOSDomainService.ATTRIBUTES_BY_SKILL) };

  public static books(page: CRUDPage): Observable<CRUDPageResult<ITOSBook>>                 { return this.$repository[TOSDomainService.BOOKS].find(page) };
  public static booksById($ID: number): Observable<ITOSBook>                                { return this.$repository[TOSDomainService.BOOKS].findBy($ID, TOSDomainService.BOOKS_BY_ID) };

  public static cards(page: CRUDPage): Observable<CRUDPageResult<ITOSCard>>                 { return this.$repository[TOSDomainService.CARDS].find(page) };
  public static cardsById($ID: number): Observable<ITOSCard>                                { return this.$repository[TOSDomainService.CARDS].findBy($ID, TOSDomainService.CARDS_BY_ID) };

  public static collections(page: CRUDPage): Observable<CRUDPageResult<ITOSCollection>>     { return this.$repository[TOSDomainService.COLLECTIONS].find(page) };
  public static collectionsById($ID: number): Observable<ITOSCollection>                    { return this.$repository[TOSDomainService.COLLECTIONS].findBy($ID, TOSDomainService.COLLECTIONS_BY_ID) };

  public static cubes(page: CRUDPage): Observable<CRUDPageResult<ITOSCube>>                 { return this.$repository[TOSDomainService.CUBES].find(page) };
  public static cubesById($ID): Observable<ITOSCube>                                        { return this.$repository[TOSDomainService.CUBES].findBy($ID, TOSDomainService.CUBES_BY_ID) };

  public static equipment(page: CRUDPage): Observable<CRUDPageResult<ITOSEquipment>>        { return this.$repository[TOSDomainService.EQUIPMENT].find(page) };
  public static equipmentById($ID): Observable<ITOSEquipment>                               { return this.$repository[TOSDomainService.EQUIPMENT].findBy($ID, TOSDomainService.EQUIPMENT_BY_ID) };

  public static equipmentSets(page: CRUDPage): Observable<CRUDPageResult<ITOSEquipmentSet>> { return this.$repository[TOSDomainService.EQUIPMENT_SETS].find(page) };
  public static equipmentSetsById($ID): Observable<ITOSEquipmentSet>                        { return this.$repository[TOSDomainService.EQUIPMENT_SETS].findBy($ID, TOSDomainService.EQUIPMENT_SETS_BY_ID) };

  public static gems(page: CRUDPage): Observable<CRUDPageResult<ITOSGem>>                   { return this.$repository[TOSDomainService.GEMS].find(page) };
  public static gemsById($ID: number): Observable<ITOSGem>                                  { return this.$repository[TOSDomainService.GEMS].findBy($ID, TOSDomainService.GEMS_BY_ID) };

  public static items(page: CRUDPage): Observable<CRUDPageResult<ITOSItem>>                 { return this.$repository[TOSDomainService.ITEMS].find(page) };
  public static itemsById($ID): Observable<ITOSItem>                                        { return this.$repository[TOSDomainService.ITEMS].findBy($ID, TOSDomainService.ITEMS_BY_ID) };
  public static itemsByIdLink = ($ID: number) => {
    return fromPromise((async () => {
      return null
        || await TOSDomainService.booksById($ID).toPromise()
        || await TOSDomainService.cardsById($ID).toPromise()
        || await TOSDomainService.collectionsById($ID).toPromise()
        || await TOSDomainService.cubesById($ID).toPromise()
        || await TOSDomainService.equipmentById($ID).toPromise()
        || await TOSDomainService.gemsById($ID).toPromise()
        || await TOSDomainService.itemsById($ID).toPromise()
        || await TOSDomainService.recipesById($ID).toPromise()
    })());
  };

  public static jobs(page: CRUDPage): Observable<CRUDPageResult<ITOSJob>>                   { return this.$repository[TOSDomainService.JOBS].find(page) };
  public static jobsById($ID: number): Observable<ITOSJob>                                  { return this.$repository[TOSDomainService.JOBS].findBy($ID, TOSDomainService.JOBS_BY_ID) };
  public static jobsByIdName($ID_NAME: string): Observable<ITOSJob>                         { return this.$repository[TOSDomainService.JOBS].findBy($ID_NAME, TOSDomainService.JOBS_BY_ID_NAME) };
  public static jobsByTree(jobTree: TOSJobTree): Observable<ITOSJob[]>                      { return this.$repository[TOSDomainService.JOBS].findBy(TOSJobTreeService.indexOf(jobTree), TOSDomainService.JOBS_BY_TREE) };
  public static jobsByStarter(isStarter: boolean): Observable<ITOSJob[]>                    { return this.$repository[TOSDomainService.JOBS].findBy(isStarter, TOSDomainService.JOBS_BY_STARTER) };

  public static maps(page: CRUDPage): Observable<CRUDPageResult<ITOSMap>>                   { return this.$repository[TOSDomainService.MAPS].find(page) };
  public static mapsById($ID): Observable<ITOSMap>                                          { return this.$repository[TOSDomainService.MAPS].findBy($ID, TOSDomainService.MAPS_BY_ID) };

  public static monsters(page: CRUDPage): Observable<CRUDPageResult<ITOSMonster>>           { return this.$repository[TOSDomainService.MONSTERS].find(page) };
  public static monstersById($ID): Observable<ITOSMonster>                                  { return this.$repository[TOSDomainService.MONSTERS].findBy($ID, TOSDomainService.MONSTERS_BY_ID) };

  public static recipes(page: CRUDPage): Observable<CRUDPageResult<ITOSRecipe>>             { return this.$repository[TOSDomainService.RECIPES].find(page) };
  public static recipesById($ID): Observable<ITOSRecipe>                                    { return this.$repository[TOSDomainService.RECIPES].findBy($ID, TOSDomainService.RECIPES_BY_ID) };

  public static skills(page: CRUDPage): Observable<CRUDPageResult<ITOSSkill>>               { return this.$repository[TOSDomainService.SKILLS].find(page) };
  public static skillsById($ID: number): Observable<ITOSSkill>                              { return this.$repository[TOSDomainService.SKILLS].findBy($ID, TOSDomainService.SKILLS_BY_ID) };
  public static skillsByIdName($ID_NAME: string): Observable<ITOSSkill>                     { return this.$repository[TOSDomainService.SKILLS].findBy($ID_NAME, TOSDomainService.SKILLS_BY_ID_NAME) };
  public static skillsByJob(job: ITOSJob): Observable<ITOSSkill[]>                          { return this.$repository[TOSDomainService.SKILLS].findBy(job.$ID, TOSDomainService.SKILLS_BY_JOB) };

}
