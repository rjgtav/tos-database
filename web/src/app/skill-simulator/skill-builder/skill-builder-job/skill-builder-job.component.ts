import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {Subscription} from "rxjs";
import {TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";
import {TOSJob} from "../../../shared/domain/tos/job/tos-job.model";
import {TOSAttribute} from "../../../shared/domain/tos/attribute/tos-attribute.model";
import {TOSSkill} from "../../../shared/domain/tos/skill/tos-skill.model";
import {faMinus, faPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {TOSRepositoryService} from "../../../shared/domain/tos/tos-repository.service";

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
  skillPoints: number;

  subscriptionJobs: Subscription;
  subscriptionSkillPoints: Subscription;

  constructor() { }

  onJobsChange(value: TOSJob[]) {
    this.ranks = this.build.jobRanks(this.job.$ID);
    this.circles = Array.from({length: this.ranks.length}, (x,i) => i + 1);
    this.circlesRemove = new Array(this.ranks.length);
    this.skills = TOSRepositoryService.findSkillsByJob(this.job.$ID)
      .filter(skill => skill.RequiredCircle <= this.circles.length)
      .sort((a, b) => a.RequiredCircle - b.RequiredCircle);
  }

  onRemoveClick(event: MouseEvent) {
    event.preventDefault();

    let rank = this.ranks.pop();
    this.build.jobRemove(rank);
  }

  onSkillPointsChange(value: number) {
    this.skillPoints = value
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnDestroy();

    if (changes.build || changes.job) {
      this.attributes = TOSRepositoryService.findAttributesByJob(this.job.$ID);

      this.subscriptionJobs = this.build.Jobs.subscribe(value => this.onJobsChange(value));
      this.subscriptionSkillPoints = this.build.skillPoints(this.job).subscribe(value => this.onSkillPointsChange(value));
    }
  }

  ngOnDestroy(): void {
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
    this.subscriptionSkillPoints && this.subscriptionSkillPoints.unsubscribe();
  }

}
