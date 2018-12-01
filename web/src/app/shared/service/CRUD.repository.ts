import {Observable} from "rxjs/internal/Observable";
import {Subscriber} from "rxjs";
import {TOSUrlService} from "./tos-url.service";
import {TOSDataSet} from "../domain/tos/tos-domain";
import {TOSEntity} from "../domain/tos/tos-entity.model";
import {TOSRegion} from "../domain/tos-region";


export abstract class CRUDRepository<T extends TOSEntity> {

  private data: T[];

  protected constructor(private dataset: TOSDataSet) {}

  public load(force: boolean, region: TOSRegion): Observable<boolean> {
    let complete = (result, subscriber: Subscriber<boolean>) => {
      this.data = result.data;

      subscriber.next(true);
      subscriber.complete();
    };

    let data = this.data = force ? [] : this.data || [];
    let path = 'assets/data/' + this.dataset.toString() + '.csv';

    return data.length
      ? Observable.create(complete)
      : Observable.create(subscriber => {
        window['Papa']['SCRIPT_PATH'] = document.getElementById('preload-papaparse').getAttribute('src');
        window['Papa'].parse(TOSUrlService.Asset(region, path), {
          download: true,
          header: true,
          skipEmptyLines: true,
          worker: true,
          complete: (result) => complete(result, subscriber),
        });
      });
  }

  protected get $data(): T[] { return this.data; }

}
