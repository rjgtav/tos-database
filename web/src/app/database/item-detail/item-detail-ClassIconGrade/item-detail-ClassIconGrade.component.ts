import {Component, Input, SimpleChanges} from '@angular/core';
import {ItemDetailChildComponent} from "../item-detail-child.component";

@Component({
  selector: 'app-item-detail-ClassIconGrade',
  templateUrl: './item-detail-ClassIconGrade.component.html',
  styleUrls: ['./item-detail-ClassIconGrade.component.scss']
})
export class ItemDetailClassIconGradeComponent extends ItemDetailChildComponent {
  static readonly ICON_LARGE_HEIGHT = 220;
  static readonly ICON_LARGE_WIDTH = 351;
  static readonly ICON_SMALL_HEIGHT = 100;
  static readonly ICON_SMALL_WIDTH = 100;

  @Input('size')
  size: 'large' | 'small';

  @Input('labels')
  labels: boolean;

  ICON_HEIGHT: number;
  ICON_WIDTH: number;

  constructor() { super() }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes.size) {
      if (this.size == 'small' || !this.equipment) {
        this.ICON_HEIGHT = ItemDetailClassIconGradeComponent.ICON_SMALL_HEIGHT;
        this.ICON_WIDTH = ItemDetailClassIconGradeComponent.ICON_SMALL_WIDTH;
      } else if (this.size == 'large') {
        this.ICON_HEIGHT = ItemDetailClassIconGradeComponent.ICON_LARGE_HEIGHT;
        this.ICON_WIDTH = ItemDetailClassIconGradeComponent.ICON_LARGE_WIDTH;
      }
    }
  }

}
