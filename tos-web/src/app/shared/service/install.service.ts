import {Injectable} from '@angular/core';
import {TOSUrlService} from "./tos-url.service";
import {environment} from "../../../environments/environment";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {filter, map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InstallService {

  private WORKER_NONCE: number = 0;
  private readonly workerHandler: { [key: number]: Subject<object> } = {};

  private worker: ServiceWorkerContainer;
  private workerInstallComplete: ReplaySubject<boolean> = new ReplaySubject(1);
  private workerInstallProgress: ReplaySubject<number> = new ReplaySubject(1);
  private workerInstallTotal: ReplaySubject<number> = new ReplaySubject(1);
  private workerRegistration: ServiceWorkerRegistration;

  constructor() {
    let enabled = true || environment.production && 'serviceWorker' in navigator;

    if (enabled == false)
      this.workerInstallComplete.next(true);
    else
      navigator.serviceWorker
        .register(TOSUrlService.Url('tos-sw.worker.js'))
        .then(value => {
          this.worker = navigator.serviceWorker;
          this.worker.oncontrollerchange = event => this.onControllerChange(event);
          this.worker.onmessage = event => this.onMessage(event);
          this.workerInstallComplete.next(!!value.active);
          this.workerRegistration = value;
        });
  }

  get complete$(): Observable<boolean> { return this.workerInstallComplete.pipe(filter(value => !!value), take(1)) }
  get progress$(): Observable<number> { return this.workerInstallProgress.asObservable() }
  get total$(): Observable<number> { return this.workerInstallTotal.asObservable() }

  update$check(): Observable<boolean> {
    return this
      .postMessage(WorkerCommand.UPDATE_CHECK)
      .pipe(map(value => !!value));
  }
  update$install() {
    this.postMessage(WorkerCommand.UPDATE_INSTALL);
  }

  private postMessage(cmd: WorkerCommand, payload?: object) {
    let nonce = this.WORKER_NONCE ++;
    let message: WorkerMessage = { cmd, nonce, payload };

    let subject = this.workerHandler[nonce] = new Subject();
    let worker = this.worker;
        worker && worker.controller && worker.controller.postMessage(message);

    return subject.asObservable();
  }

  private onControllerChange(event: Event) {
    console.log('onControllerChange')
    this.workerInstallComplete.next(true);
  }
  private onMessage(event: MessageEvent) {
    let handler;
    let message = event.data as WorkerMessage;

    switch (message.cmd) {
      case WorkerCommand.UPDATE_INSTALL:
        location.reload();
        break;
      case WorkerCommand.INSTALL_COMPLETE:
        this.workerInstallComplete.next(true);
        break;
      case WorkerCommand.INSTALL_PROGRESS:
        let progress = message.payload['progress'];
        let total = message.payload['total'];
        console.log('onWorkerInstallProgress')

        this.workerInstallProgress.next(progress);
        this.workerInstallTotal.next(total);
        break;
      default:
        handler = this.workerHandler[message.nonce];
        handler.next(message.payload);
        handler.complete();

        delete this.workerHandler[message.nonce];
        break;
    }
  }

}

enum WorkerCommand {
  INSTALL_COMPLETE = 'INSTALL_COMPLETE',
  INSTALL_PROGRESS = 'INSTALL_PROGRESS',
  UPDATE_CHECK = 'UPDATE_CHECK',
  UPDATE_INSTALL = 'UPDATE_INSTALL',
}
interface WorkerMessage {
  cmd: WorkerCommand;
  nonce: number;
  payload?: object;
}
