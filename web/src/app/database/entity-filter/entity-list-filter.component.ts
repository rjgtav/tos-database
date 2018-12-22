import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Filter} from "../../shared/directives/filter.directive";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-list-filter',
  templateUrl: './entity-list-filter.component.html',
  styleUrls: ['./entity-list-filter.component.scss']
})
export class EntityListFilterComponent implements OnChanges {
  isOpen: { [key: string]: boolean } = {};
  value: { [key: string]: Filter } = {};

  @Input() config: EntityListFilter[];
  @Input() disabled: boolean;

  @Input() model: Filter[];
  @Output() modelChange: EventEmitter<Filter[]> = new EventEmitter();

  optionGroups: EntityListFilterOptionsGroup[][];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && this.config) {
      this.optionGroups = this.config.map(value => [{ options: [null]}].concat(value.groupBy()));
    }
    if (changes['disabled'] && this.disabled) {
      this.isOpen = {};
    }
    if (changes['model']) {
      this.value = {};
      this.model.forEach(filter => this.value[filter.column] = filter);
    }
  }

  onOpen(filter: EntityListFilter) {
    if (this.disabled) return;

    this.isOpen[filter.column] = !this.isOpen[filter.column]
  }

  onSelect(event: MouseEvent, filter: EntityListFilter, option: string) {
    event.preventDefault();
    if (this.disabled) return;

    let result = (this.model || []).filter(f => f && f.column != filter.column);

    if (option != null && option != '')
      result.push(new Filter(filter.column, filter.indexOf(option)));

    this.isOpen[filter.column] = false;
    this.modelChange.emit(result);
  }

}

export interface EntityListFilter {
  column: string;
  label?: string;
  groupBy: () => EntityListFilterOptionsGroup[];
  indexOf: (value: any) => number;
  toString: (value: any) => string;
}

interface EntityListFilterOptionsGroup {
  header?: string,
  options: any[]
}
