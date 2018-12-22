import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {TOSGemType} from "../../../domain/tos/tos-domain";

@Component({
  selector: 'tos-entity-detail-Gem',
  templateUrl: './entity-detail-Gem.component.html',
  styleUrls: ['./entity-detail-Gem.component.scss']
})
export class EntityDetailGemComponent extends EntityDetailChildComponent {
  readonly TOSGemType = TOSGemType;

  level: number = 1;

  @Input() editable: boolean = true;
  @Input() header: boolean;

  constructor(changeDetector: ChangeDetectorRef) { super(changeDetector); }

}
