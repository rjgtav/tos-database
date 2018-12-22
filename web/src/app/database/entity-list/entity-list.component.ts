import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";
import {TOSEntity} from "../../shared/domain/tos/tos-entity.model";
import {CRUDPageResult, CRUDResolver} from "../../shared/service/CRUD.resolver";
import {Filter} from "../../shared/directives/filter.directive";
import {Sort} from "../../shared/directives/sort.directive";
import {EntityListFilter} from "../entity-filter/entity-list-filter.component";
import {EntityTableColumn} from "../../shared/components/entity-table/entity-table.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnDestroy, OnInit {
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

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

      let response = this.route.snapshot.data.response as CRUDPageResult<TOSEntity>;
      this.data = response.result;
      this.dataSize = response.size;

      this.page = +params.get(CRUDResolver.PARAM_PAGE) || 1;
      this.pageSort = Sort.valueOf(params.get(CRUDResolver.PARAM_SORT)) || Sort.default(this.config);
      this.pageFilter = (params.get(CRUDResolver.PARAM_FILTER) || '').split(';')
        .map(filter => Filter.valueOf(filter))
        .filter((filter) => filter);

      this.changeDetector.markForCheck();
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
  tableColumns: EntityTableColumn[]
}
