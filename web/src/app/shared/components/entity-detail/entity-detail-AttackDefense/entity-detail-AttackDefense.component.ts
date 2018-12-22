import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";

@Component({
  selector: 'tos-entity-detail-AttackDefense',
  templateUrl: './entity-detail-AttackDefense.component.html',
  styleUrls: ['./entity-detail-AttackDefense.component.scss']
})
export class EntityDetailAttackDefenseComponent extends EntityDetailChildComponent implements OnChanges {

  @Input() anvilLevel: number;
  @Input() transcendLevel: number;

  anvilATK: number = 0;
  anvilDEF: number = 0;
  transcendATKRatio: number = 1;
  transcendMDEFRatio: number = 1;
  transcendPDEFRatio: number = 1;

  constructor(changeDetector: ChangeDetectorRef) { super(changeDetector) }

  get AttackPhysical(): number[] {
    if (this.equipment)
      return [
        Math.round(this.equipment.Stat_ATTACK_PHYSICAL_MIN * this.transcendATKRatio),
        Math.round(this.equipment.Stat_ATTACK_PHYSICAL_MAX * this.transcendATKRatio)
      ];
    if (this.monster)
      return [
        this.monster.Stat_ATTACK_PHYSICAL_MIN,
        this.monster.Stat_ATTACK_PHYSICAL_MAX
      ];

    return null;
  }

  get AttackMagical(): number[] {
    if (this.equipment)
      return [Math.round(this.equipment.Stat_ATTACK_MAGICAL * this.transcendATKRatio), null];
    if (this.monster)
      return [
        this.monster.Stat_ATTACK_MAGICAL_MIN,
        this.monster.Stat_ATTACK_MAGICAL_MAX
      ];

    return null;
  }

  get DefenseMagical(): number {
    if (this.equipment)
      return Math.round(this.equipment.Stat_DEFENSE_MAGICAL * this.transcendMDEFRatio);
    if (this.monster)
      return this.monster.Stat_DEFENSE_MAGICAL;

    return null;
  }

  get DefensePhysical(): number {
    if (this.equipment)
      return Math.round(this.equipment.Stat_DEFENSE_PHYSICAL * this.transcendPDEFRatio);
    if (this.monster)
      return this.monster.Stat_DEFENSE_PHYSICAL;

    return null;
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (changes.anvilLevel && this.equipment) {
      this.anvilATK = this.equipment.AnvilATK(this.anvilLevel);
      this.anvilDEF = this.equipment.AnvilDEF(this.anvilLevel);
    }

    if (changes.transcendLevel && this.equipment) {
      this.transcendATKRatio = 1 + this.equipment.TranscendATKRatio(this.transcendLevel);
      this.transcendMDEFRatio = 1 + this.equipment.TranscendMDEFRatio(this.transcendLevel);
      this.transcendPDEFRatio = 1 + this.equipment.TranscendPDEFRatio(this.transcendLevel);
    }
  }

}
