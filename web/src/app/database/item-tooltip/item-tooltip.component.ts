import {Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {NgbTooltipConfig} from "@ng-bootstrap/ng-bootstrap";
import {TOSClassTree, TOSEntity, TOSStat} from "../../shared/domain/tos/entity/tos-entity.model";
import {TOSEquipment, TOSEquipmentType} from "../../shared/domain/tos/item/equipment/tos-equipment.model";
import {TOSItem, TOSItemTradability} from "../../shared/domain/tos/item/tos-item.model";

@Component({
  selector: 'app-item-tooltip',
  templateUrl: './item-tooltip.component.html',
  styleUrls: ['./item-tooltip.component.scss']
})
export class ItemTooltipComponent implements OnChanges, OnDestroy {
  readonly Math = Math;
  readonly TOSClassTree = TOSClassTree;
  readonly TOSEquipmentType = TOSEquipmentType;
  readonly TOSItemTradable = TOSItemTradability;
  readonly TOSStat = TOSStat;

  @Input('debug')
  debug: boolean;

  @Input('entity')
  entity: TOSEntity;

  equipment: TOSEquipment;
  item: TOSItem;

  private readonly disabled: boolean;

  constructor(private element: ElementRef, private ngbTooltipConfig: NgbTooltipConfig) {
    this.disabled = ngbTooltipConfig.disableTooltip;
    this.onMouseLeave();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.disabled) return;
    if (this.debug && changes.entity && this.entity == null) return;

    if (changes.entity) {
      this.equipment = this.entity instanceof TOSEquipment ? this.entity as TOSEquipment : null;
      this.item = this.entity instanceof TOSItem ? this.entity as TOSItem : null;

      if (this.entity)  this.onMouseEnter();
      else              this.onMouseLeave();
    }
  }

  ngOnDestroy(): void {
    this.onMouseLeave();
  }

  private onMouseEnter() {
    document.body.addEventListener('mousemove', this.onMouseMove);
    this.element.nativeElement.style.visibility = 'visible';
  }

  private onMouseLeave() {
    document.body.removeEventListener('mousemove', this.onMouseMove);
    if (!this.debug) this.element.nativeElement.style.visibility = 'hidden';
  }

  private onMouseMove = (e: MouseEvent) => {
    let top = 0, bottom = window.innerHeight - this.element.nativeElement.clientHeight - 16;
    let left = 0, right = window.innerWidth - this.element.nativeElement.clientWidth - 16;

    this.element.nativeElement.style.position = 'fixed';
    this.element.nativeElement.style.left = Math.max(left, Math.min(right, e.clientX)) + 'px';
    this.element.nativeElement.style.top = Math.max(top, Math.min(bottom, e.clientY)) + 'px';
  }

}
