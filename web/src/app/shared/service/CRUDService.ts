import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {Observable} from "rxjs/internal/Observable";
import {map, shareReplay} from "rxjs/operators";

export abstract class CRUDService<T> {
  private $data: Observable<T[]>;

  protected constructor(private http: HttpClient, private papa: PapaParseService, private $path: string) {}

  public findAll(): Observable<T[]> {
    return this.$data = this.$data
      ? this.$data
      : this.http
        .get(this.$path, { responseType: 'text' })
        .pipe(map(data => this.papa.parse(data, { header: true, skipEmptyLines: true }).data as T[]))
        .pipe(map(data => data.sort((t1, t2) => t1['$ID'] - t2['$ID'])))
        .pipe(shareReplay());
  }
}
