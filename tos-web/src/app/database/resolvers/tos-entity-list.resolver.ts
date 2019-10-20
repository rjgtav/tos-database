import {ActivatedRouteSnapshot, Params, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {V2TOSEntityRepository} from "../../shared/domain/tos/v2-tos-entity.repository";
import {
  FlexSearchEntry,
  FlexSearchPageable,
  FlexSearchPageable$SortOrder
} from "../../../../../tos-search/src/service/flexsearch.service";
import {map, tap} from "rxjs/operators";
import {EntityListFilterV2} from "../entity-list-filter-v2/entity-list-filter-v2.component";
import {SearchService} from "../../shared/service/search.service";
import {V2TOSEntityProxy} from "../../shared/domain/tos/v2-tos-entity.proxy";
import {EntityTableV2Column} from "../../shared/components/entity-table-v2/entity-table-v2.component";
import {ITOSEntityV2} from "../../shared/domain/tos/tos-domain";

export abstract class TOSEntityListResolver<ENTITY extends ITOSEntityV2> implements Resolve<EntityListV2<ENTITY>> {

  public static QUERY_PARAM_PAGE = 'Page';
  public static QUERY_PARAM_SEARCH = 'Search';
  public static QUERY_PARAM_SORT = 'Sort';
  public static QUERY_PARAM_SORT_ORDER = 'SortOrder';

  protected constructor(
    protected repository: V2TOSEntityRepository<ENTITY>,
    protected router: Router,
    protected search: SearchService,
  ) {}

  abstract columns(): EntityTableV2Column<ENTITY>[];
  abstract filter(): EntityListFilterV2<any>[];
  abstract filterHeader(): EntityListFilterV2<any>;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EntityListV2<ENTITY>> | Promise<EntityListV2<ENTITY>> | EntityListV2<ENTITY> {
    // Initialize columns
    let columns = this.columns();

    // Initialize filters
    let filter = this.filter();
    let filterHeader = this.filterHeader();

    // Initialize list
    let params = route.queryParams;
    let paramsNew: Params = {};

    let list = new EntityListV2(columns, filter, filterHeader);
        list.paramsImport(params);
        list.paramsExport(paramsNew);

    // In case any parameter was wrong (and thereby changed during the import), re-route
    if (JSON.stringify(params) != JSON.stringify(paramsNew)) {
      this.router.navigate([state.url.split('?')[0]], { queryParams: paramsNew, replaceUrl: true });
      return null;
    }

    return this.repository.findAll(list.page as FlexSearchPageable<FlexSearchEntry>).pipe(
      map(page => { list.page = page; return list; }),
      tap(value => console.log(value))
    );
  }

}

export class EntityListV2<ENTITY extends ITOSEntityV2> {

  columns: EntityTableV2Column<ENTITY>[];
  filter: EntityListFilterV2<any>[];
  filterHeader: EntityListFilterV2<any>;
  page: FlexSearchPageable<FlexSearchEntry | V2TOSEntityProxy<ENTITY>>;

  constructor(
    columns: EntityTableV2Column<ENTITY>[],
    filter: EntityListFilterV2<any>[],
    filterHeader: EntityListFilterV2<any>,
  ) {
    this.columns = columns;
    this.filter = filter;
    this.filterHeader = filterHeader;
  }

  paramsImport(params: Params) {
    this.filterHeader && this.filterHeader.paramsImport(params);
    this.filter && this.filter.forEach(filter => filter.paramsImport(params));

    if (this.page) {
      this.page.page = params[TOSEntityListResolver.QUERY_PARAM_PAGE] || this.page.page;
      this.page.search = params[TOSEntityListResolver.QUERY_PARAM_SEARCH] || this.page.search;
      this.page.sort.column = params[TOSEntityListResolver.QUERY_PARAM_SORT] || this.page.sort.column;
      this.page.sort.order = params[TOSEntityListResolver.QUERY_PARAM_SORT_ORDER] || this.page.sort.order;
    } else {
      this.page = {};
      this.page.filter = (value: FlexSearchEntry) => {
        if (this.filterHeader && !this.filterHeader.filter(value))
          return false;
        if (this.filter && !!this.filter.find(filter => !filter.filter(value)))
          return false;

        return true;
      };

      this.page.page = params[TOSEntityListResolver.QUERY_PARAM_PAGE] || 1;
      this.page.search = params[TOSEntityListResolver.QUERY_PARAM_SEARCH] || undefined;
      this.page.sort = {
        column: params[TOSEntityListResolver.QUERY_PARAM_SORT] || this.columns.find(value => value.label.length > 0).cell.key,
        order: params[TOSEntityListResolver.QUERY_PARAM_SORT_ORDER] || FlexSearchPageable$SortOrder.ASC,
      };
    }
  }

  paramsExport(params?: Params): Params {
    params = params || {};
    params[TOSEntityListResolver.QUERY_PARAM_PAGE] = this.page && this.page.page;
    params[TOSEntityListResolver.QUERY_PARAM_SEARCH] = this.page && this.page.search;
    params[TOSEntityListResolver.QUERY_PARAM_SORT] = this.page && this.page.sort.column;
    params[TOSEntityListResolver.QUERY_PARAM_SORT_ORDER] = this.page && this.page.sort.order;

    this.filterHeader && this.filterHeader.paramsExport(params);
    this.filter && this.filter.forEach(filter => filter.paramsExport(params));

    return params;
  }

}
