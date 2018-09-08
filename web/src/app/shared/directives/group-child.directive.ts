import {
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import {ControlValueAccessor} from "@angular/forms";

export abstract class TOSGroupDirective<C extends TOSGroupChildDirective<C, V>, V> implements ControlValueAccessor {

  private _children: Set<C> = new Set<C>();
  private _disabled: boolean;
  protected $value: V;

  @Input('disabled')
  get disabled(): boolean { return this._disabled; }
  set disabled(disabled: boolean) { this._disabled = disabled; this._childrenUpdate(true); }

  public childRegister(child: C) { this._children.add(child); }
  public childUnregister(child: C) { this._children.delete(child); }
  private _childrenUpdate(updateDisabled: boolean = false) {
    this._children.forEach((child) => {
      if (updateDisabled) child.disabled = this.disabled;
      child.updateValue(this.$value)
    });
  }

  public onChildChange(child: C) {
    let value = child ? child.getNewValue() : null;
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
    this.$value = value;
    this._childrenUpdate();
  }

}

export abstract class TOSGroupChildDirective<C, V> implements OnDestroy {

  private _disabled: boolean;

  @Input('disabled')
  get disabled(): boolean { return this._disabled; }
  set disabled(disabled: boolean) { this._disabled = disabled; }

  protected $value: V;

  protected constructor(protected $group: TOSGroupDirective<TOSGroupChildDirective<C, V>, V>, protected $element: ElementRef) {
    this.disabled = this.$group.disabled;
    this.$group.childRegister(this);
  }

  abstract getNewValue(): V;
  public updateValue(value: V) { this.$value = value; }

  ngOnDestroy(): void {
    this.$group.childUnregister(this);
  }

}
