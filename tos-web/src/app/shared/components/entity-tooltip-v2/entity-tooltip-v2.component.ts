import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {ITOSEntityV2} from "../../domain/tos/tos-domain";
import {V2TOSEntityProxy} from "../../domain/tos/v2-tos-entity.proxy";
import {EntityTooltipV2, EntityTooltipV2Size} from "./entity-tooltip-v2.model";
import {Subscription} from "rxjs";
import {EntityTooltipV2EquipmentInfo} from "./entity-tooltip-v2-equipment-info/entity-tooltip-v2-equipment-info.component";
import {EntityTooltipV2Tradability} from "./entity-tooltip-v2-item-tradability/entity-tooltip-v2-item-tradability.component";
import {EntityTooltipV2Divider} from "./entity-tooltip-v2-divider/entity-tooltip-v2-divider.component";
import {EntityTooltipV2EquipmentUpgradability} from "./entity-tooltip-v2-equipment-upgradability/entity-tooltip-v2-equipment-upgradability.component";
import {EntityTooltipV2ItemLifeTime} from "./entity-tooltip-v2-item-lifetime/entity-tooltip-v2-item-lifetime.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-tooltip-v2',
  templateUrl: './entity-tooltip-v2.component.html',
  styleUrls: ['./entity-tooltip-v2.component.scss']
})
export class EntityTooltipV2Component<ENTITY extends ITOSEntityV2> implements OnChanges, OnDestroy {

  @Input()            config: EntityTooltipV2<ENTITY>[];
  @Input()            entity: V2TOSEntityProxy<ENTITY> | ENTITY;
  @Input()            mouse: boolean;

  private subscriptionEntity: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
  ) { }

  get isLoading() { return this.entity == null || this.entity instanceof V2TOSEntityProxy; }
  get size() { return this.mouse ? EntityTooltipV2Size.SMALL : EntityTooltipV2Size.LARGE }

  isTooltipDivider(config: EntityTooltipV2<ENTITY>) { return config instanceof EntityTooltipV2Divider }
  isTooltipEquipmentInfo(config: EntityTooltipV2<ENTITY>) { return config instanceof EntityTooltipV2EquipmentInfo }
  isToolipEquipmentUpgradability(config: EntityTooltipV2<ENTITY>) { return config instanceof EntityTooltipV2EquipmentUpgradability }
  isTooltipItemLifeTime(config: EntityTooltipV2<ENTITY>) { return config instanceof EntityTooltipV2ItemLifeTime }
  isTooltipItemTradability(config: EntityTooltipV2<ENTITY>) { return config instanceof EntityTooltipV2Tradability }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entity) {
      if (this.entity instanceof V2TOSEntityProxy) {
        this.subscriptionEntity && this.subscriptionEntity.unsubscribe();
        this.subscriptionEntity = this.entity.get().subscribe(value => this.onEntityLoad(value));
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptionEntity && this.subscriptionEntity.unsubscribe();
  }

  onEntityLoad(entity: ENTITY) {
    this.entity = entity;
    this.changeDetector.markForCheck();
  }

}
