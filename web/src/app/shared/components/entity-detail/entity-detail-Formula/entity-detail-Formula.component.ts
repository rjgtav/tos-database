import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {Subscription} from "rxjs";
import {TOSBuild} from "../../../domain/tos/tos-build";

@Component({
  selector: 'tos-entity-detail-formula',
  templateUrl: './entity-detail-Formula.component.html',
  styleUrls: ['./entity-detail-Formula.component.scss']
})
export class EntityDetailFormulaComponent extends EntityDetailChildComponent implements OnChanges, OnDestroy {

  @Input() build: TOSBuild;
  @Input() divider: boolean;

  id: number;
  formulaHTML: string;
  level: number;
  subscriptionLevels: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) { super() }

  onSkillLevelsChange(value: { [key: number]: number }) {
    if (value[this.skill.$ID] == this.level && this.id == this.skill.$ID) return;

    this.formulaHTML = this.build.tooltipSkillEffect(this.skill);
    this.id = this.skill.$ID;
    this.level = value[this.skill.$ID];

    this.changeDetector.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (this.build && this.skill) {
      this.subscriptionLevels && this.subscriptionLevels.unsubscribe();
      this.subscriptionLevels = this.build.skillLevels(this.skill.Link_Job.$ID).subscribe(value => this.onSkillLevelsChange(value));
    }
  }

  ngOnDestroy(): void {
    this.subscriptionLevels && this.subscriptionLevels.unsubscribe();
  }

}
