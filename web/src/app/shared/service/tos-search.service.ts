import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of, Subject, Subscription} from "rxjs";
import {TOSEntity} from "../domain/tos/tos-entity.model";
import {TOSDomainService} from "../domain/tos/tos-domain.service";
import {TOSRegion} from "../domain/tos-region";
import {TOSDataSet, TOSDataSetService} from "../domain/tos/tos-domain";
import {map, switchMap} from "rxjs/operators";
import {UpdateService} from "./update.service";

@Injectable({
  providedIn: 'root'
})
export class TOSSearchService {

  private MESSAGE_ID: number = 0;

  private static instance: TOSSearchService;
  static get Instance(): TOSSearchService { return TOSSearchService.instance; }

  private isLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private readonly worker: Worker;
  private readonly workerHandlers: { [key: number]: Subject<any> } = {};

  private subscriptionLoad: Subscription;

  constructor(private update: UpdateService) {
    TOSSearchService.instance = this;

    this.worker = new Worker('assets/js/lunr.worker.js');
    this.worker.onmessage = this.onWorkerMessage.bind(this);
  }

  get isLoaded$(): Observable<boolean> { return this.isLoaded.asObservable(); }

  public load(region: TOSRegion) {
    if ((!this.isLoaded.getValue())) {
      this.isLoaded.next(false);

      this.subscriptionLoad && this.subscriptionLoad.unsubscribe();
      this.subscriptionLoad = this
        .postMessage(WorkerCommand.LOAD, { region, version: this.update.version(region) })
        .subscribe(value => this.isLoaded.next(true));
    }
  }

  public search(dataset: TOSDataSet, query: string, page: number): Observable<TOSSearchResult> {
    return this
      .postMessage(WorkerCommand.QUERY, { dataset, page, query }).pipe(
        switchMap((result: object[]) => result && result.length && forkJoin(
          result.map(value => {
            let file = value['ref'].split('#')[0];
            let id = +value['ref'].split('#')[1];
            let dataset = Object.values(TOSDataSet).find(value2 => file == value2);

            return TOSDomainService[TOSDataSetService.toProperty(dataset) + 'ById'](id) as Observable<TOSEntity>;
          })
        ) || of([])), // Read more: https://github.com/ReactiveX/rxjs/issues/2816
        map(value => ({ page, response: value }))
      );
  }

  private onWorkerMessage(event: MessageEvent) {
    let message = event.data as WorkerMessage;
    let subject = this.workerHandlers[message.id];
    //console.log('onWorkerMessage', this.dataset, message);

    subject.next(message.payload);
    subject.complete();

    this.workerHandlers[message.id] = null;
  }

  private postMessage(cmd: WorkerCommand, payload?: object): Observable<any> {
    //console.trace('postMessage', this.dataset, cmd);
    let message = {
      cmd,
      id: this.MESSAGE_ID++,
      payload
    };

    this.workerHandlers[message.id] = new Subject();
    this.worker.postMessage(message);

    return this.workerHandlers[message.id].asObservable();
  }

}

export interface TOSSearchResult {
  page: number;
  response: TOSEntity[];
}

enum WorkerCommand {
  LOAD = 'load',
  QUERY = 'query',
}
interface WorkerMessage {
  cmd: WorkerCommand,
  id: number,
  payload?: any
}
