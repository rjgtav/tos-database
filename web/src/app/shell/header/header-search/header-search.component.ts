import { Component} from '@angular/core';
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {TOSSearchService} from "../../../shared/service/tos-search.service";
import {TOSEntity} from "../../../shared/domain/tos/tos-entity.model";
import {TOSRepositoryService} from "../../../shared/domain/tos/tos-repository.service";
import {Router} from "@angular/router";

@Component({
  selector: 'tos-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent {

  faSearch = faSearch;
  faTimes = faTimes;

  isLoadedRepository: boolean;
  isLoadedSearch: boolean;
  keyboardSelected: number;
  open: boolean;
  query: string;
  results: TOSEntity[];
  tooltip: TOSEntity;

  constructor(private router: Router, private search: TOSSearchService) {
    TOSRepositoryService.IsLoaded.subscribe(value => this.isLoadedRepository = value);
    search.IsLoaded.subscribe(value => this.isLoadedSearch = value);
  }

  onClear(event: MouseEvent) {
    event && event.preventDefault();

    this.open = false;
    this.query = null;
    this.results = null;
    this.tooltip = null;
  }

  onKeyboardNavigate(i: number) {
    document.activeElement && document.activeElement['blur']();
    this.onOpen(false);
    this.router.navigate([this.results[i].Url]);
  }
  onKeyboardSelect(direction: number) {
    if (this.results && this.results.length) {
      this.keyboardSelected = this.keyboardSelected + direction;
      this.keyboardSelected = Math.max(0, Math.min(this.keyboardSelected, this.results.length - 1));
    }
  }

  onOpen(open: boolean) {
    this.keyboardSelected = -1;
    this.open = open;
    this.tooltip = null;
  }

  onQueryChange(query: string) {
    this.open = true;
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
      .subscribe(value => this.results = value);
  }

}
