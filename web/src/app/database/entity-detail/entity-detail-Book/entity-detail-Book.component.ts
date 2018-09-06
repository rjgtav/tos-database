import {Component} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {
  NgbSlideEvent,
  NgbSlideEventDirection
} from "../../../../../node_modules/@ng-bootstrap/ng-bootstrap/carousel/carousel";

@Component({
  selector: 'app-entity-detail-Book',
  templateUrl: './entity-detail-Book.component.html',
  styleUrls: ['./entity-detail-Book.component.scss']
})
export class EntityDetailBookComponent extends EntityDetailChildComponent {

  page: number = 1;

  constructor() { super() }

  onSlide(event: NgbSlideEvent) {
    if (event.direction == NgbSlideEventDirection.LEFT)   this.page ++;
    if (event.direction == NgbSlideEventDirection.RIGHT)  this.page --;
  }


}
