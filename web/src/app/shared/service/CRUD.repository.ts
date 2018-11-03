import {Observable} from "rxjs/internal/Observable";
import {Comparable} from "../domain/tos/entity/tos-entity.model";
import {Filter} from "../directives/filter.directive";
import {Sort, SortOrder} from "../directives/sort.directive";
import {TOSRegionService} from "./tos-region.service";
import {Subscriber} from "rxjs";


export abstract class CRUDRepository<T extends Comparable> {

  private data: T[] = null;
  private dataById: { [id: number] : T; } = null;

  protected constructor(private options: TOSRepositoryOptions<T>) {
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
  }

  public load(force: boolean = false): Observable<T[]> {
    let complete = (subscriber: Subscriber<T[]>) => {
      if (this.options.loadComplete)
        this.data = this.options.loadComplete(this.data);

      subscriber.next(this.data);
      subscriber.complete();
    };
    let step = (results) => {
      let entry: T = this.options.loadStep(results.data[0]);
      this.data.push(entry);
      this.dataById[entry[this.options.id]] = entry;
    };

    this.data = force ? [] : this.data || [];
    this.dataById = force ? {} : this.dataById || {};

    return this.data.length
      ? Observable.create(complete)
      : Observable.create(subscriber => {
        this.data = force ? [] : this.data || [];
        this.dataById = force ? {} : this.dataById || {};
        let path = (location.href.indexOf('github') > 0 ? '/tos-database' : '') + this.options.path;
            path = path.replace('data/', 'data' + TOSRegionService.RegionUrl(''));

        window['Papa']['SCRIPT_PATH'] = 'assets/js/papaparse.min.js';
        window['Papa'].parse(path, {
          download: true,
          header: true,
          skipEmptyLines: true,
          worker: true,
          complete: () => complete(subscriber),
          step,
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

}

interface TOSRepositoryOptions<T> {
  id: string;
  path: string;
  searchKeys: string[];
  loadComplete?: (data: T[]) => T[];
  loadStep: (row: T) => T;
}
