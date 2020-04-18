import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ITOSItemEquipmentV2} from "../../../domain/tos/tos-domain";
import {EntityTooltipV2} from "../entity-tooltip-v2.model";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-tooltip-v2-item-tradability',
  templateUrl: './entity-tooltip-v2-item-tradability.component.html',
  styleUrls: ['./entity-tooltip-v2-item-tradability.component.scss']
})
export class EntityTooltipV2ItemTradabilityComponent<ENTITY extends ITOSItemEquipmentV2> {

  @Input()      config: EntityTooltipV2Tradability<ENTITY>;
  @Input()      entity: ENTITY;

  constructor() { }

  isTradable(key: 'MarketTrade' | 'ShopTrade' | 'TeamTrade' | 'UserTrade') {
    return this.entity && this.entity[key] == 'YES' ? 'bg-success' : 'bg-secondary' ;
  }

}

export class EntityTooltipV2Tradability<ENTITY extends ITOSItemEquipmentV2> extends EntityTooltipV2<ENTITY> {}
