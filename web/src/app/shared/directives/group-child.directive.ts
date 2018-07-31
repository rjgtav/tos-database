import {
  Directive,
  ElementRef,
  EventEmitter, forwardRef,
  HostListener,
  Input,
  OnChanges, OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {C} from "@angular/core/src/render3";

export abstract class TOSGroupDirective<C extends TOSGroupChildDirective<C, V>, V> implements ControlValueAccessor {


  private _children: Set<C> = new Set<C>();
  private _disabled: boolean;
  private _value: V;

  @Input('disabled')
  get disabled(): boolean { return this._disabled; }
  set disabled(disabled: boolean) { this._disabled = disabled; this._childrenUpdate(); }

  public childRegister(child: C) { this._children.add(child); }
  public childUnregister(child: C) { this._children.delete(child); }
  private _childrenUpdate() {
    this._children.forEach((child) => {
      child.disabled = this.disabled;
      child.updateValue(this._value)
    });
  }

  public onChildChange(child: C) {
    let value = child.getNewValue();
    this.writeValue(value);
    this.onChange(value);
  }

  // ControlValueAccessor
  onChange = (_: any) => {};
  onTouched = () => {};
  registerOnChange(fn: (value: any) => any): void { this.onChange = fn; }
  registerOnTouched(fn: () => any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {}

  writeValue(value: V): void {
    this._value = value;
    this._childrenUpdate();
  }

}

export abstract class TOSGroupChildDirective<C, V> implements OnDestroy {

  @Input('disabled')
  disabled: boolean;

  protected $value: V;

  protected constructor(protected $group: TOSGroupDirective<TOSGroupChildDirective<C, V>, V>, protected $element: ElementRef) {
    this.$group.childRegister(this);
  }

  abstract getNewValue(): V;
  public updateValue(value: V) { this.$value = value; }

  ngOnDestroy(): void {
    this.$group.childUnregister(this);
  }

}
