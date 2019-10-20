import {HttpClient} from "@angular/common/http";
import {Observable, ReplaySubject} from "rxjs";
import {TOSUrlService} from "../../service/tos-url.service";
import {TOSRegionService} from "../tos-region";
import {FlexSearchEntry} from "../../../../../../tos-search/src/service/flexsearch.service";
import {ITOSEntityV2} from "./tos-domain";

export class V2TOSEntityProxy<ENTITY extends ITOSEntityV2> implements ITOSEntityV2 {

  ClassID: number;
  ClassName: string;
  Name: string;

  __Entry_Created: Date;
  __Entry_Updated: Date;

  private $proxy: ReplaySubject<ENTITY>;

  constructor(
    private $entry: FlexSearchEntry,
    private $factory: (json: object) => ENTITY,
    private $http: HttpClient,
  ) {
    Object
      .keys(this.$entry)
      .filter(key => !key.startsWith('$'))
      .forEach(key => this[key] = this.$entry[key]);
  }

  get(): Observable<ENTITY> {
    if (this.$proxy == null) {
      this.$proxy = new ReplaySubject(1);
      this.$http
        .get<object>(TOSUrlService.Api(`data/${ TOSRegionService.toUrl() }/${ this.$entry.$table }/${ this.$entry.ClassID }.js`))
        .subscribe(value => this.$proxy.next(this.$factory(value)));
    }

    return this.$proxy.asObservable();
  }

}
