import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {NgbTooltipConfig} from "@ng-bootstrap/ng-bootstrap";
import {TOSClassTree, TOSElement, TOSEntity, TOSStat} from "../../shared/domain/tos/entity/tos-entity.model";
import {TOSEquipment, TOSEquipmentType} from "../../shared/domain/tos/item/equipment/tos-equipment.model";
import {TOSItem, TOSItemTradability} from "../../shared/domain/tos/item/tos-item.model";
import {TOSCard} from "../../shared/domain/tos/item/card/tos-card.model";
import {TOSMonsterRace} from "../../shared/domain/tos/monster/tos-monster.model";

@Component({
  selector: 'app-entity-tooltip',
  templateUrl: './entity-tooltip.component.html',
  styleUrls: ['./entity-tooltip.component.scss']
})
export class EntityTooltipComponent implements OnChanges, OnDestroy {
  readonly Math = Math;
  readonly TOSClassTree = TOSClassTree;
  readonly TOSElement = TOSElement;
  readonly TOSMonsterRace = TOSMonsterRace;
  readonly TOSEquipmentType = TOSEquipmentType;
  readonly TOSItemTradable = TOSItemTradability;
  readonly TOSStat = TOSStat;

  private _isVisible: boolean;

  @Input('debug')
  debug: boolean;

  @Input('tooltip')
  tooltip: TOSEntity;

  entity: TOSEntity;
  card: TOSCard;
  equipment: TOSEquipment;
  item: TOSItem;

  private readonly disabled: boolean;

  constructor(private element: ElementRef, private ngbTooltipConfig: NgbTooltipConfig, private zone: NgZone) {
    this.disabled = ngbTooltipConfig.disableTooltip;
    this.onMouseLeave();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.disabled) return;

    if (this.disabled) return;

    if (changes.tooltip) {
      if (this.tooltip) {
        this.entity = this.tooltip;
        this.card = this.entity instanceof TOSCard ? this.entity as TOSCard : null;
        this.equipment = this.entity instanceof TOSEquipment ? this.entity as TOSEquipment : null;
        this.item = this.entity instanceof TOSItem ? this.entity as TOSItem : null;
        this.onMouseEnter();
      } else {
        this.onMouseLeave()
      }
    }
  }

  ngOnDestroy(): void {
    this.onMouseLeave();
  }

  private onMouseEnter() {
    if (this._isVisible == (this._isVisible = true)) return;

    this.zone.runOutsideAngular(() => {
      document.body.addEventListener('mousemove', this.onMouseMove);
      this.element.nativeElement.style.visibility = 'visible';
    });
  }

  private onMouseLeave() {
    if (this._isVisible == (this._isVisible = false)) return;

    this.zone.runOutsideAngular(() => {
      document.body.removeEventListener('mousemove', this.onMouseMove);
      if (!this.debug) this.element.nativeElement.style.visibility = 'hidden';
    });
  }

  private onMouseMove = (e: MouseEvent) => {
    e.preventDefault();

    let top = 0, bottom = window.innerHeight - this.element.nativeElement.clientHeight - 16;
    let left = 0, right = window.innerWidth - this.element.nativeElement.clientWidth - 16;

    this.element.nativeElement.style.left = Math.max(left, Math.min(right, e.clientX)) + 'px';
    this.element.nativeElement.style.top = Math.max(top, Math.min(bottom, e.clientY)) + 'px';
  }

}
