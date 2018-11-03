import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subscriber} from "rxjs";
import {TOSRegionService} from "./tos-region.service";
import {TOSRepositoryService} from "../domain/tos/tos-repository.service";
import {TOSEntity} from "../domain/tos/entity/tos-entity.model";

@Injectable({
  providedIn: 'root'
})
export class TOSSearchService {

  private static instance: TOSSearchService;
  static get Instance(): TOSSearchService { return TOSSearchService.instance; }

  private isLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isLoading: boolean;
  private subscriberSearch: Subscriber<string[]>;
  private readonly worker: Worker;

  constructor() {
    TOSSearchService.instance = this;

    this.worker = new Worker('assets/js/lunr.worker.lib.js');
    this.worker.addEventListener('error', this.onWorkerError.bind(this));
    this.worker.addEventListener('message', this.onWorkerMessage.bind(this));
  }

  get IsLoaded(): Observable<boolean> {
    return this.isLoaded.asObservable();
  }

  public load(force: boolean = false) {
    let path = (location.href.indexOf('github') > 0 ? '/tos-database' : '') + '/assets/data/index.json';
        path = path.replace('data/', 'data' + TOSRegionService.RegionUrl(''));

    if ((!this.isLoaded.getValue() || force) && !this.isLoading) {
      this.isLoaded.next(false);
      this.isLoading = true;
      this.worker.postMessage({ cmd: 'load', url: path });
    }
  }

  public search(query: string): Observable<TOSEntity[]> {
    if (query == '' || query.length <= 2)
      return of([]);

    return Observable.create((subscriber) => {
      this.subscriberSearch = subscriber;
      this.worker.postMessage({ cmd: 'query', query })
    });
  }

  private onWorkerError(event: any) {
    this.subscriberSearch && this.subscriberSearch.next([]);
    this.subscriberSearch && this.subscriberSearch.complete();
    this.subscriberSearch = null;
  }
  private onWorkerMessage(event: any) {
    //console.log('onWorkerMessage', event.data);
    switch (event.data.cmd) {
      case 'load':
        this.isLoaded.next(true);
        this.isLoading = false;
        break;
      case 'query':
        let result = event.data.result
          .slice(0, 15) // Limit search results
          .map((value: object) => {
            let file = value['ref'].split('#')[0];
            let id = +value['ref'].split('#')[1];

            if (file == 'attributes')     return TOSRepositoryService.findAttributesById(id);
            if (file == 'books')          return TOSRepositoryService.findBooksById(id);
            if (file == 'cards')          return TOSRepositoryService.findCardsById(id);
            if (file == 'collections')    return TOSRepositoryService.findCollectionsById(id);
            if (file == 'cubes')          return TOSRepositoryService.findCubesById(id);
            if (file == 'equipment')      return TOSRepositoryService.findEquipmentById(id);
            if (file == 'equipment_sets') return TOSRepositoryService.findEquipmentSetsById(id);
            if (file == 'gems')           return TOSRepositoryService.findGemsById(id);
            if (file == 'items')          return TOSRepositoryService.findItemsById(id);
            if (file == 'jobs')           return TOSRepositoryService.findJobsById(id);
            if (file == 'maps')           return TOSRepositoryService.findMapsById(id);
            if (file == 'monsters')       return TOSRepositoryService.findMonstersById(id);
            if (file == 'recipes')        return TOSRepositoryService.findRecipesById(id);
            if (file == 'skills')         return TOSRepositoryService.findSkillsById(id);

            return null;
          });

        this.subscriberSearch && this.subscriberSearch.next(result);
        this.subscriberSearch && this.subscriberSearch.complete();
        this.subscriberSearch = null;
        break;
    }
  }

}
