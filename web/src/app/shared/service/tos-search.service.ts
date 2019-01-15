import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of, Subject, Subscription} from "rxjs";
import {TOSEntity} from "../domain/tos/tos-entity.model";
import {TOSDomainService} from "../domain/tos/tos-domain.service";
import {TOSRegionService} from "../domain/tos-region";
import {TOSDataSet, TOSDataSetService} from "../domain/tos/tos-domain";
import {map, switchMap} from "rxjs/operators";
import {TOSUrlService} from "./tos-url.service";
import {LoadingService} from "../../shell/loading/loading.service";

@Injectable({
  providedIn: 'root'
})
export class TOSSearchService {

  private MESSAGE_ID: number = 0;

  private static instance: TOSSearchService;
  static get Instance(): TOSSearchService { return TOSSearchService.instance; }

  private isLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private worker: Worker; // Note: we initialize it later so the Service Worker can intercept the call
  private readonly workerHandlers: { [key: number]: Subject<any> } = {};

  private subscriptionLoad: Subscription;

  constructor(private loading: LoadingService) {
    TOSSearchService.instance = this;

    this.onWorkerMessage = this.onWorkerMessage.bind(this);

    this.loading.installComplete$.subscribe((value) => this.onInstallComplete(value));
  }

  get isLoaded$(): Observable<boolean> { return this.isLoaded.asObservable(); }

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

  private onInstallComplete(value: boolean) {
    this.isLoaded.next(false);

    this.subscriptionLoad && this.subscriptionLoad.unsubscribe();
    this.subscriptionLoad = this
      .postMessage(WorkerCommand.LOAD, { region: TOSRegionService.get() })
      .subscribe(value => this.isLoaded.next(true));
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

    let subject = this.workerHandlers[message.id] = new Subject();
    let worker = this.worker = this.worker || new Worker(TOSUrlService.WORKER_LUNR());
        worker.onmessage = this.onWorkerMessage;
        worker.postMessage(message);

    return subject.asObservable();
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
