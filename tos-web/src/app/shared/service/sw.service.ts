import {Injectable} from '@angular/core';
import {TOSUrlService} from "./tos-url.service";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SWService {

  private WORKER_NONCE: number = 0;
  private readonly workerHandler: { [key: number]: Subject<object> } = {};

  private workerRegistration: ServiceWorkerRegistration;

  constructor() {
    this.enabled && navigator.serviceWorker
      .register(TOSUrlService.WORKER_SW())
      .then(value => this.workerRegistration = value);
  }

  get enabled(): boolean { return environment.production && 'serviceWorker' in navigator }

  installComplete(): boolean {
    return this.workerRegistration && !!this.workerRegistration.active;
  }

  updateCheck$(): Observable<boolean> {
    return this
      .postMessage(WorkerCommand.UPDATE_CHECK)
      .pipe(map(value => !!value));
  }
  updateInstall() {
    this.postMessage(WorkerCommand.UPDATE_INSTALL);
  }

  private postMessage(cmd: WorkerCommand, payload?: object) {
    let nonce = this.WORKER_NONCE ++;
    let message: WorkerMessage = { cmd, nonce, payload };

    let subject = this.workerHandler[nonce] = new Subject();
    let worker = navigator.serviceWorker;
        worker.onmessage = (event) => this.onMessage(event);
        worker.controller && worker.controller.postMessage(message);

    return subject.asObservable();
  }

  private onMessage(event: MessageEvent) {
    let message = event.data as WorkerMessage;

    let handler = this.workerHandler[message.nonce];
        handler.next(message.payload);
        handler.complete();

    if (message.cmd == WorkerCommand.UPDATE_INSTALL)
      location.reload();
  }

}

enum WorkerCommand {
  UPDATE_CHECK = 'UPDATE_CHECK',
  UPDATE_INSTALL = 'UPDATE_INSTALL',
}
interface WorkerMessage {
  cmd: WorkerCommand;
  nonce: number;
  payload?: object;
}
