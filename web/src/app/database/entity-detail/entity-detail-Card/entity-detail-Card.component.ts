import { Component } from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";

@Component({
  selector: 'app-entity-detail-Card',
  templateUrl: './entity-detail-Card.component.html',
  styleUrls: ['./entity-detail-Card.component.scss']
})
export class EntityDetailCardComponent extends EntityDetailChildComponent {

  constructor() { super(); }

}
