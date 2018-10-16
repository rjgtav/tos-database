import {TOSBookRepository} from "./item/book/tos-book.repository";
import {TOSCollectionRepository} from "./item/collection/tos-collection.repository";
import {forkJoin} from "rxjs";
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

  static searchAttributes = TOSRepositoryService.attributeRepository.search;
  static searchBooks = TOSRepositoryService.bookRepository.search;
  static searchCards = TOSRepositoryService.cardRepository.search;
  static searchCollections = TOSRepositoryService.collectionRepository.search;
  static searchCubes = TOSRepositoryService.cubeRepository.search;
  static searchEquipment = TOSRepositoryService.equipmentRepository.search;
  static searchEquipmentSets = TOSRepositoryService.equipmentSetRepository.search;
  static searchGems = TOSRepositoryService.gemRepository.search;
  static searchItems = TOSRepositoryService.itemRepository.search;
  static searchJobs = TOSRepositoryService.jobRepository.search;
  static searchMaps = TOSRepositoryService.mapRepository.search;
  static searchMonsters = TOSRepositoryService.monsterRepository.search;
  static searchRecipes = TOSRepositoryService.recipeRepository.search;
  static searchSkills = TOSRepositoryService.skillRepository.search;

  static factory() {
    return () => forkJoin([
      TOSRepositoryService.attributeRepository.load(),
      TOSRepositoryService.bookRepository.load(),
      TOSRepositoryService.cardRepository.load(),
      TOSRepositoryService.collectionRepository.load(),
      TOSRepositoryService.cubeRepository.load(),
      TOSRepositoryService.equipmentRepository.load(),
      TOSRepositoryService.equipmentSetRepository.load(),
      TOSRepositoryService.gemRepository.load(),
      TOSRepositoryService.itemRepository.load(),
      TOSRepositoryService.jobRepository.load(),
      TOSRepositoryService.mapRepository.load(),
      TOSRepositoryService.monsterRepository.load(),
      TOSRepositoryService.recipeRepository.load(),
      TOSRepositoryService.skillRepository.load(),
    ]).toPromise();
  }

}
