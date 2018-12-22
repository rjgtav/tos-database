import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {RANK_LIMIT, TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";
import {Subscription} from "rxjs";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {ITOSJob} from "../../../shared/domain/tos/tos-domain";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skill-builder-job-rank-list',
  templateUrl: './skill-builder-job-rank-list.component.html',
  styleUrls: ['./skill-builder-job-rank-list.component.scss']
})
export class SkillBuilderJobRankListComponent implements OnChanges, OnDestroy {

  faTrashAlt = faTrashAlt;
  RANK_LIMIT = RANK_LIMIT;

  @Input() build: TOSSimulatorBuild;

  jobs: ITOSJob[];
  jobsCircle: number[];
  jobsHover: boolean[];

  subscriptionJobs: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) { }

  onRemoveClick(event: MouseEvent, rank: number) {
    event.preventDefault();
    this.build.jobRemove$(rank);
  }

  onJobChange() {
    this.jobs = this.build.Jobs;
    this.jobsCircle = [];
    this.jobsHover = [];

    this.jobs.reduce((accumulator, value) => {
      if (accumulator[value.$ID]) this.jobsCircle.push(accumulator[value.$ID] = accumulator[value.$ID] + 1);
      else                        this.jobsCircle.push(accumulator[value.$ID] = 1);

      return accumulator;
    }, {});

    this.changeDetector.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.build) {
      this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
      this.subscriptionJobs = this.build.Job$.subscribe(value => this.onJobChange());
    }
  }

  ngOnDestroy(): void {
    this.changeDetector.detach();
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
  }

}
