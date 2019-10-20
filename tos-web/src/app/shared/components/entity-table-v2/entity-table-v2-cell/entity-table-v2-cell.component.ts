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
import {EntityTableV2CellIconGrade} from "./entity-table-v2-cell-icon-grade/entity-table-v2-cell-icon-grade.component";
import {EntityTableV2CellTextDate} from "./entity-table-v2-cell-text-date/entity-table-v2-cell-text-date.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-table-v2-cell',
  templateUrl: './entity-table-v2-cell.component.html',
  styleUrls: ['./entity-table-v2-cell.component.scss']
})
export class EntityTableV2CellComponent<ENTITY extends ITOSEntityV2> implements OnChanges, OnDestroy {

  @Input()                          cell: EntityTableV2Cell<ENTITY>;
  @Input()                          content: V2TOSEntityProxy<ENTITY> | ENTITY;

  private async: AsyncPipe;
  private subscriptionContent: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
  ) {
    this.async = new AsyncPipe(changeDetector);
  }

  get isLoading() { return this.cell && this.cell.proxy && (this.content == null || this.content instanceof V2TOSEntityProxy); }

  get isCellIcon() { return this.cell instanceof EntityTableV2CellIcon }
  get isCellIconGrade() { return this.cell instanceof EntityTableV2CellIconGrade }
  get isCellText() { return this.cell instanceof EntityTableV2CellText }
  get isCellTextDate() { return this.cell instanceof EntityTableV2CellTextDate }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.content) {
      if (this.content instanceof V2TOSEntityProxy) {
        this.subscriptionContent && this.subscriptionContent.unsubscribe();
        this.subscriptionContent = this.content.get().subscribe(value => this.onLoad(value));

        this.changeDetector.markForCheck();
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptionContent && this.subscriptionContent.unsubscribe();
  }

  onLoad(entity: ENTITY) {
    this.content = entity;
    this.changeDetector.markForCheck();
  }

}

