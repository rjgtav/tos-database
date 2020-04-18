import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import {V2TOSEntityProxy} from "../../../domain/tos/v2-tos-entity.proxy";
import {Subscription} from "rxjs";
import {ITOSEntityV2} from "../../../domain/tos/tos-domain";
import {AsyncPipe} from "@angular/common";
import {EntityTableV2CellText} from "./entity-table-v2-cell-text/entity-table-v2-cell-text.component";
import {EntityTableV2CellIcon} from "./entity-table-v2-cell-icon/entity-table-v2-cell-icon.component";
import {EntityTableV2Cell} from "./entity-table-v2-cell.model";
import {EntityTableV2CellIconEquipment} from "./entity-table-v2-cell-icon-equipment/entity-table-v2-cell-icon-equipment.component";
import {EntityTableV2CellTextDate} from "./entity-table-v2-cell-text-date/entity-table-v2-cell-text-date.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-table-v2-cell',
  templateUrl: './entity-table-v2-cell.component.html',
  styleUrls: ['./entity-table-v2-cell.component.scss']
})
export class EntityTableV2CellComponent<ENTITY extends ITOSEntityV2> implements OnChanges, OnDestroy {

  @Input()          config: EntityTableV2Cell<ENTITY>;
  @Input()          entity: V2TOSEntityProxy<ENTITY> | ENTITY;

  private async: AsyncPipe;
  private subscriptionEntity: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
  ) {
    this.async = new AsyncPipe(changeDetector);
  }

  get isLoading() { return this.config && this.config.proxy && (this.entity == null || this.entity instanceof V2TOSEntityProxy); }

  get isCellIcon() { return this.config instanceof EntityTableV2CellIcon }
  get isCellIconGrade() { return this.config instanceof EntityTableV2CellIconEquipment }
  get isCellText() { return this.config instanceof EntityTableV2CellText }
  get isCellTextDate() { return this.config instanceof EntityTableV2CellTextDate }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entity) {
      if (this.entity instanceof V2TOSEntityProxy) {
        this.subscriptionEntity && this.subscriptionEntity.unsubscribe();
        this.subscriptionEntity = this.entity.get().subscribe(value => this.onEntityLoad(value));
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptionEntity && this.subscriptionEntity.unsubscribe();
  }

  onEntityLoad(entity: ENTITY) {
    this.entity = entity;
    this.changeDetector.markForCheck();
  }

}

