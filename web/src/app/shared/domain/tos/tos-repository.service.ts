import {BehaviorSubject, forkJoin, Observable, of} from "rxjs";
import {TOSCubeRepository} from "./item/cube/tos-cube.repository";
import {TOSCardRepository} from "./item/card/tos-card.repository";
import {TOSEquipmentRepository} from "./item/equipment/tos-equipment.repository";
import {TOSEquipmentSetRepository} from "./item/equipment/tos-equipment-set.repository";
import {TOSRecipeRepository} from "./item/recipe/tos-recipe.repository";
import {TOSItemRepository} from "./item/tos-item.repository";
import {TOSMapRepository} from "./map/tos-map.repository";
import {TOSMonsterRepository} from "./monster/tos-monster.repository";
import {tap} from "rxjs/operators";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {TOSJobRepository} from "./job/tos-job.repository";
import {TOSAttributeRepository} from "./attribute/tos-attribute.repository";
import {TOSBookRepository} from "./item/book/tos-book.repository";
import {TOSGemRepository} from "./item/gem/tos-gem.repository";
import {TOSSkillRepository} from "./skill/tos-skill.repository";
import {TOSCollectionRepository} from "./item/collection/tos-collection.repository";
import {TOSRegion} from "../tos-region";

export abstract class TOSRepositoryService {

  private static isLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private static isLoading: boolean;
  private static loadProgress: number;

  static get IsLoaded(): Observable<boolean> {
    return this.isLoaded.asObservable();
  }

  static load(force: boolean, loadingBar: LoadingBarService, region: TOSRegion) {
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
      loadingBar.set(0.01);
      this.isLoaded.next(false);
      this.isLoading = true;
      this.loadProgress = 0;
    };

    let repositories = [
      TOSAttributeRepository.instance,
      TOSBookRepository.instance,
      TOSCardRepository.instance,
      TOSCollectionRepository.instance,
      TOSCubeRepository.instance,
      TOSEquipmentRepository.instance,
      TOSEquipmentSetRepository.instance,
      TOSGemRepository.instance,
      TOSItemRepository.instance,
      TOSJobRepository.instance,
      TOSMapRepository.instance,
      TOSMonsterRepository.instance,
      TOSRecipeRepository.instance,
      TOSSkillRepository.instance,
    ].map(value => value.load(force, region).pipe(tap(loadProgress)));

    if (load)
      loadStart();

    return load
      ? forkJoin(repositories).pipe(tap(loadComplete))
      : of(null);
  }

}
