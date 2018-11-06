import {Observable} from "rxjs/internal/Observable";
import {Subscriber} from "rxjs";
import {TOSUrlService} from "./tos-url.service";
import {TOSDataSet} from "../domain/tos/tos-domain";
import {TOSDomainService} from "../domain/tos/tos-domain.service";
import {TOSEntity} from "../domain/tos/tos-entity.model";
import {TOSRegion} from "../domain/tos-region";


export abstract class CRUDRepository<T extends TOSEntity> {

  protected constructor(private options: TOSRepositoryOptions<T>) {}

  public load(force: boolean, region: TOSRegion): Observable<boolean> {
    let complete = (subscriber: Subscriber<boolean>) => {
      if (this.options.loadComplete)
        this.data = this.options.loadComplete(data);

      subscriber.next(true);
      subscriber.complete();
    };
    let step = (results) => {
      let entry: T = this.options.loadStep(results.data[0]);
      data.push(entry);
      dataById[entry.$ID] = entry;
    };

    let data = this.data = force ? [] : this.data || [];
    let dataById = this.dataById = force ? {} : this.dataById || {};
    let path = 'assets/data/' + this.options.dataset.toString() + '.csv';

    return data.length
      ? Observable.create(complete)
      : Observable.create(subscriber => {
        window['Papa']['SCRIPT_PATH'] = 'assets/js/papaparse.min.js';
        window['Papa'].parse(TOSUrlService.Asset(region, path), {
          download: true,
          header: true,
          skipEmptyLines: true,
          worker: true,
          complete: () => complete(subscriber),
          step,
        });
      });
  }

  private get data(): T[] { return TOSDomainService[TOSDataSet.toProperty(this.options.dataset)]; }
  private set data(value: T[]) { TOSDomainService[TOSDataSet.toProperty(this.options.dataset)] = value; }
  private get dataById(): { [key: number] : T; } { return TOSDomainService[TOSDataSet.toProperty(this.options.dataset) + 'ById']; }
  private set dataById(value: { [key: number] : T; }) { TOSDomainService[TOSDataSet.toProperty(this.options.dataset) + 'ById'] = value; }

}

interface TOSRepositoryOptions<T> {
  dataset: TOSDataSet;
  loadComplete?: (data: T[]) => T[];
  loadStep: (row: T) => T;
}
