import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {TOSJob} from "../../../shared/domain/tos/job/tos-job.model";
import {SkillSimulatorService} from "../../skill-simulator.service";
import {TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";

@Component({
  selector: 'app-skill-builder-job-choose',
  templateUrl: './skill-builder-job-choose.component.html',
  styleUrls: ['./skill-builder-job-choose.component.scss']
})
export class SkillBuilderJobChooseComponent implements OnChanges, OnDestroy {

  @Input() build: TOSSimulatorBuild;

  jobsAvailable: TOSJob[];
  rank: number;

  subscriptionJobs: Subscription;

  constructor(private skillSimulatorService: SkillSimulatorService) {}

  onJobClick(event: MouseEvent, job: TOSJob) {
    event.preventDefault();

    this.build.jobAdd(job);
  }

  onJobsChange(jobs: TOSJob[]) {
    this.rank = this.build.Rank + 1;
    this.jobsAvailable = this.rank > 1
      ? this.skillSimulatorService.JobsByClassTree[this.build.JobTree].filter(value => this.build.jobUnlockAvailable(value))
      : this.skillSimulatorService.JobsStarter;
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
