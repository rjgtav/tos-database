import {Injectable} from '@angular/core';
import {TranslateService as TranslateServiceAngular} from '@ngx-translate/core';
import {ReplaySubject} from "rxjs";
import {filter, take} from "rxjs/operators";
import {SearchService} from "./search.service";
import {HttpClient, HttpEventType, HttpRequest} from "@angular/common/http";
import {TOSUrlService} from "./tos-url.service";
import {TOSLanguageService} from "../domain/tos-language";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private translate$complete: ReplaySubject<boolean> = new ReplaySubject(1);
  private translate$progress: ReplaySubject<number> = new ReplaySubject(1);
  private translate$total: ReplaySubject<number> = new ReplaySubject(1);

  constructor(
    private http: HttpClient,
    private search: SearchService,
    private translate: TranslateServiceAngular,
  ) {
    this.search.complete$.subscribe(value => this.initialize());
  }

  get complete$() { return this.translate$complete.pipe(filter(value => value), take(1)) }
  get progress$() { return this.translate$progress.asObservable() }
  get total$() { return this.translate$total.pipe(take(1)) }

  private initialize() {
    this.translate$progress.next(0);
    this.translate$total.next(100);

    // TODO: update to angular 8?
    // TODO: update backend to also use the new region only schema
    // TODO: very high ram usage.. maybe should store this somewhere

    this.http
      .request(new HttpRequest('GET', TOSUrlService.AssetRegion(`translation/${ TOSLanguageService.toUrl() }.json.js`), { reportProgress: true }))
      .subscribe(event => {
        switch (event.type) {
          case HttpEventType.DownloadProgress:
            this.translate$progress.next(Math.round(100 * event.loaded / event.total));
            break;
          case HttpEventType.Response:
            this.translate.setTranslation(TOSLanguageService.toUrl(), event.body as object);
            this.translate$complete.next(true);
            break;
        }
      });
  }

}
