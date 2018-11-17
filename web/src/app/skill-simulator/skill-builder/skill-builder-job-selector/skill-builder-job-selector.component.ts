import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {TOSJob} from "../../../shared/domain/tos/job/tos-job.model";
import {TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";
import {TOSRepositoryService} from "../../../shared/domain/tos/tos-repository.service";
import {TOSJobRepository} from "../../../shared/domain/tos/job/tos-job.repository";
import {TOSDomainService} from "../../../shared/domain/tos/tos-domain.service";
import {ITOSJob} from "../../../shared/domain/tos/tos-domain";

@Component({
  selector: 'app-skill-builder-job-selector',
  templateUrl: './skill-builder-job-selector.component.html',
  styleUrls: ['./skill-builder-job-selector.component.scss']
})
export class SkillBuilderJobSelectorComponent implements OnChanges, OnDestroy {

  @Input() build: TOSSimulatorBuild;

  jobsAvailable: ITOSJob[];
  jobsCircles: number[];
  rank: number;

  subscriptionJobs: Subscription;

  constructor() {}

  onJobClick(event: MouseEvent, job: ITOSJob) {
    event.preventDefault();

    this.build.jobAdd(job);
  }

  onJobsChange(jobs: ITOSJob[]) {
    this.rank = this.build.Rank + 1;
    this.jobsAvailable = this.rank > 1
      ? TOSDomainService.jobsByTree[this.build.JobTree]
        .filter(value => this.build.jobUnlockAvailable(value))
        .sort((a, b) => {
          if (a.Rank != b.Rank) return a.Rank - b.Rank;
          return a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0;
        })
      : TOSDomainService.jobs
        .filter(value => value.Rank == 1);
    this.jobsCircles = this.jobsAvailable.map(value => this.build.jobCircle(value))
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnDestroy();

    if (changes.build)
      this.subscriptionJobs = this.build.Jobs.subscribe(value => this.onJobsChange(value));
  }

  ngOnDestroy(): void {
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
  }

}
