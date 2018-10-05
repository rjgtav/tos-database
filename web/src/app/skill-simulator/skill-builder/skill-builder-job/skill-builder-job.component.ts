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
import {faMinus, faPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-skill-builder-job',
  templateUrl: './skill-builder-job.component.html',
  styleUrls: ['./skill-builder-job.component.scss']
})
export class SkillBuilderJobComponent implements OnChanges, OnDestroy {

  faTrashAlt = faTrashAlt;
  faMinus = faMinus;
  faPlus = faPlus;

  @Input() build: TOSSimulatorBuild;
  @Input() job: TOSJob;

  attributes: TOSAttribute[];
  circles: number[];
  circlesRemove: boolean[];
  isOpen: boolean;
  ranks: number[];
  skills: TOSSkill[];
  skillsByCircle: {[key: number]: TOSSkill[]};
  skillPoints: number;

  subscriptionJobs: Subscription;
  subscriptionSkillPoints: Subscription;

  constructor(private skillSimulatorService: SkillSimulatorService) { }

  onJobsChange(value: TOSJob[]) {
    this.ranks = this.build.jobRanks(this.job);
    this.circles = Array.from({length: this.ranks.length}, (x,i) => i + 1);
    this.circlesRemove = new Array(this.ranks.length);
    this.skills = this.skillSimulatorService.SkillsByJob[this.job.$ID]
      .filter(skill => skill.RequiredCircle <= this.circles.length)
      .sort((a, b) => a.RequiredCircle - b.RequiredCircle);
  }

  onRemoveClick(event: MouseEvent) {
    event.preventDefault();

    let rank = this.build.jobRanks(this.job).pop();
    this.build.jobRemove(rank);
  }

  onSkillPointsChange(value: number) {
    this.skillPoints = value
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
