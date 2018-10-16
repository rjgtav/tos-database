import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {Subscription} from "rxjs";
import {TOSBuild} from "../../../domain/tos/tos-build";

@Component({
  selector: 'tos-entity-detail-Skill',
  templateUrl: './entity-detail-Skill.component.html',
  styleUrls: ['./entity-detail-Skill.component.scss']
})
export class EntityDetailSkillComponent extends EntityDetailChildComponent implements OnChanges, OnDestroy {

  @Input() build: TOSBuild;
  @Input() divider: boolean;
  @Input() input: boolean;

  effectHTML: string;
  skillLevel: number;
  subscriptionLevels: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) { super() }

  onSkillLevelsChange(value: { [key: number]: number }) {
    if (value[this.skill.$ID] == this.skillLevel) return;

    this.skillLevel = value[this.skill.$ID];
    this.effectHTML = this.build.skillEffect(this.skill, this.input);

    this.changeDetector.detectChanges();
  }

  onSkillLevelChange(value: number) {
    this.build.skillLevelIncrement(this.skill, value - this.skillLevel);
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.ngOnDestroy();

    if (this.build && this.skill)
      this.subscriptionLevels = this.build.jobSkillLevels(this.skill.Link_Job).subscribe(value => this.onSkillLevelsChange(value));
  }

  ngOnDestroy(): void {
    this.subscriptionLevels && this.subscriptionLevels.unsubscribe();
  }

}
