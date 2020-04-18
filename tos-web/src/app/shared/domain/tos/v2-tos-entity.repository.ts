import {SearchService} from "../../service/search.service";
import {HttpClient} from "@angular/common/http";
import {FlexSearchEntry, FlexSearchPageable,} from "../../../../../../tos-search/src/service/flexsearch.service";
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
  protected $proxy(entry: FlexSearchEntry): V2TOSEntityProxy<ENTITY> {
    return new V2TOSEntityProxy(entry, this.$factory, this.http);
  }

  // In the end we can...
  // TODO: kill CRUD.resolver
  // TODO: kill tos-domain.service
  // TODO: replace tos-domain.repository with the new one

  async findAll(pageable: FlexSearchPageable<FlexSearchEntry>): Promise<FlexSearchPageable<V2TOSEntityProxy<ENTITY>>> {
    let result = this.search.find(this.dataset, pageable);
        result.content = result.content.map(entry => this.$proxy(entry)) as any;

    return (result as unknown) as FlexSearchPageable<V2TOSEntityProxy<ENTITY>>;
  }

  async findOne(ClassID: number): Promise<V2TOSEntityProxy<ENTITY>> {
    let pageable: FlexSearchPageable<FlexSearchEntry> = { filter: value => value.ClassID == ClassID, pageSize: 1 };
    let result: FlexSearchPageable<FlexSearchEntry> = this.search.find(this.dataset, pageable);
        result.content = result.content.map(entry => this.$proxy(entry)) as any;

    return (result.content[0] as unknown) as V2TOSEntityProxy<ENTITY>;
  }

}


