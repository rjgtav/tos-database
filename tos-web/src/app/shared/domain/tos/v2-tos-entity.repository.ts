import {SearchService} from "../../service/search.service";
import {HttpClient} from "@angular/common/http";
import {FlexSearchEntry, FlexSearchPageable,} from "../../../../../../tos-search/src/service/flexsearch.service";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {V2TOSDataSet} from "../tos-dataset";
import {V2TOSEntityProxy} from "./v2-tos-entity.proxy";
import {ITOSEntityV2} from "./tos-domain";
import {TOSItemRepositoryV2} from "./item/v2-tos-item.repository";

export abstract class V2TOSEntityRepository<ENTITY extends ITOSEntityV2> {

  public static readonly DATASET: {
    [V2TOSDataSet.ITEMS]: TOSItemRepositoryV2<any>,
  } = {} as any;

  protected constructor(
    private dataset: V2TOSDataSet,
    private http: HttpClient,
    private search: SearchService,
  ) {
    V2TOSEntityRepository.DATASET[dataset] = this;
  }

  protected abstract $factory(json: object): ENTITY;

  // In the end we can...
  // TODO: kill CRUD.resolver
  // TODO: kill tos-domain.service
  // TODO: replace tos-domain.repository with the new one

  findAll(pageable: FlexSearchPageable<FlexSearchEntry>): Observable<FlexSearchPageable<V2TOSEntityProxy<ENTITY>>> {
    return fromPromise((async () => {
      let result: FlexSearchPageable<FlexSearchEntry> = this.search.find(this.dataset, pageable);
      let result2: FlexSearchPageable<V2TOSEntityProxy<ENTITY>> = Object.assign(result, {
        content: result.content.map(entry => new V2TOSEntityProxy<ENTITY>(entry, this.$factory, this.http)),
      });

      return result2;
    })());
  }

}


