import {ChangeDetectorRef, Component, Input, NgZone, OnDestroy, SimpleChanges} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {TOSEquipmentType} from "../../../domain/tos/tos-domain";

@Component({
  selector: 'tos-entity-detail-ClassIconGrade',
  templateUrl: './entity-detail-ClassIconGrade.component.html',
  styleUrls: ['./entity-detail-ClassIconGrade.component.scss']
})
export class EntityDetailClassIconGradeComponent extends EntityDetailChildComponent implements OnDestroy {
  static readonly ICON_SMALL_HEIGHT = 100;
  static readonly ICON_SMALL_WIDTH = 100;
  static readonly ICON_LARGE_HEIGHT = 229;
  static readonly ICON_LARGE_WIDTH = 351;
  static readonly ICON_XLARGE_HEIGHT = 440;
  static readonly ICON_XLARGE_WIDTH = 330;

  @Input('size')
  size: 'small' | 'large' | 'xlarge';

  @Input('labels')
  labels: boolean;

  ICON_HEIGHT: number;
  ICON_WIDTH: number;

  private iconInterval: any;
  private iconIntervalChange: boolean;

  constructor(
    public changeDetector: ChangeDetectorRef,
    private zone: NgZone,
  ) { super(changeDetector) }

  get Icon(): string {
    if (this.card)
      return this.card.IconTooltip;

    if (this.equipment && this.iconInterval)
      return this.iconIntervalChange
        ? this.equipment.Icon.replace('_f', '_m')
        : this.equipment.Icon.replace('_m', '_f');

    return this.entity.Icon;
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes.entity) {
      clearInterval(this.iconInterval);

      // In case it's a class costume (with no male/female suffix), flip between the two
      if (this.equipment && this.equipment.Icon) {
        let isClassCostume =
          this.equipment.TypeEquipment == TOSEquipmentType.COSTUME_OUTFIT &&
          !this.equipment.Name.includes('(Female)') &&
          !this.equipment.Name.includes('(Male)') && (
            this.equipment.Icon.includes('_f') && !this.equipment.$ID_NAME.includes('_f') ||
            this.equipment.Icon.includes('_m') && !this.equipment.$ID_NAME.includes('_m')
          );

        if (isClassCostume) {
          this.zone.runOutsideAngular(() => this.iconInterval = setInterval(() => {
            this.iconIntervalChange = !this.iconIntervalChange;
            this.changeDetector.detectChanges();
          }, 1500));
        }
      }
    }

    if (changes.size) {
      if (this.size == 'xlarge') {
        this.ICON_HEIGHT = EntityDetailClassIconGradeComponent.ICON_XLARGE_HEIGHT;
        this.ICON_WIDTH = EntityDetailClassIconGradeComponent.ICON_XLARGE_WIDTH;
      } else if (this.size == 'large') {
        this.ICON_HEIGHT = EntityDetailClassIconGradeComponent.ICON_LARGE_HEIGHT;
        this.ICON_WIDTH = EntityDetailClassIconGradeComponent.ICON_LARGE_WIDTH;
      } else if (this.size == 'small' || !this.equipment) {
        this.ICON_HEIGHT = EntityDetailClassIconGradeComponent.ICON_SMALL_HEIGHT;
        this.ICON_WIDTH = EntityDetailClassIconGradeComponent.ICON_SMALL_WIDTH;
      }
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.iconInterval);
  }

}
