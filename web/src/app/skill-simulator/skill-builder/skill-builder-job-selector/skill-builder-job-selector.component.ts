import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {Subscription} from "rxjs";
import {TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";
import {TOSDomainService} from "../../../shared/domain/tos/tos-domain.service";
import {ITOSJob} from "../../../shared/domain/tos/tos-domain";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skill-builder-job-selector',
  templateUrl: './skill-builder-job-selector.component.html',
  styleUrls: ['./skill-builder-job-selector.component.scss']
})
export class SkillBuilderJobSelectorComponent implements OnChanges, OnDestroy {

  @Input() build: TOSSimulatorBuild;

  jobsAvailable: ITOSJob[];
  rank: number;

  subscriptionJobs: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) {}

  onJobClick(event: MouseEvent, job: ITOSJob) {
    event.preventDefault();

    this.build.jobAdd$(job);
  }

  onJobChange() {
    this.rank = this.build.Rank + 1;

    let observable = this.rank == 1 ? TOSDomainService.jobsByStarter(true) : TOSDomainService.jobsByTree(this.build.JobTree);
        observable.subscribe(async value => {
          let valueAvailable = await Promise.all(value.map(value => this.build.jobUnlockAvailable$(value).toPromise()));
          this.jobsAvailable = value
            .filter((value, index) => valueAvailable[index])
            .sort((a, b) => {
              if (a.Rank != b.Rank) return a.Rank - b.Rank;
              return a.$ID < b.$ID ? -1 : a.$ID > b.$ID ? 1 : 0;
            });

          this.changeDetector.markForCheck();
        });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.build) {
      this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
      this.subscriptionJobs = this.build.Job$.subscribe(value => this.onJobChange());
    }
  }

  ngOnDestroy(): void {
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
  }

}
