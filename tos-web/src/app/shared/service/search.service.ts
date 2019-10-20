import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from "@angular/common/http";
import {TOSUrlService} from "./tos-url.service";
import {TOSLanguageService} from "../domain/tos-language";
import {ReplaySubject} from "rxjs";
import {filter, take} from "rxjs/operators";
import {
  FlexSearchEntry,
  FlexSearchPageable,
  FlexSearchService
} from "../../../../../tos-search/src/service/flexsearch.service";
import {V2TOSDataSet} from "../domain/tos-dataset";
import {LUAService} from "./lua.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private index: any;
  private index$complete: ReplaySubject<boolean> = new ReplaySubject(1);
  private index$progress: ReplaySubject<number> = new ReplaySubject(1);
  private index$total: ReplaySubject<number> = new ReplaySubject(1);

  constructor(
    private http: HttpClient,
    private lua: LUAService,
  ) {
    this.lua.complete$.subscribe(value => this.initialize());
  }

  get complete$() { return this.index$complete.pipe(filter(value => value), take(1)) }
  get progress$() { return this.index$progress.asObservable() }
  get total$() { return this.index$total.pipe(take(1)) }

  public find(dataset: V2TOSDataSet, pageable: FlexSearchPageable<FlexSearchEntry>) {
    return FlexSearchService.indexWhere(this.index, dataset, pageable);
  }

  public findByName() {

  }

  private initialize() {
    this.index$progress.next(0);
    this.index$total.next(100);

    this.http
      .request(new HttpRequest('GET', TOSUrlService.AssetRegion(`search/${ TOSLanguageService.toUrl() }.json.js`), { reportProgress: true }))
      .subscribe(event => {
        switch (event.type) {
          case HttpEventType.DownloadProgress:
            this.index$progress.next(Math.round(100 * event.loaded / event.total));
            break;
          case HttpEventType.Response:
            this.index = FlexSearchService.indexImport(FlexSearchService.index(TOSLanguageService.get()), event.body as object);

            /*
            // Test
            let results;

            results = FlexSearchService.indexSearch(this.index, 'onion'); debugger;
            results = FlexSearchService.indexSearch(this.index, 'kep'); debugger;
             */

            this.index$complete.next(true);
            break;
        }
      });
  }

}

