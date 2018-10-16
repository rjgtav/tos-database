import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";

@Component({
  selector: 'tos-entity-detail-Enhancement',
  templateUrl: './entity-detail-Enhancement.component.html',
  styleUrls: ['./entity-detail-Enhancement.component.scss']
})
export class EntityDetailEnhancementComponent extends EntityDetailChildComponent implements OnChanges {

  @Input() header: string;

  @Input() anvilLevel: number;
  @Output() anvilLevelChange: EventEmitter<number> = new EventEmitter();

  anvilAvailable: boolean;
  anvilBonus: number = 0;
  anvilSilver: number = 0;
  anvilSilverTotal: number = 0;

  attributeAvailable: boolean;
  attributeLevel: number = 0;
  attributePoints: number = 0;
  attributeSilver: number = 0;
  attributeSilverTotal: number = 0;

  @Input() transcendLevel: number;
  @Output() transcendLevelChange: EventEmitter<number> = new EventEmitter();

  transcendAvailable: boolean;
  transcendBonus: number = 0;
  transcendShards: number = 0;
  transcendShardsTotal: number = 0;

  constructor() { super() }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    this.anvilAvailable = this.equipment && this.equipment.AnvilSilver(1) > 0;
    this.attributeAvailable = !!this.attribute;
    this.transcendAvailable = this.equipment && this.equipment.TranscendShards(1) > 0;
  }

  onAnvilChange(newValue) {
    if (this.anvilLevel == newValue) return;

    this.anvilLevel = newValue;
    this.anvilLevelChange.emit(newValue);

    this.anvilBonus = this.equipment.AnvilDEF(this.anvilLevel) || this.equipment.AnvilATK(this.anvilLevel);
    this.anvilSilver = this.equipment.AnvilSilver(this.anvilLevel);
    this.anvilSilverTotal = this.equipment.AnvilSilverTotal(this.anvilLevel);
  }

  onAttributeChange(newValue) {
    if (this.attributeLevel == newValue) return;

    this.attributeLevel = newValue;
    this.attributePoints = this.attribute.Price(this.attributeLevel);
    this.attributeSilver = this.attributePoints * 1000;
    this.attributeSilverTotal = this.attribute.PriceTotal(this.attributeLevel) * 1000;
  }

  onTranscendChange(newValue) {
    if (this.transcendLevel == newValue) return;

    this.transcendLevel = newValue;
    this.transcendLevelChange.emit(newValue);

    this.transcendBonus = this.equipment.TranscendATKRatio(this.transcendLevel);
    this.transcendShards = this.equipment.TranscendShards(this.transcendLevel);
    this.transcendShardsTotal = this.equipment.TranscendShardsTotal(this.transcendLevel);
  }

  onWheel(event) {} // Do nothing.. just so the user can use the wheel to control the input

}
