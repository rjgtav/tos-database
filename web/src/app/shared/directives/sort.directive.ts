import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {TOSGroupChildDirective, TOSGroupDirective} from "./group-child.directive";
import {TOSListConfiguration} from "../../database/entity-list/entity-list.component";

const PROVIDER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SortGroupDirective),
  multi: true
};

@Directive({
  selector: '[tosSortGroup]',
  host: {'role': 'group'},
  providers: [PROVIDER_VALUE_ACCESSOR]
})
export class SortGroupDirective extends TOSGroupDirective<SortDirective, Sort> {}

@Directive({
  selector: '[tosSort]',
  host: {
    '[style.cursor]': 'disabled ? "default" : "pointer"',
    '[style.white-space]': '"nowrap"',
  }
})
export class SortDirective extends TOSGroupChildDirective<SortDirective, Sort> {

  private _column: string;
  private _label: string;

  @Input('column')
  get column(): string { return this._column; }
  set column(column: string) { this._column = column; this.updateDisabled(); }

  @Input('label')
  get label(): string { return this._label; }
  set label(label: string) { this._label = label; this.updateDisabled(); }

  constructor(private _group: SortGroupDirective, private _element: ElementRef) {
    super(_group, _element);
  }

  getNewValue(): Sort {
    let order = this.$value != null && this.$value.column == this.column && this.$value.order == SortOrder.ASC
      ? SortOrder.DESC
      : SortOrder.ASC;

    return new Sort(this.column, order);
  }

  updateDisabled() {
    this.disabled = this.disabled || this.label != null && this.label.length == 0 && this.column != null && this.column.length > 0;
  }

  updateValue(value: Sort) {
    super.updateValue(value);

    let direction = this.disabled || value == null || value.column != this.column
      ? ''
      : value.order == SortOrder.ASC
        ? '▲'
        : '▼';

    this._element.nativeElement.innerText = (this.label != null ? this.label : this.column) + ' ' + direction;
  }

  @HostListener('click')
  onClick(e: MouseEvent) {
    if (!this.disabled)
      this._group.onChildChange(this);
  }

}

export class Sort {
  constructor(public column: string, public order: SortOrder) {}

  static default(config: TOSListConfiguration): Sort {
    return config.sortColumn
      ? new Sort(config.sortColumn, SortOrder.ASC)
      : null;
  }

  public toString(): string {
    return this.column + ',' + this.order.toString();
  }

  public static valueOf(value: string): Sort {
    if (value == null) return null;

    let parts = value.split(',');
    return new Sort(parts[0], SortOrder.valueOf(parts[1]));
  }
}

enum SortOrderEnum {
  ASC,
  DESC
}

export class SortOrder {
  public static readonly ASC = new SortOrder(SortOrderEnum.ASC);
  public static readonly DESC = new SortOrder(SortOrderEnum.DESC);

  constructor(private _enum: SortOrderEnum) {}

  public toString(): string {
    switch (this._enum) {
      case SortOrderEnum.ASC:     return 'ASC';
      case SortOrderEnum.DESC:    return 'DESC';
      default:                    return null;
    }
  }

  public static valueOf(value: string): SortOrder {
    switch (value) {
      case 'ASC':                 return SortOrder.ASC;
      case 'DESC':                return SortOrder.DESC;
      default:                    return SortOrder.ASC;
    }
  }
}

