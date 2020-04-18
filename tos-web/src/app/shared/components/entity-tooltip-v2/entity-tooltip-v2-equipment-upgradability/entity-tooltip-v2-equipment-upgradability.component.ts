import {Component, Input} from '@angular/core';
import {ITOSItemEquipmentV2} from "../../../domain/tos/tos-domain";
import {EntityTooltipV2} from "../entity-tooltip-v2.model";

@Component({
  selector: 'tos-entity-tooltip-v2-equipment-upgradability',
  templateUrl: './entity-tooltip-v2-equipment-upgradability.component.html',
  styleUrls: ['./entity-tooltip-v2-equipment-upgradability.component.scss']
})
export class EntityTooltipV2EquipmentUpgradabilityComponent<ENTITY extends ITOSItemEquipmentV2> {

  @Input()      config: EntityTooltipV2EquipmentUpgradability<ENTITY>;
  @Input()      entity: ENTITY;

  constructor() { }

  get Durability() { return this.entity && this.entity.MaxDur / 100 }
  get Potential() { return this.entity && this.entity.MaxPR / 100 }
  get Sockets() { return this.entity && this.entity.MaxSocket_COUNT }

}

export class EntityTooltipV2EquipmentUpgradability<ENTITY extends ITOSItemEquipmentV2> extends EntityTooltipV2<ENTITY> {}
