import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {
  EntityListFilterV2,
  EntityListFilterV2$Type,
  EntityListFilterV2Component
} from "../entity-list-filter-v2.component";
import {Params} from "@angular/router";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-list-filter-v2-range',
  templateUrl: './entity-list-filter-v2-range.component.html',
  styleUrls: ['./entity-list-filter-v2-range.component.scss']
})
export class EntityListFilterV2RangeComponent {

  @Input()  parent: EntityListFilterV2Component<number, EntityListFilterV2$Range>;

  constructor() { }

  get filter() { return this.parent.filter }
  get filterEmitter() { return this.parent.filterChange }

  setDelta$Max(event: WheelEvent) { this.set$Max(this.filter.get$Max() + this.setDelta(event)) }
  setDelta$Min(event: WheelEvent) { this.set$Min(this.filter.get$Min() + this.setDelta(event)) }
  private setDelta(event: WheelEvent) {
    event.preventDefault();
    return event.deltaY > 0 ? 1 : -1;
  }

  set$Max(value: number) {
    this.filter && this.filter.set$Max(value);
    this.filterEmitter.emit(this.filter);
  }

  set$Min(value: number) {
    this.filter && this.filter.set$Min(value);
    this.filterEmitter.emit(this.filter);
  }

}

export class EntityListFilterV2$Range extends EntityListFilterV2<number> {

  private value$Max: number;
  private value$Min: number;

  constructor(
    public key: string,
    public label: string,
    public valueMin?: number,
    public valueMax?: number,
  ) { super(key, label, EntityListFilterV2$Type.RANGE) }

  clone() {
    let clone = new EntityListFilterV2$Range(this.key, this.label, this.valueMin, this.valueMax);
        clone.value$Max = this.value$Max;
        clone.value$Min = this.value$Min;

    return clone;
  }

  filter(value: object): boolean {
    if (isNaN(this.value$Max) && isNaN(this.value$Min))
      return true;

    if (isNaN(this.value$Max))
      return +value[this.key] >= +this.value$Min;

    if (isNaN(this.value$Min))
      return +value[this.key] <= +this.value$Max;

    return +value[this.key] >= +this.value$Min && +value[this.key] <= this.value$Max;
  }

  get$Max() { return this.value$Max }
  get$Min() { return this.value$Min }

  set$Max(value: number) { this.value$Max = this.set(value) }
  set$Min(value: number) { this.value$Min = this.set(value) }
  private set(value: number) {
    if (value != undefined) {
      value = Math.floor(value);
      value = this.valueMax != undefined ? Math.min(this.valueMax, value) : value;
      value = this.valueMin != undefined ? Math.max(this.valueMin, value) : value;
    }

    return value || undefined;
  }

  paramsImport(params: Params) {
    this.value$Max = undefined;
    this.value$Min = undefined;

    if (params.hasOwnProperty(this.key)) {
      let value = params[this.key].split(',');

      this.set$Max(+value[1]);
      this.set$Min(+value[0]);
    }
  }
  paramsExport(params: Params) {
    params[this.key] = this.get$Min() || this.get$Max() ? [this.get$Min(), this.get$Max()].toString() : undefined;
  }

}
