import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {
  ITOSItemEquipmentV2,
  ITOSItemEquipmentV2$BasicTooltipProp$Transcended
} from "../../../shared/domain/tos/tos-domain";
import {EntityDetailV2} from "../entity-detail-v2.model";
import {Subscription} from "rxjs";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-detail-v2-equipment-enhancement',
  templateUrl: './entity-detail-v2-equipment-enhancement.component.html',
  styleUrls: ['./entity-detail-v2-equipment-enhancement.component.scss']
})
export class EntityDetailV2EquipmentEnhancementComponent<ENTITY extends ITOSItemEquipmentV2> implements OnChanges, OnDestroy {

  readonly ICON_COST_ENHANCEMENT: string = 'silver';
  readonly ICON_COST_TRANSCENDENCE: string = 'icon_item_transcendence_stone';
  readonly ICON_SIZE: number = 24;

  readonly MAX_ENHANCEMENT = 40;
  readonly MAX_TRANSCENDENCE = 10;

  @Input()    config: EntityDetailV2EquipmentEnhancement<ENTITY>;
  @Input()    entity: ENTITY;

  enhancementBonus: number;
  enhancementCost: number;
  enhancementCostTotal: number;
  enhancementReady: boolean;
  enhancementSubscription: Subscription;

  transcendenceBonus: string;
  transcendenceCost: number;
  transcendenceCostTotal: number;
  transcendenceReady: boolean;
  transcendenceSubscription: Subscription;

  private readonly cacheEnhancementBonus: { [key: number]: number } = {};
  private readonly cacheEnhancementCost: { [key: number]: number } = {};
  private readonly cacheEnhancementCostTotal: { [key: number]: number } = {};

  private readonly cacheTranscendenceBonus: { [key: number]: ITOSItemEquipmentV2$BasicTooltipProp$Transcended[] } = {};
  private readonly cacheTranscendenceCost: { [key: number]: number } = {};
  private readonly cacheTranscendenceCostTotal: { [key: number]: number } = {};

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entity) {
      (async () => {
        this.enhancementReady = false;
        this.transcendenceReady = false;
        this.changeDetector.markForCheck();

        // Pre-calculate all enhancement values for a smooth interaction
        for (let enhancement = 0; enhancement <= this.MAX_ENHANCEMENT; enhancement ++) {
          this.cacheEnhancementBonus[enhancement] = await this.entity.$BasicTooltipProp$Reinforced(enhancement).toPromise();
          this.cacheEnhancementCost[enhancement] = await this.entity.$BasicTooltipProp$ReinforcedCost(enhancement).toPromise();
          this.cacheEnhancementCostTotal[enhancement] = this.cacheEnhancementCost[enhancement] + (this.cacheEnhancementCostTotal[enhancement - 1] || 0);
        }

        this.enhancementReady = true;
        this.enhancementSubscription && this.enhancementSubscription.unsubscribe();
        this.enhancementSubscription = this.entity.Reinforce_2$.subscribe(value => this.onReinforceChange(value));

        // Pre-calculate all transcendence values for a smooth interaction
        for (let transcendence = 0; transcendence <= this.MAX_TRANSCENDENCE; transcendence ++) {
          this.cacheTranscendenceBonus[transcendence] = await this.entity.$BasicTooltipProp$Transcended(transcendence).toPromise();
          this.cacheTranscendenceCost[transcendence] = await this.entity.$BasicTooltipProp$TranscendedCost(transcendence).toPromise();
          this.cacheTranscendenceCostTotal[transcendence] = this.cacheTranscendenceCost[transcendence] + (this.cacheTranscendenceCostTotal[transcendence - 1] || 0);
        }

        this.transcendenceReady = true;
        this.transcendenceSubscription && this.transcendenceSubscription.unsubscribe();
        this.transcendenceSubscription = this.entity.Transcend$.subscribe(value => this.onTranscendChange(value));
      })();
    }
  }

  ngOnDestroy(): void {
    this.enhancementSubscription && this.enhancementSubscription.unsubscribe();
    this.transcendenceSubscription && this.transcendenceSubscription.unsubscribe();
  }

  onReinforceChange(enhancement: number) {
    this.enhancementBonus = this.cacheEnhancementBonus[enhancement];
    this.enhancementCost = this.cacheEnhancementCost[enhancement];
    this.enhancementCostTotal = this.cacheEnhancementCostTotal[enhancement];

    this.changeDetector.markForCheck();
  }
  onTranscendChange(transcendence: number) {
    this.transcendenceBonus = this.cacheTranscendenceBonus[transcendence][0].value;
    this.transcendenceCost = this.cacheTranscendenceCost[transcendence];
    this.transcendenceCostTotal = this.cacheTranscendenceCostTotal[transcendence];

    this.changeDetector.markForCheck();
  }

}

export class EntityDetailV2EquipmentEnhancement<ENTITY extends ITOSItemEquipmentV2> extends EntityDetailV2<ENTITY> {}
