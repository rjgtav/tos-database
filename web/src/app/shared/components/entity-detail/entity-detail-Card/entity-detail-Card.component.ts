import {ChangeDetectorRef, Component} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";

@Component({
  selector: 'tos-entity-detail-Card',
  templateUrl: './entity-detail-Card.component.html',
  styleUrls: ['./entity-detail-Card.component.scss']
})
export class EntityDetailCardComponent extends EntityDetailChildComponent {

  constructor(changeDetector: ChangeDetectorRef) { super(changeDetector); }

}
