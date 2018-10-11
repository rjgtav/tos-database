import {Observable} from "rxjs/internal/Observable";
import * as fuzzysort from 'fuzzysort';
import {Comparable} from "../domain/tos/entity/tos-entity.model";
import {Filter} from "../directives/filter.directive";
import {Sort, SortOrder} from "../directives/sort.directive";
import {isDevMode} from "@angular/core";


export abstract class CRUDRepository<T extends Comparable> {

  private data: T[] = null;
  private dataById: { [id: number] : T; } = null;
  private loader: Observable<T[]>;

  protected constructor(private options: TOSRepositoryOptions<T>) {
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.search = this.search.bind(this);
  }

  public load(): Observable<T[]> {
    let complete = (observable) => {
      observable.next(this.data);
      observable.complete();
    };

    if (this.data != null)
      return Observable.create(complete);

    return this.loader = this.loader || Observable.create(observable => {
      this.data = [];
      this.dataById = {};
      this.options.path = (!isDevMode() ? '/tos-database' : '') + this.options.path;

      window['Papa']['SCRIPT_PATH'] = 'assets/js/papaparse.min.js';
      window['Papa'].parse(this.options.path, {
        download: true,
        header: true,
        skipEmptyLines: true,
        worker: true,
        complete: (results) => complete(observable),
        step: (results, parser) => {
          let entry: T = this.options.loadStep(results.data[0]);
          this.data.push(entry);
          this.dataById[entry[this.options.id]] = entry;
        },
      });
    });
  }

  public findAll(filter?: Filter[], sort?: Sort): T[] {
    let data = this.data;
    let sorter = data && sort ? data[0].$comparators[sort.column] : null;
        sorter = sorter ? sorter : (i, j) => (i < j) ? -1 : (i > j) ? 1 : 0;

    if (filter)
      data = data.filter((item) => !filter || !filter.find(f => !f.filter(item)));
    if (sort)
      data = data.sort((a, b) => sorter(a[sort.column], b[sort.column]) * (sort.order == SortOrder.ASC ? 1 : -1));

    return data;
  }

  public findById($ID: number): T {
    return this.dataById[$ID];
  }

  public search(pattern: string): Observable<T[]> {
    return Observable.create(observable => {
      this.load().subscribe((data) => {
        fuzzysort.goAsync(pattern, data, {
          allowTypo: true,
          keys: this.options.searchKeys,
          limit: 512,
          threshold: -512
        }).then((result) => {
          observable.next(result.map((entry) => entry.obj));
          observable.complete();
        });
      });
    })
  }

}

interface TOSRepositoryOptions<T> {
  id: string;
  path: string;
  searchKeys: string[];
  loadStep: (row: T) => T;
}
