import {Component} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";

@Component({
  selector: 'tos-entity-detail-Book',
  templateUrl: './entity-detail-Book.component.html',
  styleUrls: ['./entity-detail-Book.component.scss']
})
export class EntityDetailBookComponent extends EntityDetailChildComponent {

  page: number = 1;

  constructor() { super() }

  onSlide(event: any) {
    if (event.direction == 'left')   this.page ++;
    if (event.direction == 'right')  this.page --;
  }


}
