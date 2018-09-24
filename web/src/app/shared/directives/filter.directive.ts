import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {TOSGroupChildDirective, TOSGroupDirective} from "./group-child.directive";

const PROVIDER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FilterGroupDirective),
  multi: true
};

@Directive({
  selector: '[tosFilterGroup]',
  host: {'role': 'group'},
  providers: [PROVIDER_VALUE_ACCESSOR]
})
export class FilterGroupDirective extends TOSGroupDirective<FilterDirective, Filter> {

  @Input('column')
  column: string;

  @Input('toggle')
  toggle: boolean;

  public onChildChange(child: FilterDirective) {
    let value = child.getNewValue();
        child = value == null ? null : child;

    if (this.toggle && this.$value && this.$value.value == value.value)
      child = null;

    super.onChildChange(child);
  }

}

@Directive({
  selector: '[tosFilter]',
  host: {
    '[disabled]': 'disabled',
    '[class.active]': '$value && value == $value.value',
    '[style.cursor]': 'disabled ? "default" : "pointer"',
    '[style.white-space]': '"nowrap"',
  }
})
export class FilterDirective extends TOSGroupChildDirective<FilterDirective, Filter> {

  @Input('value')
  value: string;

  constructor(private _group: FilterGroupDirective, private _element: ElementRef) {
    super(_group, _element);
  }

  getNewValue(): Filter {
    return this.value
      ? new Filter((this.$group as FilterGroupDirective).column, this.value)
      : null;
  }

  @HostListener('click')
  onClick(e: MouseEvent) {
    if (!this.disabled)
      this._group.onChildChange(this);
  }

}

export class Filter {
  constructor(public column: string, public value: string) {}

  /*
  static default(config: TOSListConfiguration): Filter {
    return config.filter
      ? new Filter(config.filter.column, config.filter.default.toString())
      : null;
  }
  */

  public filter(item: any): boolean {
    return ('' + item[this.column]) == this.value;
  }

  public toString(): string {
    return this.column + ',' + this.value;
  }

  public static valueOf(value: string): Filter {
    if (value == null || value == '') return null;

    let parts = value.split(',');
    return new Filter(parts[0], parts[1]);
  }
}
