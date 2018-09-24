import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {Subscription} from "rxjs";
import {TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";
import {TOSJob} from "../../../shared/domain/tos/job/tos-job.model";
import {SkillSimulatorService} from "../../skill-simulator.service";
import {TOSAttribute} from "../../../shared/domain/tos/attribute/tos-attribute.model";
import {TOSSkill} from "../../../shared/domain/tos/skill/tos-skill.model";

@Component({
  selector: 'app-skill-builder-job',
  templateUrl: './skill-builder-job.component.html',
  styleUrls: ['./skill-builder-job.component.scss']
})
export class SkillBuilderJobComponent implements OnChanges, OnDestroy {

  @Input() build: TOSSimulatorBuild;
  @Input() job: TOSJob;

  attributes: TOSAttribute[];
  circle: number;
  circles: number[];
  circlesRemove: boolean[];
  ranks: number[];
  skillsByCircle: {[key: number]: TOSSkill[]};
  skillPoints: number;

  subscriptionJobs: Subscription;
  subscriptionSkillPoints: Subscription;

  constructor(private skillSimulatorService: SkillSimulatorService) { }

  onJobsChange(value: TOSJob[]) {
    this.ranks = this.build.jobRanks(this.job);
    this.circles = Array.from({length: this.ranks.length}, (x,i) => i + 1);
    this.circlesRemove = new Array(this.ranks.length);
  }

  onSkillPointsChange(value: number) {
    this.skillPoints = value
  }

  onRankRemove(rank: number) {
    this.build.jobRemove(rank);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.build || changes.job) {
      this.attributes = this.skillSimulatorService.AttributesByJob[this.job.$ID];
      this.skillsByCircle = this.skillSimulatorService.SkillsByJobAndCircle[this.job.$ID];

      this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
      this.subscriptionJobs = this.build.Jobs.subscribe(value => this.onJobsChange(value));

      this.subscriptionSkillPoints && this.subscriptionSkillPoints.unsubscribe();
      this.subscriptionSkillPoints = this.build.skillPoints(this.job).subscribe(value => this.onSkillPointsChange(value));
    }
  }

  ngOnDestroy(): void {
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
    this.subscriptionSkillPoints && this.subscriptionSkillPoints.unsubscribe();
  }

}
