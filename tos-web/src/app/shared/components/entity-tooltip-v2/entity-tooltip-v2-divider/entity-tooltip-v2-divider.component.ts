import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ITOSEntityV2} from "../../../domain/tos/tos-domain";
import {EntityTooltipV2} from "../entity-tooltip-v2.model";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-tooltip-v2-divider',
  templateUrl: './entity-tooltip-v2-divider.component.html',
  styleUrls: ['./entity-tooltip-v2-divider.component.scss']
})
export class EntityTooltipV2DividerComponent<ENTITY extends ITOSEntityV2> {

  @Input()      config: EntityTooltipV2Divider<ENTITY>;
  @Input()      entity: ENTITY;

  constructor() { }

}

export class EntityTooltipV2Divider<ENTITY extends ITOSEntityV2> extends EntityTooltipV2<ENTITY> {

  constructor(
    public title: string,
  ) { super() }

}
