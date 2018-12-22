import {Observable} from "rxjs/internal/Observable";
import {Subject} from "rxjs";
import {TOSDataSet} from "../domain/tos/tos-domain";
import {TOSEntity} from "../domain/tos/tos-entity.model";
import {TOSRegion} from "../domain/tos-region";
import {map} from "rxjs/operators";
import {TOSUrlService} from "./tos-url.service";
import {CRUDPage, CRUDPageResult} from "./CRUD.resolver";


export abstract class CRUDRepository<T extends TOSEntity> {

  private MESSAGE_ID: number = 0;

  private readonly worker: Worker;
  private readonly workerHandlers: { [key: number]: Subject<any> } = {};

  protected constructor(
    private dataset: TOSDataSet,
    private factory: (value: T) => T,
    private groupBy: CRUDGroupBy[],
  ) {
    this.worker = new Worker(document.getElementById('preload-papaparse').getAttribute('href'));
    this.worker.onmessage = this.onMessage.bind(this);
  }

  public load(force: boolean, region: TOSRegion): Observable<boolean> {
    let groupBy = this.groupBy;
    let url = 'assets/data/' + this.dataset.toString() + '.csv';
        url = TOSUrlService.Asset(region, url);

    return this.postMessage(WorkerCommand.LOAD, { groupBy, url });
  }

  public find(page: CRUDPage) : Observable<CRUDPageResult<T>> {
    return this
      .postMessage(WorkerCommand.FIND, { page })
      .pipe(map((value: CRUDPageResult<T>) => {
        return {
          result: value.result.map(value => value && this.factory(value)),
          size: value.size,
        }
      }));
  }
  public findBy(key: boolean | number | string, group: string): Observable<T | T[]> {
    return this
      .postMessage(WorkerCommand.FIND, { key, group })
      .pipe(map((value: CRUDPageResult<T>) => {
        return Array.isArray(value.result)
          ? value.result.map(value => value && this.factory(value))
          : value.result && this.factory(value.result)
      }));
  }

  private onMessage(event: MessageEvent) {
    let message = event.data as WorkerMessage;
    let subject = this.workerHandlers[message.id];
    //console.log('onWorkerMessage', this.dataset, message);

    subject.next(message.payload);
    subject.complete();

    this.workerHandlers[message.id] = null;
  }

  private postMessage<T>(cmd: WorkerCommand, payload?: object): Observable<any> {
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

export interface CRUDGroupBy {
  key: string,
  forceArray?: boolean,
  forceBoolean?: boolean,
}

enum WorkerCommand {
  FIND = 'find',
  LOAD = 'load',
}
interface WorkerMessage {
  cmd: WorkerCommand,
  id: number,
  payload?: any
}
