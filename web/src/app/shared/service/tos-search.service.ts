import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subscriber} from "rxjs";
import {TOSEntity} from "../domain/tos/tos-entity.model";
import {TOSUrlService} from "./tos-url.service";
import {TOSDomainService} from "../domain/tos/tos-domain.service";
import {TOSRegion} from "../domain/tos-region";
import {TOSDataSet} from "../domain/tos/tos-domain";

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

  public load(force: boolean, region: TOSRegion) {
    if ((!this.isLoaded.getValue() || force) && !this.isLoading) {
      this.isLoaded.next(false);
      this.isLoading = true;
      this.worker.postMessage({ cmd: 'load', url: TOSUrlService.Asset(region, '/assets/data/index.json') });
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
          .map((value: object) => {
            let file = value['ref'].split('#')[0];
            let id = +value['ref'].split('#')[1];
            let dataset = Object.values(TOSDataSet).find(value2 => file == value2);

            return TOSDomainService[TOSDataSet.toProperty(dataset) + 'ById'][id];
          });

        this.subscriberSearch && this.subscriberSearch.next(result);
        this.subscriberSearch && this.subscriberSearch.complete();
        this.subscriberSearch = null;
        break;
    }
  }

}
