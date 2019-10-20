import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {
  EntityListFilterV2,
  EntityListFilterV2$Type,
  EntityListFilterV2Component
} from "../entity-list-filter-v2.component";
import {Params} from "@angular/router";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-list-filter-v2-enum',
  templateUrl: './entity-list-filter-v2-enum.component.html',
  styleUrls: ['./entity-list-filter-v2-enum.component.scss']
})
export class EntityListFilterV2EnumComponent  {

  @Input()  parent: EntityListFilterV2Component<string, EntityListFilterV2$Enum>;

            show: boolean = false;

  get filter() { return this.parent.filter }
  get filterEmitter() { return this.parent.filterChange }

  isRadio() {
    return this.filter && this.filter.theme == EntityListFilterV2$Enum$Theme.RADIO && this.filter.options.length < 8;
  }

  select(option: EntityLisFilterV2$Enum$Option) {
    this.show = false;

    this.filter.set(option);
    this.filterEmitter.emit(this.filter);
  }

  selected() {
    if (this.filter == null)
      return;

    let filter = this.filter.get();
    if (filter == null || filter.length == 0)
      return;

    switch (this.filter.selection) {
      case EntityListFilterV2$Enum$Selection.MULTI:  return `${ (filter as any[]).length } Selected`;
      case EntityListFilterV2$Enum$Selection.SINGLE: return `${ filter[0].translation }`;
    }
  }

}

export class EntityListFilterV2$Enum extends EntityListFilterV2<string> {

  private optionsSelection: EntityLisFilterV2$Enum$Option[] = [];

  constructor(
    public key: string,
    public label: string,
    public options: EntityLisFilterV2$Enum$Option[],
    public selection: EntityListFilterV2$Enum$Selection,
    public theme: EntityListFilterV2$Enum$Theme,
  ) { super(key, label, EntityListFilterV2$Type.ENUM) }

  clone() {
    let clone = new EntityListFilterV2$Enum(this.key, this.label, this.options, this.selection, this.theme);
        clone.optionsSelection = this.optionsSelection;

    return clone;
  }

  filter(value: object): boolean {
    if (this.optionsSelection == null || this.optionsSelection.length == 0)
      return true;
    if (value[this.key] == null)
      return false;

    // Note: when MULTI selection, we do an AND on all the selected options
    return this.selection == EntityListFilterV2$Enum$Selection.SINGLE
      ? this.optionsSelection[0].value == value[this.key]
      : this.optionsSelection.find(option => value[this.key].find(v => v == option.value) == null) == null
    ;
  }

  get() { return this.optionsSelection }
  is(value: EntityLisFilterV2$Enum$Option) { return this.optionsSelection && !!this.optionsSelection.find(option => option.value == value.value) }

  set(value: EntityLisFilterV2$Enum$Option) {
    if (value == null) {
      this.optionsSelection = [];
      return;
    }

    if (this.options.find(option => option.value == value.value) == null)
      throw new Error(`Invalid option: ${ value }, options: ${ this.options }`);

    switch (this.selection) {
      case EntityListFilterV2$Enum$Selection.MULTI:
        this.optionsSelection = this.optionsSelection || [];

        if (this.optionsSelection.find(option => option.value == value.value) == null)
          this.optionsSelection.push(value);
        else
          this.optionsSelection = this.optionsSelection.filter(option => option.value != value.value);

        break;
      case EntityListFilterV2$Enum$Selection.SINGLE:
        this.optionsSelection = this.optionsSelection || [];
        this.optionsSelection[0] = value;
        break;
    }
  }

  paramsImport(params: Params) {
    this.optionsSelection = [];

    if (params.hasOwnProperty(this.key)) {
      let options = params[this.key].split(',').map(value => decodeURIComponent(value));
          options.forEach(value => this.set(this.options.find(option => option.value == value)));
    } else {
      // If radio, default to the first option
      if (this.theme == EntityListFilterV2$Enum$Theme.RADIO)
        this.set(this.options && this.options[0]);
    }
  }
  paramsExport(params: Params) {
    params[this.key] = this.optionsSelection.map(option => encodeURIComponent(option.value + '')).join(',') || undefined;
  }

}
export enum EntityListFilterV2$Enum$Selection {
  MULTI,
  SINGLE,
}
export enum EntityListFilterV2$Enum$Theme {
  DROPDOWN,
  RADIO,
}

interface EntityLisFilterV2$Enum$Option {
  translation: string;
  value: string | number;
}

