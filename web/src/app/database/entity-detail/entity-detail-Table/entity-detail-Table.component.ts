import {Component, Input} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";

@Component({
  selector: 'app-entity-detail-Table',
  templateUrl: './entity-detail-Table.component.html',
  styleUrls: ['./entity-detail-Table.component.scss']
})
export class EntityDetailTableComponent extends EntityDetailChildComponent {

  @Input() column: string;
  @Input() link: string;
  @Input() divider: boolean;
  @Input() header: string;

  constructor() { super() }

}
