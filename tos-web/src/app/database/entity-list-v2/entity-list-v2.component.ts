import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {faFilter, faSearch} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {EntityListV2} from "../resolvers/tos-entity-list.resolver";
import {FlexSearchPageable$Sort,} from "../../../../../tos-search/src/service/flexsearch.service";
import {debounceTime} from "rxjs/operators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-list-v2',
  templateUrl: './entity-list-v2.component.html',
  styleUrls: ['./entity-list-v2.component.scss']
})
export class EntityListV2Component implements OnDestroy, OnInit {

  readonly faSearch = faSearch;
  readonly faFilter = faFilter;

  list: EntityListV2<any>;

  isChanging: boolean;
  isFilter: boolean;

  private readonly changeFilter: Subject<boolean> = new Subject<boolean>();
  private readonly changePage: Subject<boolean> = new Subject<boolean>();
  private readonly changeSearch: Subject<boolean> = new Subject<boolean>();
  private readonly changeSort: Subject<boolean> = new Subject<boolean>();

  private subscriptionChangeFilter: Subscription;
  private subscriptionChangePage: Subscription;
  private subscriptionChangeSearch: Subscription;
  private subscriptionChangeSort: Subscription;
  private subscriptionConfig: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  // XTODO: keep focus on filter when navigating
  // XTODO: maybe a bit of debounce?
  // XTODO: force one to be always selected on the header?
  // XTODO: auto fill enum options with values from the search index
  // XTODO: remove all search filters when closing the filter
  // XTODO: put a maxheight on the dropdown
  // XTODO: update header to show the marketcategory hierarchy
  // XTODO: proper bootswatch theme
  // XTODO: implement the pagination
  // XTODO: show the search entries immediately and then download the actual DB entities in the background?
  // XTODO: add remaining columns
  // XTODO: add a sort for when the item was last updated/created
  // XTODO: add translations to some of the filters & column
  // XTODO:  - ItemGrade: ui.ipf/uixml/controlset.xml NORMAL_GRADE_TEXT, etc. contain the original text which then exists on the WholeDicID.xml
  // XTODO:  - Stats: xml_lang.ipf/clientmessage.xml ADD_CLOTH, etc. name="Properties" contains the original text
  // XTODO:  - Material: xml_lang.ipf/clientmessage.xml Cloth name="ArmorMaterial" contains the original text
  // XTODO:  - MarketCategory
  // XTODO: ItemGrade filter is broken ;; I think the actual entity doesn't have the number as the value
  // XTODO: Material is translated in the filter but translation still missing in the table :x
  // XTODO: Enums in the filter dropdown are not sorted after being translated
  // XTODO: Remove prefix from the header, Use the translation for the page title
  // XTODO: implement search by name
  // TODO: Modularize translations so we can use them anywhere in the website:
  // TODO:  - tos-parser | Don't store the items translated in the database. Generate an external translation JSON per language
  // TODO:  - tos-search | Only translate the name, remove translation from the enum
  // TODO:  - tos-web | Integrate translations with angular's translation service, translate the enums there

  ngOnDestroy(): void {
    this.subscriptionChangeFilter && this.subscriptionChangeFilter.unsubscribe();
    this.subscriptionChangePage && this.subscriptionChangePage.unsubscribe();
    this.subscriptionChangeSearch && this.subscriptionChangeSearch.unsubscribe();
    this.subscriptionConfig && this.subscriptionConfig.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptionChangeFilter = this.changeFilter.pipe(debounceTime(80)).subscribe(() => this.onChange());
    this.subscriptionChangePage = this.changePage.pipe(debounceTime(180)).subscribe(() => this.onChange());
    this.subscriptionChangeSearch = this.changeSearch.pipe(debounceTime(200)).subscribe(() => this.onChange());
    this.subscriptionChangeSort = this.changeSort.pipe(debounceTime(0)).subscribe(() => this.onChange());

    this.subscriptionConfig = this.route.queryParams.subscribe(params => {
      this.list = this.route.snapshot.data.list as EntityListV2<any>;
      this.isFilter = this.isFilter || this.list.filter.find(value => params.hasOwnProperty(value.key)) != null;
      this.changeDetector.detectChanges();
    });
  }

  onChange() {
    this.isChanging = false;
    this.changeDetector.detectChanges();

    this.router.navigate(['.'], {
      queryParams: this.list.paramsExport(),
      relativeTo: this.route
    });
  }

  onFilterChange() {
    this.isChanging = true;
    this.changeFilter.next(true);
  }

  onPageChange(page: number) {
    this.isChanging = page != this.list.page.page;
    this.list.page.page = page;
    this.changeDetector.markForCheck();

    this.changePage.next(true);
  }

  onSearchChange(search: string) {
    if (search.length == 1)
      return;

    this.isChanging = search != this.list.page.search;
    this.list.page.search = search;

    this.changeSearch.next(true);
  }

  onSortChange(sort: FlexSearchPageable$Sort) {
    this.isChanging = true;
    this.list.page.sort = sort;

    this.changeSort.next(true);
  }

  toggleFilter() {
    this.isFilter = !this.isFilter;

    if (this.isFilter == false) {
      this.list.filter.forEach(value => value.paramsImport({}));
      this.onFilterChange();
    }
  }

  trackByIndex(index, item) {
    return index;
  }

}
