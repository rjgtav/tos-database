import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {TOSSearchResult, TOSSearchService} from "../../../shared/service/tos-search.service";
import {TOSEntity} from "../../../shared/domain/tos/tos-entity.model";
import {TOSRepositoryService} from "../../../shared/domain/tos/tos-repository.service";
import {Router} from "@angular/router";
import {TOSDataSet} from "../../../shared/domain/tos/tos-domain";
import {fromEvent, Observable, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnDestroy, OnInit {

  faSearch = faSearch;
  faTimes = faTimes;

  TOSDataSet = TOSDataSet;

  isLoadedRepository: boolean;
  isLoadedSearch: boolean;

  isLoadMore: boolean;
  isOpen: boolean;
  isOpenDataset: boolean;
  keyboardSelected: number;
  query: string;
  queryDataset: TOSDataSet;
  queryPage: number;
  queryPrevious: string;
  queryPreviousDataset: TOSDataSet;
  queryPreviousPage: number;
  results: TOSEntity[];
  tooltip: TOSEntity;

  input$: Observable<any>;
  @ViewChild('input') input: ElementRef;

  subscriptionInput: Subscription;
  subscriptionLoad: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private repositoryService: TOSRepositoryService,
    private router: Router,
    private search: TOSSearchService
  ) {
    this.repositoryService.IsLoaded$.subscribe(value => this.isLoadedRepository = value);
    this.subscriptionLoad = search.isLoaded$.subscribe(value => this.onLoad(value));
  }

  ngOnInit(): void {
    this.input$ = fromEvent(this.input.nativeElement, 'keyup').pipe(debounceTime(200));
    this.subscriptionInput = this.input$.subscribe(value => this.onInputChange());
  }

  ngOnDestroy(): void {
    this.subscriptionInput && this.subscriptionInput.unsubscribe();
    this.subscriptionLoad && this.subscriptionLoad.unsubscribe();
  }

  onClear() {
    this.isOpen = false;
    this.query = null;
    this.queryDataset = null;
    this.queryPage = 0;
    this.queryPrevious = null;
    this.queryPreviousDataset = null;
    this.results = null;
    this.tooltip = null;
  }

  onDatasetChange(event: MouseEvent, dataset: TOSDataSet) {
    event && event.preventDefault();

    this.queryDataset = dataset;
    this.onFocus(false);
    this.onInputChange();
  }

  onFocus(value: boolean) {
    this.keyboardSelected = -1;
    this.isOpen = value;
    this.tooltip = null;

    value && this.input.nativeElement.focus();
  }

  onKeyboardNavigate(i: number) {
    document.activeElement && document.activeElement['blur']();
    this.onFocus(false);
    this.router.navigate([this.results[i].Url]);
  }
  onKeyboardSelect(direction: number) {
    if (this.results && this.results.length) {
      this.keyboardSelected = this.keyboardSelected + direction;
      this.keyboardSelected = Math.max(0, Math.min(this.keyboardSelected, this.results.length - 1));
    }
  }

  onLoad(loaded: boolean) {
    this.isLoadedSearch = loaded;
    if (!loaded) this.onClear();

    this.changeDetector.markForCheck();
  }
  onLoadMore() {
    this.queryPage ++;
    this.onFocus(true);
    this.onInputChange();
  }

  onInputChange() {
    // Ignore empty and duplicate queries
    if (this.query == null || this.query == '' || this.query.length <= 2) return this.onQueryResult({ page: 0, response: []});
    if (this.query == this.queryPrevious && this.queryPage == this.queryPreviousPage) return;

    if (this.query != this.queryPrevious || this.queryDataset != this.queryPreviousDataset) {
      this.isLoadMore = true;
      this.queryPage = 0;
      this.results = [];
    }

    this.query = this.query.trim().replace(/[~*+]/g, '');
    this.queryPrevious = this.query;
    this.queryPreviousDataset = this.queryDataset;
    this.queryPreviousPage = this.queryPage;

    // Hotfix: deal with incomplete queries and make sure multi word queries use an AND
    let query = this.query;
    let words = query.split(' ');
        query = words
          .map((value, index) => index == words.length - 1 ? value + '*' : '+' + value)
          .join(' ');

    this.search
      .search(this.queryDataset, query, this.queryPage)
      .subscribe(value => this.onQueryResult(value));
  }
  onQueryResult(result: TOSSearchResult) {
    if (result) {
      this.results = result.page == 0 ? result.response : this.results.concat(result.response);
      this.isLoadMore = result.response.length > 0; // Disable 'Load more' in case no more results are being returned
    }

    this.tooltip = null;

    this.onFocus(true);
    this.changeDetector.detectChanges();
  }

}
