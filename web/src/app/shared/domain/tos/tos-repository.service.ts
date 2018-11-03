import {TOSBookRepository} from "./item/book/tos-book.repository";
import {TOSCollectionRepository} from "./item/collection/tos-collection.repository";
import {BehaviorSubject, forkJoin, Observable, of} from "rxjs";
import {TOSCubeRepository} from "./item/cube/tos-cube.repository";
import {TOSAttributeRepository} from "./attribute/tos-attribute.repository";
import {TOSCardRepository} from "./item/card/tos-card.repository";
import {TOSEquipmentRepository} from "./item/equipment/tos-equipment.repository";
import {TOSEquipmentSetRepository} from "./item/equipment/tos-equipment-set.repository";
import {TOSGemRepository} from "./item/gem/tos-gem.repository";
import {TOSRecipeRepository} from "./item/recipe/tos-recipe.repository";
import {TOSItemRepository} from "./item/tos-item.repository";
import {TOSJobRepository} from "./job/tos-job.repository";
import {TOSMapRepository} from "./map/tos-map.repository";
import {TOSMonsterRepository} from "./monster/tos-monster.repository";
import {TOSSkillRepository} from "./skill/tos-skill.repository";
import {tap} from "rxjs/operators";
import {LoadingBarService} from "@ngx-loading-bar/core";

export abstract class TOSRepositoryService {

  private static readonly attributeRepository: TOSAttributeRepository = new TOSAttributeRepository();
  private static readonly bookRepository: TOSBookRepository = new TOSBookRepository();
  private static readonly cardRepository: TOSCardRepository = new TOSCardRepository();
  private static readonly collectionRepository: TOSCollectionRepository = new TOSCollectionRepository();
  private static readonly cubeRepository: TOSCubeRepository = new TOSCubeRepository();
  private static readonly equipmentRepository: TOSEquipmentRepository = new TOSEquipmentRepository();
  private static readonly equipmentSetRepository: TOSEquipmentSetRepository = new TOSEquipmentSetRepository();
  private static readonly gemRepository: TOSGemRepository = new TOSGemRepository();
  private static readonly itemRepository: TOSItemRepository = new TOSItemRepository();
  private static readonly jobRepository: TOSJobRepository = new TOSJobRepository();
  private static readonly mapRepository: TOSMapRepository = new TOSMapRepository();
  private static readonly monsterRepository: TOSMonsterRepository = new TOSMonsterRepository();
  private static readonly recipeRepository: TOSRecipeRepository = new TOSRecipeRepository();
  private static readonly skillRepository: TOSSkillRepository = new TOSSkillRepository();

  private static isLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private static isLoading: boolean;
  private static loadProgress: number;

  static findAttributes = TOSRepositoryService.attributeRepository.findAll;
  static findAttributesById = TOSRepositoryService.attributeRepository.findById;
  static findAttributesByIdName = TOSRepositoryService.attributeRepository.findByIdName;
  static findAttributesByJob = TOSRepositoryService.attributeRepository.findByJob;
  static findAttributesBySkill = TOSRepositoryService.attributeRepository.findBySkill;

  static findBooks = TOSRepositoryService.bookRepository.findAll;
  static findBooksById = TOSRepositoryService.bookRepository.findById;

  static findCards = TOSRepositoryService.cardRepository.findAll;
  static findCardsById = TOSRepositoryService.cardRepository.findById;

  static findCollections = TOSRepositoryService.collectionRepository.findAll;
  static findCollectionsById = TOSRepositoryService.collectionRepository.findById;

  static findCubes = TOSRepositoryService.cubeRepository.findAll;
  static findCubesById = TOSRepositoryService.cubeRepository.findById;

  static findEquipment = TOSRepositoryService.equipmentRepository.findAll;
  static findEquipmentById = TOSRepositoryService.equipmentRepository.findById;

  static findEquipmentSets = TOSRepositoryService.equipmentSetRepository.findAll;
  static findEquipmentSetsById = TOSRepositoryService.equipmentSetRepository.findById;

  static findGems = TOSRepositoryService.gemRepository.findAll;
  static findGemsById = TOSRepositoryService.gemRepository.findById;

  static findItems = TOSRepositoryService.itemRepository.findAll;
  static findItemsById = TOSRepositoryService.itemRepository.findById;

  static findJobs = TOSRepositoryService.jobRepository.findAll;
  static findJobsById = TOSRepositoryService.jobRepository.findById;
  static findJobsByIdName = TOSRepositoryService.jobRepository.findByIdName;
  static findJobsByTree = TOSRepositoryService.jobRepository.findByTree;

  static findMaps = TOSRepositoryService.mapRepository.findAll;
  static findMapsById = TOSRepositoryService.mapRepository.findById;

  static findMonsters = TOSRepositoryService.monsterRepository.findAll;
  static findMonstersById = TOSRepositoryService.monsterRepository.findById;

  static findRecipes = TOSRepositoryService.recipeRepository.findAll;
  static findRecipesById = TOSRepositoryService.recipeRepository.findById;

  static findSkills = TOSRepositoryService.skillRepository.findAll;
  static findSkillsById = TOSRepositoryService.skillRepository.findById;
  static findSkillsByIdName = TOSRepositoryService.skillRepository.findByIdName;
  static findSkillsByJob = TOSRepositoryService.skillRepository.findByJob;

  static get IsLoaded(): Observable<boolean> {
    return this.isLoaded.asObservable();
  }

  static load(loadingBar: LoadingBarService, force: boolean = false) {
    let load = (force || !this.isLoaded.getValue()) && !this.isLoading;
    let loadComplete = () => {
      //console.log('loadComplete', this.isLoaded.getValue());
      if (!this.isLoaded.getValue()) {
        loadingBar.complete();
        this.isLoaded.next(true);
        this.isLoading = false;
        this.loadProgress = 0;
      }
    };
    let loadProgress = () => {
      //console.log('loadProgress', this.isLoaded.getValue(), this.loadProgress);
      if (!this.isLoaded.getValue())
        loadingBar.set(this.loadProgress += 100 / (repositories.length + 1));
    };
    let loadStart = () => {
      //console.log('loadStart', this.isLoaded.getValue(), force);
      loadingBar.set(0);
      this.isLoaded.next(false);
      this.isLoading = true;
      this.loadProgress = 0;
    };

    let repositories = [
      TOSRepositoryService.attributeRepository,
      TOSRepositoryService.bookRepository,
      TOSRepositoryService.cardRepository,
      TOSRepositoryService.collectionRepository,
      TOSRepositoryService.cubeRepository,
      TOSRepositoryService.equipmentRepository,
      TOSRepositoryService.equipmentSetRepository,
      TOSRepositoryService.gemRepository,
      TOSRepositoryService.itemRepository,
      TOSRepositoryService.jobRepository,
      TOSRepositoryService.mapRepository,
      TOSRepositoryService.monsterRepository,
      TOSRepositoryService.recipeRepository,
      TOSRepositoryService.skillRepository,
    ].map(value => value.load(force).pipe(tap(loadProgress)));

    if (load)
      loadStart();

    return load
      ? forkJoin(repositories).pipe(tap(loadComplete))
      : of(null);
  }

}
