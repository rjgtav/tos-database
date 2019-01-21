import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {ITOSDomainRepository, TOSDataSet} from "./tos-domain";
import {TOSUrlService} from "../../service/tos-url.service";
import {TOSRegion, TOSRegionService} from "../tos-region";
import {CRUDPage, CRUDPageResult} from "../../service/CRUD.resolver";
import {map} from "rxjs/operators";
import {TOSAttribute} from "./attribute/tos-attribute.model";
import {TOSBook} from "./item/book/tos-book.model";
import {TOSCard} from "./item/card/tos-card.model";
import {TOSCollection} from "./item/collection/tos-collection.model";
import {TOSCube} from "./item/cube/tos-cube.model";
import {TOSEquipment, TOSEquipmentSet} from "./item/equipment/tos-equipment.model";
import {TOSGem} from "./item/gem/tos-gem.model";
import {TOSItem} from "./item/tos-item.model";
import {TOSJob} from "./job/tos-job.model";
import {TOSMap} from "./map/tos-map.model";
import {TOSMonster} from "./monster/tos-monster.model";
import {TOSRecipe} from "./item/recipe/tos-recipe.model";
import {TOSSkill} from "./skill/tos-skill.model";

@Injectable({
  providedIn: 'root'
})
export class TOSDomainRepository implements ITOSDomainRepository {

  public readonly config = {
    'attributes': {
      factory:            json => new TOSAttribute(json),
      schema:             { primaryKey: '$ID', indexes: ['$ID_NAME'] },
    },
    'books': {
      factory:            json => new TOSBook(json),
      schema:             { primaryKey: '$ID' },
    },
    'cards': {
      factory:            json => new TOSCard(json),
      schema:             { primaryKey: '$ID' },
    },
    'collections': {
      factory:            json => new TOSCollection(json),
      schema:             { primaryKey: '$ID' },
    },
    'cubes': {
      factory:            json => new TOSCube(json),
      schema:             { primaryKey: '$ID' },
    },
    'equipment': {
      factory:            json => new TOSEquipment(json),
      schema:             { primaryKey: '$ID' },
    },
    'equipment-sets': {
      factory:            json => new TOSEquipmentSet(json),
      schema:             { primaryKey: '$ID' },
    },
    'gems': {
      factory:            json => new TOSGem(json),
      schema:             { primaryKey: '$ID' },
    },
    'items': {
      factory:            json => new TOSItem(TOSDataSet.ITEMS, json),
      schema:             { primaryKey: '$ID' },
    },
    'jobs': {
      factory:            json => new TOSJob(json),
      schema:             { primaryKey: '$ID', indexes: ['$ID_NAME', 'JobTree', 'IsStarter'] },
    },
    'maps': {
      factory:            json => new TOSMap(json),
      schema:             { primaryKey: '$ID' },
    },
    'monsters': {
      factory:            json => new TOSMonster(json),
      schema:             { primaryKey: '$ID' },
    },
    'recipes': {
      factory:            json => new TOSRecipe(json),
      schema:             { primaryKey: '$ID' },
    },
    'skills': {
      factory:            json => new TOSSkill(json),
      schema:             { primaryKey: '$ID', indexes: ['$ID_NAME', 'Link_Job'] },
    }
  };

  private MESSAGE_DEXIE_ID: number = 0;
  private MESSAGE_PAPAPARSE_ID: number = 0;

  // Note: we initialize workers later so the Service Worker can intercept the call
  private workerDexie: Worker;
  private workerPapaparse: Worker;
  private readonly workerDexieHandler: { [key: number]: Subject<object> } = {};
  private readonly workerPapaparseHandler: { [key: number]: Subject<object> } = {};

  constructor() {
    this.onPapaparseMessage = this.onPapaparseMessage.bind(this);
    this.onDexieMessage = this.onDexieMessage.bind(this);
  }

  find(dataset: TOSDataSet, page: CRUDPage) {
    return this
      .postDexieMessage(WorkerDexieCommand.FIND, { dataset, region: TOSRegionService.get(), page })
      .pipe(map((value: CRUDPageResult<any>) => {
        return {
          result: value.result.map(value => this.config[dataset].factory(value)),
          size: value.size,
        }
      }));
  }
  findByIndex(dataset: TOSDataSet, key: string, value: number | string, forceSingle?: boolean) {
    return this
      .postDexieMessage(WorkerDexieCommand.FIND_BY_INDEX, { dataset, region: TOSRegionService.get(), key, value })
      .pipe(
        map((value: CRUDPageResult<any>) => value.result.map(value => this.config[dataset].factory(value))),
        map((value) => forceSingle ? value[0] : value)
      );
  }
  load(dataset: TOSDataSet, region: TOSRegion) {
    return this.postPapaparseMessage(WorkerPapaparseCommand.LOAD, dataset, {
        region,
        schema: this.config[dataset].schema,
      });
  }

  private onDexieMessage(event: MessageEvent) {
    let message = event.data as WorkerDexieMessage;

    let handler = this.workerDexieHandler[message.id] as Subject<object>;
        handler.next(message.payload);
        handler.complete();

    delete this.workerDexieHandler[message.id];
  }
  private onPapaparseMessage(event: MessageEvent) {
    let message = event.data as WorkerPapaparseMessage;

    let handler = this.workerPapaparseHandler[message.id] as Subject<object>;
        handler.next(message.payload);
        handler.complete();

    delete this.workerPapaparseHandler[message.id];
  }

  private postDexieMessage(cmd: WorkerDexieCommand, payload?: object) {
    let id = this.MESSAGE_DEXIE_ID ++;
    let message: WorkerDexieMessage = { cmd, id, payload };

    let subject = this.workerDexieHandler[id] = new Subject();
    let worker = this.workerDexie = this.workerDexie || new Worker(TOSUrlService.WORKER_DEXIE());
        worker.onmessage = this.onDexieMessage;
        worker.postMessage(message);

    return subject.asObservable();
  }
  private postPapaparseMessage(cmd: WorkerPapaparseCommand, dataset: TOSDataSet, payload?: object): Observable<object> {
    let id = this.MESSAGE_PAPAPARSE_ID ++;
    let message: WorkerPapaparseMessage = { cmd, dataset, id, payload };

    let subject = this.workerPapaparseHandler[id] = new Subject();
    let worker = this.workerPapaparse = this.workerPapaparse || new Worker(TOSUrlService.WORKER_PAPAPARSE());
        worker.onmessage = this.onPapaparseMessage;
        worker.postMessage(message);

    return subject.asObservable();
  }

}

enum WorkerDexieCommand { FIND = 'find', FIND_BY_INDEX = 'findByIndex' }
interface WorkerDexieMessage {
  cmd: WorkerDexieCommand;
  id: number;
  payload?: object;
}

enum WorkerPapaparseCommand { LOAD = 'load' }
interface WorkerPapaparseMessage {
  cmd: WorkerPapaparseCommand;
  dataset: string;
  id: number;
  payload?: object;
}
