import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {TOSJob} from "../../../shared/domain/tos/job/tos-job.model";
import {TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";
import {TOSSkillRepository} from "../../../shared/domain/tos/skill/tos-skill.repository";
import {TOSJobRepository} from "../../../shared/domain/tos/job/tos-job.repository";
import {TOSRepositoryService} from "../../../shared/domain/tos/tos-repository.service";

@Component({
  selector: 'app-skill-builder-job-selector',
  templateUrl: './skill-builder-job-selector.component.html',
  styleUrls: ['./skill-builder-job-selector.component.scss']
})
export class SkillBuilderJobSelectorComponent implements OnChanges, OnDestroy {

  @Input() build: TOSSimulatorBuild;

  jobsAvailable: TOSJob[];
  jobsCircles: number[];
  rank: number;

  subscriptionJobs: Subscription;

  constructor() {}

  onJobClick(event: MouseEvent, job: TOSJob) {
    event.preventDefault();

    this.build.jobAdd(job);
  }

  onJobsChange(jobs: TOSJob[]) {
    this.rank = this.build.Rank + 1;
    this.jobsAvailable = this.rank > 1
      ? TOSRepositoryService.findJobsByTree(this.build.JobTree)
        .filter(value => value.unlockAvailable(this.build))
        .sort((a, b) => {
          if (a.Rank != b.Rank) return a.Rank - b.Rank
          return a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0;
        })
      : TOSRepositoryService.findJobs()
        .filter(value => value.Rank == 1);
    this.jobsCircles = this.jobsAvailable.map(value => this.build.jobCircle(value))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.build) {
      this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
      this.subscriptionJobs = this.build.Jobs.subscribe(value => this.onJobsChange(value));
    }
  }

  ngOnDestroy(): void {
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
  }

}
