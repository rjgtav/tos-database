import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";
import {TOSEntity} from "../../shared/domain/tos/entity/tos-entity.model";
import {CRUDResolver} from "../../shared/service/CRUD.resolver";
import {Filter} from "../../shared/directives/filter.directive";
import {Sort, SortOrder} from "../../shared/directives/sort.directive";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnDestroy, OnInit {
  TOSListTableType = TOSListTableType;

  $config: TOSListConfiguration;

  data: TOSEntity[];
  dataSize: number;
  subscriptionRouter: Subscription;

  page: number;
  pageSize: number = CRUDResolver.PAGE_SIZE;

  pageFilter: Filter;
  pageSort: Sort;

  toggleFilter: boolean = false;
  tooltip: TOSEntity;

  search: boolean;
  searchText: string;

  @ViewChild('searchInputMobile')
  searchInputMobile: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router) {}

  private reload() {
    let params = {};
      params[CRUDResolver.PARAM_FILTER] = this.search ? null : this.pageFilter ? this.pageFilter.toString() : null;
      params[CRUDResolver.PARAM_PAGE] = this.page;
      params[CRUDResolver.PARAM_SEARCH] = this.searchText;
      params[CRUDResolver.PARAM_SORT] = this.search ? null : this.pageSort;

    this.toggleFilter = false;
    this.tooltip = null;
    this.router.navigate(['.'], { queryParams: params, relativeTo: this.route })
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
      this.pageSort = Sort.valueOf(params.get(CRUDResolver.PARAM_SORT)) || new Sort(this.$config.sortColumn, SortOrder.ASC);
      this.pageFilter = Filter.valueOf(params.get(CRUDResolver.PARAM_FILTER)) || null;
      this.searchText = params.get(CRUDResolver.PARAM_SEARCH) || null;
      this.search = this.search || (this.searchText || '').length > 0;
    });
  }

  onFilterChange(filter: Filter) {
    if (this.pageFilter == filter) return;
    if (this.pageFilter != null && filter != null && filter.value == this.pageFilter.value) return;

    this.page = this.pageFilter != null && filter != null && this.pageFilter.toString() == filter.toString() ? this.page : 1;
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

    if (this.search)
      setTimeout(() => this.searchInputMobile.nativeElement.focus(), 0);

    this.reload();
  }

  onSortChange(sort: Sort) {
    this.page = 1;
    this.pageSort = sort;

    this.reload();
  }

}

export interface TOSListConfiguration {
  filterColumn?: string
  filterGroups?: TOSListFilterGroup[]

  sortColumn: string

  tableColumns: TOSListTableColumn[]
}

interface TOSListFilter {
  toString(): string
}
interface TOSListFilterGroup {
  label: string,
  values: TOSListFilter[]
}

interface TOSListTableColumn {
  value: string
  type: TOSListTableType
  class?: string
  label?: string
  style?: string
  transform?: (value: any) => string
  width?: number
}

export enum TOSListTableType {
  BADGE,
  ICON,
  TEXT,
}
