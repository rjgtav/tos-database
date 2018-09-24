import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {NgbTooltipConfig} from "@ng-bootstrap/ng-bootstrap";
import {TOSItem, TOSItemTradability} from "../../domain/tos/item/tos-item.model";
import {TOSClassTree, TOSElement, TOSEntity, TOSStat} from "../../domain/tos/entity/tos-entity.model";
import {TOSCard} from "../../domain/tos/item/card/tos-card.model";
import {TOSEquipment} from "../../domain/tos/item/equipment/tos-equipment.model";
import {TOSMonsterRace} from "../../domain/tos/monster/tos-monster.model";
import {TOSSkill} from "../../domain/tos/skill/tos-skill.model";
import {TOSAttribute} from "../../domain/tos/attribute/tos-attribute.model";
import {TOSBuild} from "../../domain/tos/tos-build";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-tooltip',
  templateUrl: './entity-tooltip.component.html',
  styleUrls: ['./entity-tooltip.component.scss']
})
export class EntityTooltipComponent implements OnChanges, OnDestroy {
  readonly Math = Math;
  readonly TOSClassTree = TOSClassTree;
  readonly TOSElement = TOSElement;
  readonly TOSMonsterRace = TOSMonsterRace;
  readonly TOSEquipmentType = TOSEquipment;
  readonly TOSItemTradable = TOSItemTradability;
  readonly TOSStat = TOSStat;

  private _isVisible: boolean;

  @Input() build: TOSBuild;
  @Input() debug: boolean;
  @Input() tooltip: TOSEntity;

  entity: TOSEntity;
  attribute: TOSAttribute;
  card: TOSCard;
  equipment: TOSEquipment;
  item: TOSItem;
  skill: TOSSkill;

  constructor(private element: ElementRef, private ngbTooltipConfig: NgbTooltipConfig, private zone: NgZone) {
    this.onMouseLeave();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tooltip) {
      if (this.tooltip) {
        this.entity = this.tooltip;

        this.card = this.entity instanceof TOSCard ? this.entity as TOSCard : null;
        this.attribute = this.entity instanceof TOSAttribute ? this.entity as TOSAttribute : null;
        this.equipment = this.entity instanceof TOSEquipment ? this.entity as TOSEquipment : null;
        this.item = this.entity instanceof TOSItem ? this.entity as TOSItem : null;
        this.skill = this.entity instanceof TOSSkill ? this.entity as TOSSkill : null;
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
