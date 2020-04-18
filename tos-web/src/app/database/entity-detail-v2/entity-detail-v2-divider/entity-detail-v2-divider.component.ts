import {Component, Input} from '@angular/core';
import {ITOSEntityV2} from "../../../shared/domain/tos/tos-domain";
import {EntityDetailV2} from "../entity-detail-v2.model";

@Component({
  selector: 'tos-entity-detail-v2-divider',
  templateUrl: './entity-detail-v2-divider.component.html',
  styleUrls: ['./entity-detail-v2-divider.component.scss']
})
export class EntityDetailV2DividerComponent<ENTITY extends ITOSEntityV2> {

  @Input()    config: EntityDetailV2Divider<ENTITY>;
  @Input()    entity: ENTITY;

  constructor() { }

}

export class EntityDetailV2Divider<ENTITY extends ITOSEntityV2> extends EntityDetailV2<ENTITY> {

  constructor(public title: string) { super() }

}
