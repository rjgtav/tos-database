import {ChangeDetectorRef, Component} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";

@Component({
  selector: 'tos-entity-detail-JobAnimation',
  templateUrl: './entity-detail-JobAnimation.component.html',
  styleUrls: ['./entity-detail-JobAnimation.component.scss']
})
export class EntityDetailJobAnimationComponent extends EntityDetailChildComponent {

  constructor(changeDetector: ChangeDetectorRef) { super(changeDetector) }

}
