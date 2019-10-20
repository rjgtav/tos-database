import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {V2TOSEntityProxy} from "../../domain/tos/v2-tos-entity.proxy";
import {ITOSEntityV2} from "../../domain/tos/tos-domain";
import {EntityTableV2Cell} from "./entity-table-v2-cell/entity-table-v2-cell.model";
import {
  FlexSearchPageable$Sort,
  FlexSearchPageable$SortOrder,
} from "../../../../../../tos-search/src/service/flexsearch.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-table-v2',
  templateUrl: './entity-table-v2.component.html',
  styleUrls: ['./entity-table-v2.component.scss']
})
export class EntityTableV2Component<ENTITY extends ITOSEntityV2> {

  @Input()    columns: EntityTableV2Column<ENTITY>[];
  @Input()    content: V2TOSEntityProxy<ENTITY>[];

  @Input()    page: number;
  @Output()   pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input()    pageSize: number;
  @Input()    pageTotal: number;

  @Input()    sort: FlexSearchPageable$Sort;
  @Output()   sortChange: EventEmitter<FlexSearchPageable$Sort> = new EventEmitter<FlexSearchPageable$Sort>();

  constructor() { }

  onSortClick(key: string) {
    this.sort = this.sort || {} as FlexSearchPageable$Sort;
    this.sort.order = this.sort.column == key ? -1 * this.sort.order : FlexSearchPageable$SortOrder.ASC;
    this.sort.column = key;
    this.sortChange.emit(this.sort);
  }

  sortIndicator(key: string) {
    if (this.sort && this.sort.column == key) {
      if (this.sort.order == FlexSearchPageable$SortOrder.ASC)
        return ' ▲';
      if (this.sort.order == FlexSearchPageable$SortOrder.DESC)
        return ' ▼';
    }
  }

  trackByIndex(index, item) {
    return index;
  }
  trackByClassID(index, item: V2TOSEntityProxy<ENTITY>) {
    return item.ClassID;
  }

}

export interface EntityTableV2Column<ENTITY extends ITOSEntityV2> {
  cell: EntityTableV2Cell<ENTITY>;
  label: string;
  grow?: boolean;
}
