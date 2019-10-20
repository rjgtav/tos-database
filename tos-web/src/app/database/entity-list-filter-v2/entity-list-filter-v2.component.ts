import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Params} from "@angular/router";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-list-filter-v2',
  templateUrl: './entity-list-filter-v2.component.html',
  styleUrls: ['./entity-list-filter-v2.component.scss']
})
export class EntityListFilterV2Component<T extends number | string, FILTER extends EntityListFilterV2<T>> {

  readonly TYPE_ENUM = EntityListFilterV2$Type.ENUM;
  readonly TYPE_NUMBER = EntityListFilterV2$Type.NUMBER;
  readonly TYPE_RANGE = EntityListFilterV2$Type.RANGE;

  @Input()  filter: FILTER;
  @Output() filterChange: EventEmitter<FILTER> = new EventEmitter<FILTER>();

  constructor() { }

  anyParent() { return this as any }

}

export abstract class EntityListFilterV2<T extends number | string> {

  protected constructor(
    public key: string,
    public label: string,
    public type: EntityListFilterV2$Type,
  ) {}

  abstract clone(): any;
  abstract filter(value: object): boolean;
  abstract paramsExport(params: Params);
  abstract paramsImport(params: Params);

}
export enum EntityListFilterV2$Type {
  ENUM,
  NUMBER,
  RANGE,
}
