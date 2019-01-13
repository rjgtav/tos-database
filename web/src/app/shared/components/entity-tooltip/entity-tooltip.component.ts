import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {NgbTooltipConfig} from "@ng-bootstrap/ng-bootstrap";
import {TOSItem} from "../../domain/tos/item/tos-item.model";
import {TOSEntity} from "../../domain/tos/tos-entity.model";
import {TOSCard} from "../../domain/tos/item/card/tos-card.model";
import {TOSEquipment} from "../../domain/tos/item/equipment/tos-equipment.model";
import {TOSSkill} from "../../domain/tos/skill/tos-skill.model";
import {TOSAttribute} from "../../domain/tos/attribute/tos-attribute.model";
import {TOSMap} from "../../domain/tos/map/tos-map.model";
import {TOSJob} from "../../domain/tos/job/tos-job.model";
import {
  ITOSBuild,
  TOSClassTree,
  TOSElement,
  TOSEquipmentType,
  TOSItemTradability,
  TOSMonsterRace,
  TOSStat
} from "../../domain/tos/tos-domain";
import {TOSDatabaseBuild} from "../../domain/tos/tos-build";
import {TOSRegionService} from "../../domain/tos-region";

const PADDING = 8;

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
  readonly TOSEquipmentType = TOSEquipmentType;
  readonly TOSItemTradable = TOSItemTradability;
  readonly TOSStat = TOSStat;

  private _isVisible: boolean;

  @Input() build: ITOSBuild;
  @Input() debug: boolean;
  @Input() tooltip: TOSEntity;

  entity: TOSEntity;
  attribute: TOSAttribute;
  card: TOSCard;
  equipment: TOSEquipment;
  item: TOSItem;
  job: TOSJob;
  map: TOSMap;
  skill: TOSSkill;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
    private ngbTooltipConfig: NgbTooltipConfig,
    private zone: NgZone
  ) {
    this.onMouseLeave();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tooltip) {
      this.tooltip ? this.onMouseEnter() : this.onMouseLeave();

      this.entity = this.tooltip;
      this.card = this.entity instanceof TOSCard ? this.entity as TOSCard : null;
      this.attribute = this.entity instanceof TOSAttribute ? this.entity as TOSAttribute : null;
      this.equipment = this.entity instanceof TOSEquipment ? this.entity as TOSEquipment : null;
      this.item = this.entity instanceof TOSItem ? this.entity as TOSItem : null;
      this.job = this.entity instanceof TOSJob ? this.entity as TOSJob : null;
      this.map = this.entity instanceof TOSMap ? this.entity as TOSMap : null;
      this.skill = this.entity instanceof TOSSkill ? this.entity as TOSSkill : null;

      if (this.skill) {
        if (this.build == null || this.build instanceof TOSDatabaseBuild) {
          this.build = null;
          this.skill.Link_Job.subscribe(async value => {
            let build = TOSDatabaseBuild.new(TOSRegionService.get());
            await build.jobAdd$(value); // Note: we need to add them 3 times, as on pre-Re:Build the level max scales with the selected Job circle
            await build.jobAdd$(value);
            await build.jobAdd$(value);

            this.build = build;
            this.changeDetector.markForCheck();
          });
        }
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

    this.zone.runOutsideAngular(() => {
      let x = e.clientX, y = e.clientY;
      let height = this.element.nativeElement.clientHeight, width = this.element.nativeElement.clientWidth;
      let top = 0, bottom = window.innerHeight - height - PADDING * 2;
      let left = 0, right = window.innerWidth - width - PADDING * 2;

      if (x > right)  x = x - width - PADDING;
      if (y > bottom) y = y - height - PADDING;

      this.element.nativeElement.style.left = Math.max(left, Math.min(right, x)) + 'px';
      this.element.nativeElement.style.top = Math.max(top, Math.min(bottom, y)) + 'px';
    })
  }

}
