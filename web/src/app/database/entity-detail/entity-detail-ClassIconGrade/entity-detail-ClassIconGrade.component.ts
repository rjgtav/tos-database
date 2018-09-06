import {Component, Input, NgZone, OnDestroy, SimpleChanges} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {TOSEquipmentType} from "../../../shared/domain/tos/item/equipment/tos-equipment.model";

@Component({
  selector: 'app-entity-detail-ClassIconGrade',
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

  private iconInterval;

  constructor() { super() }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes.entity) {
      clearInterval(this.iconInterval);

      if (this.equipment) {
        // In case it's a class costume (with no male/female suffix), flip between the two
        let isClassCostume =
          this.equipment.TypeEquipment == TOSEquipmentType.COSTUME_OUTFIT &&
          !this.equipment.Name.includes('(Female)') &&
          !this.equipment.Name.includes('(Male)') && (
            this.equipment.Icon.includes('_f') && !this.equipment.$ID_NAME.includes('_f') ||
            this.equipment.Icon.includes('_m') && !this.equipment.$ID_NAME.includes('_m')
          );

        if (isClassCostume) {
          this.iconInterval = setInterval(() => {
            this.equipment.Icon = this.equipment.Icon.includes('_f')
              ? this.equipment.Icon.replace('_f', '_m')
              : this.equipment.Icon.replace('_m', '_f');
          }, 1500)
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
