import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {EntityDetailChildComponent} from "../entity-detail-child.component";
import {Subscription} from "rxjs";
import {ITOSBuild} from "../../../domain/tos/tos-domain";
import {filter} from "rxjs/operators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-entity-detail-Skill',
  templateUrl: './entity-detail-Skill.component.html',
  styleUrls: ['./entity-detail-Skill.component.scss']
})
export class EntityDetailSkillComponent extends EntityDetailChildComponent implements OnChanges, OnDestroy {

  @Input() build: ITOSBuild;
  @Input() divider: boolean;
  @Input() input: boolean;

  effectHTML: string;
  skillLevel: number;
  subscriptionSkill: Subscription;

  constructor(changeDetector: ChangeDetectorRef) { super(changeDetector) }

  async onSkillChange() {
    this.skillLevel = this.build.skillLevel(this.skill);
    this.effectHTML = await this.build.skillEffect$(this.skill, this.input).toPromise();
    this.changeDetector.markForCheck();
  }

  onSkillLevelIncrement(value: number) {
    this.build.skillLevelIncrement$(this.skill, value - this.skillLevel);
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (this.build && this.skill) {
      this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
      this.subscriptionSkill = this.build.Skill$
        .pipe(filter(value => value && value.$ID == this.skill.$ID))
        .subscribe(value => this.onSkillChange());

      this.onSkillChange()
    } else if (!this.skill) {
      this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
  }

}
