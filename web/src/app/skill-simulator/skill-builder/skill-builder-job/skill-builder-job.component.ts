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
import {faMinus, faPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {TOSDomainService} from "../../../shared/domain/tos/tos-domain.service";
import {ITOSAttribute, ITOSJob, ITOSSkill} from "../../../shared/domain/tos/tos-domain";

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

  attributes: ITOSAttribute[];
  circles: number[];
  circlesRemove: boolean[];
  isOpen: boolean;
  ranks: number[];
  skills: ITOSSkill[];
  skillPoints: number;

  subscriptionJobs: Subscription;
  subscriptionSkillPoints: Subscription;

  constructor() { }

  onJobsChange(value: ITOSJob[]) {
    this.ranks = this.build.jobRanks(this.job);
    this.circles = Array.from({length: this.ranks.length}, (x,i) => i + 1);
    this.circlesRemove = new Array(this.ranks.length);
    this.skills = TOSDomainService.skillsByJob[this.job.$ID]
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
      this.attributes = TOSDomainService.attributesByJob[this.job.$ID].filter(value => !value.Link_Skill);

      this.subscriptionJobs = this.build.Jobs.subscribe(value => this.onJobsChange(value));
      this.subscriptionSkillPoints = this.build.skillPoints(this.job).subscribe(value => this.onSkillPointsChange(value));
    }
  }

  ngOnDestroy(): void {
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
    this.subscriptionSkillPoints && this.subscriptionSkillPoints.unsubscribe();
  }

}
