import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ITOSItemV2} from "../../../domain/tos/tos-domain";
import {faHourglassStart} from "@fortawesome/free-solid-svg-icons";
import {EntityTooltipV2} from "../entity-tooltip-v2.model";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-tooltip-v2-item-lifetime',
  templateUrl: './entity-tooltip-v2-item-lifetime.component.html',
  styleUrls: ['./entity-tooltip-v2-item-lifetime.component.scss']
})
export class EntityTooltipV2ItemLifetimeComponent<ENTITY extends ITOSItemV2> {

  readonly faHourglassStart = faHourglassStart;

  @Input()    config: EntityTooltipV2ItemLifeTime<ENTITY>;
  @Input()    entity: ENTITY;

  constructor() { }

}

export class EntityTooltipV2ItemLifeTime<ENTITY extends ITOSItemV2> extends EntityTooltipV2<ENTITY> {}
