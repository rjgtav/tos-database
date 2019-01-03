import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {ITOSDomainRepository, TOSDataSet} from "./tos-domain";
import {TOSUrlService} from "../../service/tos-url.service";
import {TOSRegion} from "../tos-region";
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
import {TOSRegionService} from "../../service/tos-region.service";
import {UpdateService} from "../../service/update.service";

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

  private MESSAGE_ID: number = 0;
  private region: TOSRegion;

  private readonly workerDexie: Worker = new Worker(TOSUrlService.WORKER_DEXIE());
  private readonly workerDexieHandler: { [key: number]: Subject<object> } = {};
  private readonly workerPapaparse: { [key in TOSDataSet]?: Worker } = {};
  private readonly workerPapaparseHandler: { [key in TOSDataSet]?: Subject<object> } = {};

  constructor(private update: UpdateService) {
    TOSRegionService.Region$.subscribe(value => this.region = value);

    this.onPapaparseMessage = this.onPapaparseMessage.bind(this);
    this.onDexieMessage = this.onDexieMessage.bind(this);
  }

  find(dataset: TOSDataSet, page: CRUDPage) {
    return this
      .postDexieMessage(WorkerDexieCommand.FIND, { dataset, region: this.region, page })
      .pipe(map((value: CRUDPageResult<any>) => {
        return {
          result: value.result.map(value => this.config[dataset].factory(value)),
          size: value.size,
        }
      }));
  }
  findByIndex(dataset: TOSDataSet, key: string, value: number | string, forceSingle?: boolean) {
    return this
      .postDexieMessage(WorkerDexieCommand.FIND_BY_INDEX, { dataset, region: this.region, key, value })
      .pipe(
        map((value: CRUDPageResult<any>) => value.result.map(value => this.config[dataset].factory(value))),
        map((value) => forceSingle ? value[0] : value)
      );
  }
  load(dataset: TOSDataSet, region: TOSRegion) {
    return this.workerPapaparseHandler[dataset]
      ? this.workerPapaparseHandler[dataset].asObservable()
      : this.postPapaparseMessage(WorkerPapaparseCommand.LOAD, dataset, {
        region,
        schema: this.config[dataset].schema,
        version: this.update.version(this.region)
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

    let handler = this.workerPapaparseHandler[message.dataset] as Subject<object>;
        handler.next(message.payload);
        handler.complete();

    let worker = this.workerPapaparse[message.dataset] as Worker;
        worker.onmessage = null;
        worker.terminate();

    delete this.workerPapaparseHandler[message.dataset];
    delete this.workerPapaparse[message.dataset];
  }

  private postDexieMessage(cmd: WorkerDexieCommand, payload?: object) {
    let id = this.MESSAGE_ID ++;
    let message: WorkerDexieMessage = { cmd, id, payload };

    let subject = this.workerDexieHandler[id] = new Subject();
    let worker = this.workerDexie
        worker.onmessage = this.onDexieMessage;
        worker.postMessage(message);

    return subject.asObservable();
  }
  private postPapaparseMessage(cmd: WorkerPapaparseCommand, dataset: TOSDataSet, payload?: object): Observable<object> {
    let message: WorkerPapaparseMessage = { cmd, dataset, payload };

    let subject = this.workerPapaparseHandler[dataset] = new Subject();
    let worker = this.workerPapaparse[dataset] = new Worker(TOSUrlService.WORKER_PAPAPARSE());
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
  payload?: object;
}
