import {Component, Input} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";

@Component({
  selector: 'tos-entity-detail-Stats',
  templateUrl: './entity-detail-Stats.component.html',
  styleUrls: ['./entity-detail-Stats.component.scss']
})
export class EntityDetailStatsComponent extends EntityDetailChildComponent {

  constructor() { super() }

}
