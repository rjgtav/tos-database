import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";
import {TOSEntity, TOSEntityLink} from "../../shared/domain/tos/entity/tos-entity.model";
import {CRUDResolver} from "../../shared/service/CRUD.resolver";
import {Filter} from "../../shared/directives/filter.directive";
import {Sort} from "../../shared/directives/sort.directive";
import {EntityListFilter} from "../entity-filter/entity-list-filter.component";
import {TOSMonsterRank} from "../../shared/domain/tos/monster/tos-monster.model";

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnDestroy, OnInit {
  readonly TOSListTableColumnType = TOSListTableColumnType;

  $config: TOSListConfiguration;

  data: TOSEntity[];
  dataSize: number;
  subscriptionRouter: Subscription;

  page: number;
  pageSize: number = CRUDResolver.PAGE_SIZE;

  pageFilter: Filter[];
  pageSort: Sort;

  toggleFilter: boolean = false;
  tooltip: TOSEntity;

  search: boolean;
  searchText: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  private reload() {
    let params = {};
      params[CRUDResolver.PARAM_FILTER] = this.pageFilter ? this.pageFilter.join(';') : null;
      params[CRUDResolver.PARAM_PAGE] = this.page;
      params[CRUDResolver.PARAM_SEARCH] = this.searchText;
      params[CRUDResolver.PARAM_SORT] = this.search ? null : this.pageSort;

    this.toggleFilter = false;
    this.tooltip = null;
    this.router.navigate(['.'], { fragment: 'table', queryParams: params, relativeTo: this.route })
  }

  ngOnDestroy() {
    this.subscriptionRouter ? this.subscriptionRouter.unsubscribe() : null;
  }

  ngOnInit() {
    this.subscriptionRouter = this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.$config = this.route.snapshot.data.configuration as TOSListConfiguration;

      this.data = this.route.snapshot.data.response.items as TOSEntity[];
      this.dataSize = this.route.snapshot.data.response.size;

      this.page = +params.get(CRUDResolver.PARAM_PAGE) || 1;
      this.pageSort = Sort.valueOf(params.get(CRUDResolver.PARAM_SORT)) || Sort.default(this.$config);
      this.pageFilter = (params.get(CRUDResolver.PARAM_FILTER) || '').split(';')
        .map(filter => Filter.valueOf(filter))
        .filter((filter) => filter);

      this.searchText = params.get(CRUDResolver.PARAM_SEARCH) || null;
      this.search = this.search || (this.searchText || '').length > 0;
    });
  }

  onFilterChange(filter: Filter[]) {
    if (this.pageFilter === filter) return;

    this.page = 1;
    this.pageFilter = filter;
    this.pageSort = null;
    this.reload();
  }

  onPageChange(page: number) {
    this.page = page;
    this.reload();
  }

  onSearchChange(searchText: string) {
    this.page = 1;
    this.searchText = searchText;
    this.search = (searchText || '').length > 0;
    this.reload();
  }
  onSearchToggle() {
    this.page = 1;
    this.search = !this.search;
    this.searchText = null;

    this.reload();
  }

  onSortChange(sort: Sort) {
    this.page = 1;
    this.pageSort = sort;

    this.reload();
  }

}

export interface TOSListConfiguration {
  filter?: EntityListFilter[]

  sortColumn: string
  tableColumns: TOSListTableColumn[]
}

interface TOSListTableColumn {
  value: string
  type: TOSListTableColumnType
  label?: string

  isNotMobile?: boolean
  isNotTablet?: boolean
  isWide?: boolean

  transformColor?: (value: any) => string
  transformIcon?: (value: any) => string
  transformLink?: (value: any) => TOSEntityLink
  transformValue?: (value: any) => number
}

export enum TOSListTableColumnType {
  BADGE,
  ICON,
  ICON_LINK,
  ICON_LINK_VALUE,
  TEXT,
  TEXT_NUMBER,
}
