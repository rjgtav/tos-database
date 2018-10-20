import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";
import {TOSJob} from "../../../shared/domain/tos/job/tos-job.model";
import {TOSSkill} from "../../../shared/domain/tos/skill/tos-skill.model";
import {TOSAttribute} from "../../../shared/domain/tos/attribute/tos-attribute.model";
import {TOSRepositoryService} from "../../../shared/domain/tos/tos-repository.service";

@Component({
  selector: 'app-skill-builder-skill',
  templateUrl: './skill-builder-skill.component.html',
  styleUrls: ['./skill-builder-skill.component.scss']
})
export class SkillBuilderSkillComponent implements OnChanges, OnDestroy {

  @Input() build: TOSSimulatorBuild;
  @Input() job: TOSJob;
  @Input() skill: TOSSkill;

  attributes: TOSAttribute[];
  skillIncrementAvailablePlus: boolean;
  skillIncrementAvailableMinus: boolean;
  skillLevel: number;
  skillLevelMax: number;

  subscriptionJobs: Subscription;
  subscriptionLevel: Subscription;
  subscriptionPoints: Subscription;

  constructor() { }

  private update() {
    if (this.build) {
      this.skillIncrementAvailablePlus = this.build.skillLevelIncrementAvailable(this.skill, 1);
      this.skillIncrementAvailableMinus = this.build.skillLevelIncrementAvailable(this.skill, -1);
    }
  }

  onIncrementClick(event: MouseEvent, delta: number, rollOver?: boolean) {
    event.preventDefault();
    this.build.skillLevelIncrement(this.skill, delta, rollOver);
  }

  onJobsChange(value: TOSJob[]) {
    this.skillLevelMax = this.build.skillLevelMax(this.skill);
    this.update();
  }

  onSkillLevelsChange(value: { [key: number]: number }) {
    this.skillLevel = value[this.skill.$ID];
    this.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnDestroy();

    if (changes.build || changes.skill) {
      this.attributes = TOSRepositoryService.findAttributesBySkill(this.skill.$ID);

      this.subscriptionJobs = this.build.Jobs.subscribe(value => this.onJobsChange(value));
      this.subscriptionLevel = this.build.jobSkillLevels(this.job).subscribe(value => this.onSkillLevelsChange(value));
      this.subscriptionPoints = this.build.skillPoints(this.job).subscribe(value => this.update())
    }
  }

  ngOnDestroy(): void {
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
    this.subscriptionLevel && this.subscriptionLevel.unsubscribe();
    this.subscriptionPoints && this.subscriptionPoints.unsubscribe();
  }

}
