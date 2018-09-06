import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {Sort, SortOrder} from "../directives/sort.directive";
import {Filter} from "../directives/filter.directive";
import * as fuzzysort from 'fuzzysort';

export abstract class Comparable {
  $comparators: { [key: string]: (a, b) => -1 | 0 | 1; } = {}
}

export abstract class CRUDService<T extends Comparable> {
  private data: T[] = null;
  private dataById: { [id: number] : T; } = null;

  protected constructor(
    private http: HttpClient,
    private papa: PapaParseService,
    private options: CRUDServiceOptions<T>
  ) {}

  private load(): Observable<T[]> {
    return Observable.create(observable => {
      let complete = () => {
        observable.next(this.data);
        observable.complete();
      };

      if (this.data == null) {
        this.data = [];
        this.dataById = {};

        this.papa.parse(this.options.path, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: complete,
          step: (results, parser) => {
            let entry: T = this.options.step(results.data[0]);
            this.data.push(entry);
            this.dataById[entry[this.options.id]] = entry;
          },
        });
      } else {
        complete();
      }
    });
  }

  public findAll(filter?: Filter[], sort?: Sort): Observable<T[]> {
    return this.load().pipe(map((data) => {
      let sorter = data != null && data[0] != null && sort != null ? data[0].$comparators[sort.column] : null;
          sorter = sorter != null ? sorter : (i, j) => (i < j) ? -1 : (i > j) ? 1 : 0;

      if (filter != null)
        data = data.filter((item) => filter == null || !filter.find(f => !f.filter(item)));
      if (sort != null)
        data = data.sort((a, b) => sorter(a[sort.column], b[sort.column]) * (sort.order == SortOrder.ASC ? 1 : -1));

      return data;
    }));
  }

  public findById(id: number): Observable<T> {
    return this.load().pipe(map((data) => this.dataById[id]));
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

interface CRUDServiceOptions<T> {
  id: string;
  path: string;
  searchKeys: string[];
  step: CRUDServiceStep<T>;
}

interface CRUDServiceStep<T> {
  (row: T): T
}
