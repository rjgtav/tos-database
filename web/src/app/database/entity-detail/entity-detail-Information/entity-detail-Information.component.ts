import {Component, Input} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";

@Component({
  selector: 'app-entity-detail-Information',
  templateUrl: './entity-detail-Information.component.html',
  styleUrls: ['./entity-detail-Information.component.scss']
})
export class EntityDetailInformationComponent extends EntityDetailChildComponent {

  @Input() divider: boolean;
  @Input() header: boolean;

  constructor() { super() }

}
