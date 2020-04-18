import {Component, Input} from '@angular/core';
import {ITOSItemEquipmentV2} from "../../../shared/domain/tos/tos-domain";
import {EntityDetailV2} from "../entity-detail-v2.model";

@Component({
  selector: 'tos-entity-detail-v2-entity-description',
  templateUrl: './entity-detail-v2-entity-description.component.html',
  styleUrls: ['./entity-detail-v2-entity-description.component.scss']
})
export class EntityDetailV2EntityDescriptionComponent<ENTITY extends ITOSItemEquipmentV2> {

  @Input()    config: EntityDetailV2EntityDescription<ENTITY>;
  @Input()    entity: ENTITY;

  constructor() { }

}

export class EntityDetailV2EntityDescription<ENTITY extends ITOSItemEquipmentV2> extends EntityDetailV2<ENTITY> {}
