import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";
import {TOSEntity} from "../../shared/domain/tos/entity/tos-entity.model";
import {CRUDPage, CRUDResolver} from "../../shared/service/CRUD.resolver";
import {Filter} from "../../shared/directives/filter.directive";
import {Sort} from "../../shared/directives/sort.directive";
import {EntityListFilter} from "../entity-filter/entity-list-filter.component";

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnDestroy, OnInit {
  readonly TOSListTableColumnType = TOSListTableColumnType;

  config: TOSListConfiguration;

  data: TOSEntity[];
  dataSize: number;
  subscription: Subscription;

  page: number;
  pageSize: number = CRUDResolver.PAGE_SIZE;

  pageFilter: Filter[];
  pageSort: Sort;

  toggleFilter: boolean = false;
  tooltip: TOSEntity;

  constructor(private route: ActivatedRoute, private router: Router) {}

  private reload() {
    let params = {};
      params[CRUDResolver.PARAM_FILTER] = this.pageFilter ? this.pageFilter.join(';') : null;
      params[CRUDResolver.PARAM_PAGE] = this.page;
      params[CRUDResolver.PARAM_SORT] = this.pageSort;

    this.toggleFilter = false;
    this.tooltip = null;
    this.router.navigate(['.'], { fragment: 'top', queryParams: params, relativeTo: this.route })
  }

  ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : null;
  }

  ngOnInit() {
    this.subscription = this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.config = this.route.snapshot.data.configuration as TOSListConfiguration;

      let response = this.route.snapshot.data.response as CRUDPage<TOSEntity>;
      this.data = response.items;
      this.dataSize = response.size;

      this.page = +params.get(CRUDResolver.PARAM_PAGE) || 1;
      this.pageSort = Sort.valueOf(params.get(CRUDResolver.PARAM_SORT)) || Sort.default(this.config);
      this.pageFilter = (params.get(CRUDResolver.PARAM_FILTER) || '').split(';')
        .map(filter => Filter.valueOf(filter))
        .filter((filter) => filter);
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
  transformLink?: (value: any) => TOSEntity
  transformValue?: (value: any) => any
}

export enum TOSListTableColumnType {
  BADGE,
  ICON,
  ICON_LINK,
  ICON_LINK_VALUE,
  TEXT,
  TEXT_MULTILINE,
  TEXT_NUMBER,
}
