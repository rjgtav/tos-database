import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TOSUrlService} from "./tos-url.service";
import {filter, map, take} from "rxjs/operators";
import {TOSLanguageService} from "../domain/tos-language";
import {TOSRegionService} from "../domain/tos-region";
import {InstallService} from "./install.service";

@Injectable({
  providedIn: 'root'
})
export class LUAService {

  public static INSTANCE$: LUAService;
  static get INSTANCE(): LUAService { return LUAService.INSTANCE$ }

  private lua$complete: ReplaySubject<boolean> = new ReplaySubject(1);
  private lua$progress: ReplaySubject<number> = new ReplaySubject(1);
  private lua$total: ReplaySubject<number> = new ReplaySubject(1);

  private WORKER_NONCE: number = 0;
  private worker: Worker;
  private workerHandler: { [key: number]: Subject<object> } = {};

  constructor(
    private http: HttpClient,
    private install: InstallService,
  ) {
    LUAService.INSTANCE$ = this;

    this.install.complete$.subscribe(value => this.initialize());

    this.onWorkerMessage = this.onWorkerMessage.bind(this);
  }

  get complete$() { return this.lua$complete.pipe(filter(value => value), take(1)) }
  get progress$() { return this.lua$progress.asObservable() }
  get total$() { return this.lua$total.pipe(take(1)) }

  public call(functionName: string, functionArgsOriginal: any[]): Observable<any> {
    for (let value of functionArgsOriginal)
      if (value == null)
        throw new Error('json_imc.encode() doesnt support nulls, therefore we cant send them');

    // Note: if this ever fails saying that it cannot clone an object, make sure that I'm not sending any Observable/Subject
    let functionArgs = functionArgsOriginal.map(value => value.toJSON ? value.toJSON() : value);

    return this
      .postMessage(WorkerCommand.CALL, { functionName, functionArgs })
      .pipe(map((result: { args: any[], result: any[] }) => {
        // In case LUA updated any of the objects we just sent, apply those changes (as the worker sends a copy and not the actual reference)
        result.args
          .filter(value => value.constructor === Object)
          .forEach((value, i) => Object.assign(functionArgsOriginal[i], value));

        return result.result.length > 1
          ? result.result
          : result.result[0];
      }));
  }

  private initialize() {
    this.worker = new Worker(TOSUrlService.AssetWorker('lua.worker.js'));
    this.worker.onmessage = this.onWorkerMessage;

    this.lua$progress.next(0);
    this.lua$total.next(100);
    this.postMessage(WorkerCommand.LOAD, {
          language: TOSLanguageService.toUrl(),
          region: TOSRegionService.toUrl(),
          url: TOSUrlService.AssetRegion('lua/lua.wasm.js')
        })
        .subscribe(value => this.lua$complete.next(true));
  }

  private onWorkerMessage(event: MessageEvent) {
    let handler;
    let message = event.data as WorkerMessage;

    switch (message.cmd) {
      case WorkerCommand.LOAD_PROGRESS:
        this.lua$progress.next(Math.round(100 * message.payload['progress']));
        break;
      default:
        handler = this.workerHandler[message.nonce] as Subject<object>;
        handler.next(message.payload);
        handler.complete();

        delete this.workerHandler[message.nonce];
        break;
    }
  }

  private postMessage(cmd: WorkerCommand, payload?: object) {
    let nonce = this.WORKER_NONCE ++;
    let message: WorkerMessage = { cmd, nonce, payload };

    let subject = this.workerHandler[nonce] = new Subject();
    let worker = this.worker;
        worker && worker.postMessage(message);

    return subject.asObservable();
  }

}

enum WorkerCommand {
  CALL = 'call',
  LOAD = 'load',
  LOAD_PROGRESS = 'loadProgress',
}
interface WorkerMessage {
  cmd: WorkerCommand;
  nonce: number;
  payload?: object;
}
