import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {TOSJob} from "../../../shared/domain/tos/job/tos-job.model";
import {SkillSimulatorService} from "../../skill-simulator.service";
import {TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";

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

  constructor(private skillSimulatorService: SkillSimulatorService) {}

  onJobClick(event: MouseEvent, job: TOSJob) {
    event.preventDefault();

    this.build.jobAdd(job, this.skillSimulatorService.SkillsByJob[job.$ID]);
  }

  onJobsChange(jobs: TOSJob[]) {
    this.rank = this.build.Rank + 1;
    this.jobsAvailable = this.rank > 1
      ? this.skillSimulatorService.JobsByClassTree[this.build.JobTree].filter(value => this.build.jobUnlockAvailable(value))
      : this.skillSimulatorService.JobsStarter;
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
