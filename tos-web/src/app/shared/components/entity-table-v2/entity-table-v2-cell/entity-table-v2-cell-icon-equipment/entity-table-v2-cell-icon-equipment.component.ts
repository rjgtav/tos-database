import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ITOSItemEquipmentV2} from "../../../../domain/tos/tos-domain";
import {EntityTableV2Cell} from "../entity-table-v2-cell.model";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-table-v2-cell-icon-grade',
  templateUrl: './entity-table-v2-cell-icon-equipment.component.html',
  styleUrls: ['./entity-table-v2-cell-icon-equipment.component.scss']
})
export class EntityTableV2CellIconEquipmentComponent<ENTITY extends ITOSItemEquipmentV2> implements OnChanges {

  @Input()    config: EntityTableV2CellIconEquipment<ENTITY>;
  @Input()    entity: ENTITY;

  idAppraisal: string;
  idGrade: string;
  idIcon: string;

  size: number = 40;

  constructor(
    private element: ElementRef,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && this.config) {
      this.element.nativeElement.style.height = `${ this.size }px`;
      this.element.nativeElement.style.width = `${ this.size }px`;
    }

    if (changes.entity && this.entity) {
      this.idAppraisal = this.entity.NeedAppraisal$Icon;
      this.idGrade = this.entity.ItemGrade$Icon;
      this.idIcon = this.entity.Icon;
    }
  }

}

export class EntityTableV2CellIconEquipment<ENTITY extends ITOSItemEquipmentV2> extends EntityTableV2Cell<ENTITY> {

  public constructor() { super('ItemGrade$Icon', true) }

  get image(): boolean { return true }

}
