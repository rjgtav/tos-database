import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {
  EntityListFilterV2,
  EntityListFilterV2$Type,
  EntityListFilterV2Component
} from "../entity-list-filter-v2.component";
import {Params} from "@angular/router";
import {ITOSEntityV2} from "../../../shared/domain/tos/tos-domain";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-list-filter-v2-number',
  templateUrl: './entity-list-filter-v2-number.component.html',
  styleUrls: ['./entity-list-filter-v2-number.component.scss']
})
export class EntityListFilterV2NumberComponent<ENTITY extends ITOSEntityV2> {

  @Input()  parent: EntityListFilterV2Component<ENTITY, EntityListFilterV2$Number<ENTITY>>;

  constructor() { }

  get filter() { return this.parent.filter }
  get filterEmitter() { return this.parent.filterChange }

  set(value: number) {
    this.filter && this.filter.set(value);
    this.filterEmitter.emit(this.filter);
  }
  setDelta(event: WheelEvent) {
    event.preventDefault();

    let value = this.filter && this.filter.get() || 0;
        value += event.deltaY > 0 ? 1 : -1;

    this.set(value);
  }

}

export class EntityListFilterV2$Number<ENTITY extends ITOSEntityV2> extends EntityListFilterV2<ENTITY> {

  private value$: number;

  constructor(
    public key: keyof ENTITY,
    public label: string,
    public valueMin?: number,
    public valueMax?: number,
  ) { super(key, label, EntityListFilterV2$Type.NUMBER) }

  clone() {
    let clone = new EntityListFilterV2$Number(this.key, this.label, this.valueMin, this.valueMax);
        clone.value$ = this.value$;

    return clone;
  }

  filter(value: ENTITY): boolean {
    if (isNaN(this.value$))
      return true;

    return +value[this.key] == +this.value$;
  }

  get() { return this.value$ }
  set(value: number) {
    if (value != undefined) {
      value = Math.floor(value);
      value = this.valueMax != undefined ? Math.min(this.valueMax, value) : value;
      value = this.valueMin != undefined ? Math.max(this.valueMin, value) : value;
    }

    this.value$ = value;
  }

  paramsImport(params: Params) {
    this.value$ = undefined;

    if (params.hasOwnProperty(this.key))
      this.set(+params[this.key + '']);
  }
  paramsExport(params: Params) { params[this.key + ''] = this.get() }

}
