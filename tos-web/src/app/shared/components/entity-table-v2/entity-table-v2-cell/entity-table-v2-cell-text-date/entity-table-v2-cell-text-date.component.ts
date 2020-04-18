import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ITOSEntityV2} from "../../../../domain/tos/tos-domain";
import {ObservableUtils} from "../../../../utils/observable-utils";
import {EntityTableV2Cell} from "../entity-table-v2-cell.model";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-table-v2-cell-text-date',
  templateUrl: './entity-table-v2-cell-text-date.component.html',
  styleUrls: ['./entity-table-v2-cell-text-date.component.scss']
})
export class EntityTableV2CellTextDateComponent<ENTITY extends ITOSEntityV2> implements OnChanges {

  @Input()    config: EntityTableV2CellTextDate<ENTITY>;
  @Input()    entity: ENTITY;

  value: Date;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entity && this.entity)
      ObservableUtils
        .of(this.entity[this.config.key])
        .subscribe(value => {
          this.value = value;
          this.changeDetector.markForCheck();
        });
  }

}

export class EntityTableV2CellTextDate<ENTITY extends ITOSEntityV2> extends EntityTableV2Cell<ENTITY> {

  public constructor(
    public key: keyof ENTITY,
    public proxy: boolean,
  ) { super(key, proxy) }

}
