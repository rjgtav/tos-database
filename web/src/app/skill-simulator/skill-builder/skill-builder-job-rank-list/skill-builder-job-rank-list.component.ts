import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {TOSBuild, TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";
import {Subscription} from "rxjs";
import {TOSJob} from "../../../shared/domain/tos/job/tos-job.model";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-skill-builder-job-rank-list',
  templateUrl: './skill-builder-job-rank-list.component.html',
  styleUrls: ['./skill-builder-job-rank-list.component.scss']
})
export class SkillBuilderJobRankListComponent implements OnChanges, OnDestroy {

  faTrashAlt = faTrashAlt;
  TOSBuild = TOSBuild;

  @Input() build: TOSSimulatorBuild;

  jobs: TOSJob[];
  jobsCircle: number[];
  jobsHover: boolean[];

  subscriptionJobs: Subscription;

  constructor() { }

  onRemoveClick(event: MouseEvent, rank: number) {
    event.preventDefault();
    this.build.jobRemove(rank);
  }

  onJobsChange(value: TOSJob[]) {
    this.jobs = value;
    this.jobsCircle = [];
    this.jobsHover = [];

    this.jobs.reduce((accumulator, value) => {
      if (accumulator[value.$ID]) this.jobsCircle.push(accumulator[value.$ID] = accumulator[value.$ID] + 1);
      else                        this.jobsCircle.push(accumulator[value.$ID] = 1);

      return accumulator;
    }, {});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnDestroy();

    if (this.build)
      this.subscriptionJobs = this.build.Jobs.subscribe(value => this.onJobsChange(value));
  }

  ngOnDestroy(): void {
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
  }

}
