import {ActivatedRouteSnapshot, Params, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {V2TOSEntityRepository} from "../../shared/domain/tos/v2-tos-entity.repository";
import {
  FlexSearchEntry,
  FlexSearchPageable,
  FlexSearchPageable$SortOrder
} from "../../../../../tos-search/src/service/flexsearch.service";
import {EntityListFilterV2} from "../entity-list-filter-v2/entity-list-filter-v2.component";
import {SearchService} from "../../shared/service/search.service";
import {V2TOSEntityProxy} from "../../shared/domain/tos/v2-tos-entity.proxy";
import {EntityTableV2Column} from "../../shared/components/entity-table-v2/entity-table-v2.component";
import {ITOSEntityV2} from "../../shared/domain/tos/tos-domain";
import {EntityTooltipV2} from "../../shared/components/entity-tooltip-v2/entity-tooltip-v2.model";
import {EntityDetailV2} from "../entity-detail-v2/entity-detail-v2.model";

const PARAM_ID = 'id';

export abstract class TOSEntityResolver<ENTITY extends ITOSEntityV2> implements Resolve<EntityDetailV2$Deprecated<ENTITY> | EntityListV2<ENTITY>> {

  public static QUERY_PARAM_PAGE = 'Page';
  public static QUERY_PARAM_SEARCH = 'Search';
  public static QUERY_PARAM_SORT = 'Sort';
  public static QUERY_PARAM_SORT_ORDER = 'SortOrder';

  protected constructor(
    protected repository: V2TOSEntityRepository<ENTITY>,
    protected router: Router,
    protected search: SearchService,
  ) {}

  abstract listColumns(): EntityTableV2Column<ENTITY>[];
  abstract listFilter(): EntityListFilterV2<ENTITY>[];
  abstract listFilterHeader(): EntityListFilterV2<ENTITY>;
  abstract listTitle(): string;

  abstract detailInfo(): EntityDetailV2<ENTITY>[];
  abstract tooltip(): EntityTooltipV2<ENTITY>[];

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<EntityDetailV2$Deprecated<ENTITY> | EntityListV2<ENTITY>> {
    return route.paramMap.has(PARAM_ID)
      ? this.resolveDetail(route, state)
      : this.resolveList(route, state)
  }

  private async resolveDetail(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<EntityDetailV2$Deprecated<ENTITY>> {
    // Initialize detail
    let detail = new EntityDetailV2$Deprecated<ENTITY>();
        detail.entity = await this.repository.findOne(+route.paramMap.get(PARAM_ID));
        detail.info = this.detailInfo();
        detail.tooltip = this.tooltip();

    return detail;
  }

  private async resolveList(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<EntityListV2<ENTITY>> {
    // Initialize columns
    let columns = this.listColumns();

    // Initialize filters
    let filter = this.listFilter();
    let filterHeader = this.listFilterHeader();

    // Initialize list
    let params = route.queryParams;
    let paramsNew: Params = {};

    let list = new EntityListV2(columns, filter, filterHeader, this.listTitle());
        list.paramsImport(params);
        list.paramsExport(paramsNew);

    // In case any parameter was wrong (and thereby changed during the import), re-route
    if (JSON.stringify(params) != JSON.stringify(paramsNew)) {
      this.router.navigate([state.url.split('?')[0]], { queryParams: paramsNew });
      return null;
    }

    list.page = await this.repository.findAll(list.page as FlexSearchPageable<FlexSearchEntry>);

    return list;
  }

}

export class EntityDetailV2$Deprecated<ENTITY extends ITOSEntityV2> {

  entity: V2TOSEntityProxy<ENTITY> | ENTITY;
  info: EntityDetailV2<ENTITY>[];
  tooltip: EntityTooltipV2<ENTITY>[];

  constructor(

  ) {}

}

export class EntityListV2<ENTITY extends ITOSEntityV2> {

  columns: EntityTableV2Column<ENTITY>[];
  filter: EntityListFilterV2<any>[];
  filterHeader: EntityListFilterV2<any>;
  page: FlexSearchPageable<FlexSearchEntry | V2TOSEntityProxy<ENTITY>>;
  title: string;

  constructor(
    columns: EntityTableV2Column<ENTITY>[],
    filter: EntityListFilterV2<any>[],
    filterHeader: EntityListFilterV2<any>,
    title: string,
  ) {
    this.columns = columns;
    this.filter = filter;
    this.filterHeader = filterHeader;
    this.title = title;
  }

  paramsImport(params: Params) {
    this.filterHeader && this.filterHeader.paramsImport(params);
    this.filter && this.filter.forEach(filter => filter.paramsImport(params));

    if (this.page) {
      this.page.page = params[TOSEntityResolver.QUERY_PARAM_PAGE] || this.page.page;
      this.page.search = params[TOSEntityResolver.QUERY_PARAM_SEARCH] || this.page.search;
      this.page.sort.column = params[TOSEntityResolver.QUERY_PARAM_SORT] || this.page.sort.column;
      this.page.sort.order = params[TOSEntityResolver.QUERY_PARAM_SORT_ORDER] || this.page.sort.order;
    } else {
      this.page = {};
      this.page.filter = (value: FlexSearchEntry) => {
        if (this.filterHeader && !this.filterHeader.filter(value))
          return false;
        if (this.filter && !!this.filter.find(filter => !filter.filter(value)))
          return false;

        return true;
      };

      this.page.page = params[TOSEntityResolver.QUERY_PARAM_PAGE] || 1;
      this.page.search = params[TOSEntityResolver.QUERY_PARAM_SEARCH] || undefined;
      this.page.sort = {
        column: params[TOSEntityResolver.QUERY_PARAM_SORT] || this.columns.find(value => value.label.length > 0).config.key,
        order: params[TOSEntityResolver.QUERY_PARAM_SORT_ORDER] || FlexSearchPageable$SortOrder.ASC,
      };
    }
  }

  paramsExport(params?: Params): Params {
    params = params || {};
    params[TOSEntityResolver.QUERY_PARAM_PAGE] = this.page && this.page.page;
    params[TOSEntityResolver.QUERY_PARAM_SEARCH] = this.page && this.page.search;
    params[TOSEntityResolver.QUERY_PARAM_SORT] = this.page && this.page.sort.column;
    params[TOSEntityResolver.QUERY_PARAM_SORT_ORDER] = this.page && this.page.sort.order;

    this.filterHeader && this.filterHeader.paramsExport(params);
    this.filter && this.filter.forEach(filter => filter.paramsExport(params));

    return params;
  }

}
