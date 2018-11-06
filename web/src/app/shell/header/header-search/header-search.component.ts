import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {TOSSearchService} from "../../../shared/service/tos-search.service";
import {TOSEntity} from "../../../shared/domain/tos/tos-entity.model";
import {TOSRepositoryService} from "../../../shared/domain/tos/tos-repository.service";
import {Router} from "@angular/router";
import {TOSDataSet} from "../../../shared/domain/tos/tos-domain";

const RESULTS_LIMIT = 16;

@Component({
  selector: 'tos-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent {

  faSearch = faSearch;
  faTimes = faTimes;

  TOSDataSet = TOSDataSet;

  isLoadedRepository: boolean;
  isLoadedSearch: boolean;

  filter: TOSDataSet;
  isOpen: boolean;
  isOpenFilter: boolean;
  keyboardSelected: number;
  query: string;
  results: TOSEntity[];
  resultsLimit: number = RESULTS_LIMIT;
  resultsSliced: TOSEntity[];
  tooltip: TOSEntity;

  @ViewChild('queryInput') queryInput: ElementRef;

  constructor(private changeDetector: ChangeDetectorRef, private router: Router, private search: TOSSearchService) {
    TOSRepositoryService.IsLoaded.subscribe(value => this.isLoadedRepository = value);
    search.IsLoaded.subscribe(value => this.isLoadedSearch = value);
  }

  onClear() {
    this.filter = null;
    this.isOpen = false;
    this.query = null;
    this.results = null;
    this.resultsSliced = null;
    this.tooltip = null;
  }

  onFilterChange(event: MouseEvent, filter: TOSDataSet) {
    event && event.preventDefault();

    this.filter = filter;
    this.onFocus(false);
    this.onQueryChange(this.query);
  }

  onFocus(value: boolean) {
    this.keyboardSelected = -1;
    this.isOpen = value;
    this.tooltip = null;

    value && this.queryInput.nativeElement.focus();
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

  onLoadMore() {
    this.resultsLimit += RESULTS_LIMIT;

    this.onFocus(true);
    this.onQueryChange(this.query);
  }

  onQueryChange(query: string = '') {
    if (this.query != query)
      this.resultsLimit = RESULTS_LIMIT;

    this.query = query;
    this.query = query = this.query.trim();
    this.query = query = this.query.replace(/[~*+]/g, '');

    // Hotfix: deal with incomplete queries and make sure multi word queries use an AND
    let words = query.split(' ');
        query = words
          .map((value, index) => index == words.length - 1 ? value + '*' : '+' + value)
          .join(' ');

    this.search
      .search(query)
      .subscribe(value => this.onQueryResult(value));
  }
  onQueryResult(results: TOSEntity[]) {
    this.results = results;
    this.resultsSliced = this.results
      .filter(value => this.filter == null || this.filter == value.Dataset)
      .slice(0, this.resultsLimit); // Limit search results for performance
    this.tooltip = null;

    this.onFocus(true);
    this.changeDetector.detectChanges();
  }

}
