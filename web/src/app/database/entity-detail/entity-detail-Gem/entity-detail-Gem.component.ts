import {Component, Input} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {TOSGemType} from "../../../shared/domain/tos/item/gem/tos-gem.model";

@Component({
  selector: 'app-entity-detail-Gem',
  templateUrl: './entity-detail-Gem.component.html',
  styleUrls: ['./entity-detail-Gem.component.scss']
})
export class EntityDetailGemComponent extends EntityDetailChildComponent {
  readonly TOSGemType = TOSGemType;

  level: number = 1;

  @Input() divider: boolean;
  @Input() enabled: boolean = true;
  @Input() header: boolean;

  constructor() { super(); }

}
