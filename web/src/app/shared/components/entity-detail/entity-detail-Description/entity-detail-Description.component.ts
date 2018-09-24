import {Component, Input} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";

@Component({
  selector: 'tos-entity-detail-Description',
  templateUrl: './entity-detail-Description.component.html',
  styleUrls: ['./entity-detail-Description.component.scss']
})
export class EntityDetailDescriptionComponent extends EntityDetailChildComponent {

  @Input() divider: boolean;
  @Input() header: boolean;

  constructor() { super() }

}
