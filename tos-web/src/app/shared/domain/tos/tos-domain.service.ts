import {
  ITOSAttribute,
  ITOSBook,
  ITOSCard,
  ITOSCollection,
  ITOSCube,
  ITOSDomainRepository,
  ITOSEquipment,
  ITOSEquipmentSet,
  ITOSGem,
  ITOSItem,
  ITOSJob,
  ITOSMap,
  ITOSMonster,
  ITOSRecipe,
  ITOSSkill,
  TOSDataSet,
  TOSJobTree,
  TOSJobTreeService,
} from "./tos-domain";
import {CRUDPage, CRUDPageResult} from "../../service/CRUD.resolver";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {Inject, Injectable} from "@angular/core";
import {TOSAttribute} from "./attribute/tos-attribute.model";
import {TOSRegion} from "../tos-region";

@Injectable({
  providedIn: 'root'
})
export class TOSDomainService {

  private static repository: ITOSDomainRepository;

  constructor(@Inject('ITOSDomainRepository') private repository: ITOSDomainRepository) {
    TOSDomainService.repository = repository;
  }

  public load(dataset: TOSDataSet, region: TOSRegion): Observable<object> {
    return this.repository.load(dataset, region);
  }

  //---------------------------------------------------------------------------

  public static attributes(page: CRUDPage): Observable<CRUDPageResult<TOSAttribute>>        { return this.repository.find(TOSDataSet.ATTRIBUTES, page) };
  public static attributesById($ID: number): Observable<ITOSAttribute>                      { return this.repository.findByIndex(TOSDataSet.ATTRIBUTES, '$ID', $ID, true) };
  public static attributesByIdName($ID_NAME: string): Observable<ITOSAttribute>             { return this.repository.findByIndex(TOSDataSet.ATTRIBUTES, '$ID_NAME', $ID_NAME, true) };

  public static books(page: CRUDPage): Observable<CRUDPageResult<ITOSBook>>                 { return this.repository.find(TOSDataSet.BOOKS, page) };
  public static booksById($ID: number): Observable<ITOSBook>                                { return this.repository.findByIndex(TOSDataSet.BOOKS, '$ID', $ID, true) };

  public static cards(page: CRUDPage): Observable<CRUDPageResult<ITOSCard>>                 { return this.repository.find(TOSDataSet.CARDS, page) };
  public static cardsById($ID: number): Observable<ITOSCard>                                { return this.repository.findByIndex(TOSDataSet.CARDS, '$ID', $ID, true) };

  public static collections(page: CRUDPage): Observable<CRUDPageResult<ITOSCollection>>     { return this.repository.find(TOSDataSet.COLLECTIONS, page) };
  public static collectionsById($ID: number): Observable<ITOSCollection>                    { return this.repository.findByIndex(TOSDataSet.COLLECTIONS, '$ID', $ID, true) };

  public static cubes(page: CRUDPage): Observable<CRUDPageResult<ITOSCube>>                 { return this.repository.find(TOSDataSet.CUBES, page) };
  public static cubesById($ID): Observable<ITOSCube>                                        { return this.repository.findByIndex(TOSDataSet.CUBES, '$ID', $ID, true) };

  public static equipment(page: CRUDPage): Observable<CRUDPageResult<ITOSEquipment>>        { return this.repository.find(TOSDataSet.EQUIPMENT, page) };
  public static equipmentById($ID): Observable<ITOSEquipment>                               { return this.repository.findByIndex(TOSDataSet.EQUIPMENT, '$ID', $ID, true) };

  public static equipmentSets(page: CRUDPage): Observable<CRUDPageResult<ITOSEquipmentSet>> { return this.repository.find(TOSDataSet.EQUIPMENT_SETS, page) };
  public static equipmentSetsById($ID): Observable<ITOSEquipmentSet>                        { return this.repository.findByIndex(TOSDataSet.EQUIPMENT_SETS, '$ID', $ID, true) };

  public static gems(page: CRUDPage): Observable<CRUDPageResult<ITOSGem>>                   { return this.repository.find(TOSDataSet.GEMS, page) };
  public static gemsById($ID: number): Observable<ITOSGem>                                  { return this.repository.findByIndex(TOSDataSet.GEMS, '$ID', $ID, true) };

  public static items(page: CRUDPage): Observable<CRUDPageResult<ITOSItem>>                 { return this.repository.find(TOSDataSet.ITEMS, page) };
  public static itemsById($ID): Observable<ITOSItem>                                        { return this.repository.findByIndex(TOSDataSet.ITEMS, '$ID', $ID, true) };
  public static itemsByIdLink = ($ID: number) => {
    return fromPromise((async () => {
      return null
        || await TOSDomainService.booksById($ID).toPromise()
        || await TOSDomainService.cardsById($ID).toPromise()
        || await TOSDomainService.collectionsById($ID).toPromise()
        || await TOSDomainService.cubesById($ID).toPromise()
        || await TOSDomainService.gemsById($ID).toPromise()
        || await TOSDomainService.itemsById($ID).toPromise()
        || await TOSDomainService.recipesById($ID).toPromise()
        || await TOSDomainService.equipmentById($ID).toPromise() // Note: due to duplicate IDs, fashion items should be the last ones to be checked
    })());
  };

  public static jobs(page: CRUDPage): Observable<CRUDPageResult<ITOSJob>>                   { return this.repository.find(TOSDataSet.JOBS, page) };
  public static jobsById($ID: number): Observable<ITOSJob>                                  { return this.repository.findByIndex(TOSDataSet.JOBS, '$ID', $ID, true) };
  public static jobsByIdName($ID_NAME: string): Observable<ITOSJob>                         { return this.repository.findByIndex(TOSDataSet.JOBS, '$ID_NAME', $ID_NAME, true) };
  public static jobsByTree(jobTree: TOSJobTree): Observable<ITOSJob[]>                      { return this.repository.findByIndex(TOSDataSet.JOBS, 'JobTree', TOSJobTreeService.indexOf(jobTree)) };
  public static jobsByStarter(isStarter: boolean): Observable<ITOSJob[]>                    { return this.repository.findByIndex(TOSDataSet.JOBS, 'IsStarter', isStarter ? 'True' : 'False') };

  public static maps(page: CRUDPage): Observable<CRUDPageResult<ITOSMap>>                   { return this.repository.find(TOSDataSet.MAPS, page) };
  public static mapsById($ID): Observable<ITOSMap>                                          { return this.repository.findByIndex(TOSDataSet.MAPS, '$ID', $ID, true) };

  public static monsters(page: CRUDPage): Observable<CRUDPageResult<ITOSMonster>>           { return this.repository.find(TOSDataSet.MONSTERS, page) };
  public static monstersById($ID): Observable<ITOSMonster>                                  { return this.repository.findByIndex(TOSDataSet.MONSTERS, '$ID', $ID, true) };

  /*
  public static npcs(page: CRUDPage): Observable<CRUDPageResult<ITOSMonster>>               { return this.repository.find(TOSDataSet.NPCS, page) };
  public static npcsById($ID): Observable<ITOSMonster>                                      { return this.repository.findByIndex(TOSDataSet.NPCS, '$ID', $ID, true) };
   */

  public static npcsByIdLink = ($ID: number) => {
    return fromPromise((async () => {
      return null
        || await TOSDomainService.monstersById($ID).toPromise()
        //|| await TOSDomainService.npcsById($ID).toPromise()
    })());
  };

  public static recipes(page: CRUDPage): Observable<CRUDPageResult<ITOSRecipe>>             { return this.repository.find(TOSDataSet.RECIPES, page) };
  public static recipesById($ID): Observable<ITOSRecipe>                                    { return this.repository.findByIndex(TOSDataSet.RECIPES, '$ID', $ID, true) };

  public static skills(page: CRUDPage): Observable<CRUDPageResult<ITOSSkill>>               { return this.repository.find(TOSDataSet.SKILLS, page) };
  public static skillsById($ID: number): Observable<ITOSSkill>                              { return this.repository.findByIndex(TOSDataSet.SKILLS, '$ID', $ID, true) };
  public static skillsByIdName($ID_NAME: string): Observable<ITOSSkill>                     { return this.repository.findByIndex(TOSDataSet.SKILLS, '$ID_NAME', $ID_NAME,  true) };
  public static skillsByJob(job: ITOSJob): Observable<ITOSSkill[]>                          { return this.repository.findByIndex(TOSDataSet.SKILLS, 'Link_Job', job.$ID) };

}
