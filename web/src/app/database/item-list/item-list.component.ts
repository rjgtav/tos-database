import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TOSItem, TOSItemType} from "../../shared/domain/tos/item/tos-item.model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";
import {Sort, SortOrder} from "../../shared/directives/sort.directive";
import {Filter} from "../../shared/directives/filter.directive";
import {CRUDResolver} from "../../shared/service/CRUD.resolver";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnDestroy, OnInit {
  TOSItemType = TOSItemType;

  data: TOSItem[];
  dataSize: number;
  subscriptionData: Subscription;
  subscriptionRouter: Subscription;

  page: number;
  pageSize: number = CRUDResolver.PAGE_SIZE;

  pageFilter: Filter;
  pageSort: Sort;

  tooltipItem: TOSItem;

  search: boolean;
  searchText: string;

  @ViewChild('searchInput')
  searchInput: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router) {}

  private reload() {
    let params = {};
      params[CRUDResolver.PARAM_FILTER] = this.search ? null : this.pageFilter.value != this.TOSItemType.$ANY$.toString() ? this.pageFilter.toString() : null;
      params[CRUDResolver.PARAM_PAGE] = this.page;
      params[CRUDResolver.PARAM_SEARCH] = this.searchText;
      params[CRUDResolver.PARAM_SORT] = this.search ? null : this.pageSort;

    this.tooltipItem = null;
    this.router.navigate(['.'], { queryParams: params, relativeTo: this.route })
  }

  ngOnDestroy() {
    this.subscriptionData ? this.subscriptionData.unsubscribe() : null;
    this.subscriptionRouter ? this.subscriptionRouter.unsubscribe() : null;
  }

  ngOnInit() {
    this.subscriptionRouter = this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.data = this.route.snapshot.data.response.items as TOSItem[];
      this.dataSize = this.route.snapshot.data.response.size;

      this.page = +params.get(CRUDResolver.PARAM_PAGE) || 1;
      this.pageSort = Sort.valueOf(params.get(CRUDResolver.PARAM_SORT)) || new Sort('$ID', SortOrder.ASC);
      this.pageFilter = Filter.valueOf(params.get(CRUDResolver.PARAM_FILTER)) || new Filter('Type', TOSItemType.$ANY$.toString());
      this.searchText = params.get(CRUDResolver.PARAM_SEARCH) || null;
      this.search = this.search || (this.searchText || '').length > 0;
    });
  }

  onFilterChange(filter: Filter) {
    this.page = this.pageFilter == null || this.pageFilter.toString() == filter.toString() ? this.page : 1;
    this.pageFilter = filter;
    this.pageSort = null;
    this.reload();
  }

  onPageChange(page: number) {
    this.page = page;
    this.reload();
  }

  onSearchChange(searchText: string) {
    this.searchText = searchText;
    this.reload();
  }
  onSearchToggle() {
    this.page = 1;
    this.search = !this.search;
    this.searchText = null;

    if (this.search)
      setTimeout(() => this.searchInput.nativeElement.focus(), 0);

    this.reload();
  }

  onSortChange(sort: Sort) {
    this.page = 1;
    this.pageSort = sort;

    this.reload();
  }

}
