import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";
import {Subscription} from "rxjs";
import {TOSStat, TOSStatService} from "../../../shared/domain/tos/tos-domain";
import {faMinusCircle, faPlusCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skill-builder-stat-selector',
  templateUrl: './skill-builder-stat-selector.component.html',
  styleUrls: ['./skill-builder-stat-selector.component.scss']
})
export class SkillBuilderStatSelectorComponent implements OnChanges, OnDestroy {
  readonly faMinusCircle = faMinusCircle;
  readonly faPlusCircle = faPlusCircle;
  readonly TOSStatService = TOSStatService;

  rank: number;
  stats: string[] = [TOSStat.STR, TOSStat.CON, TOSStat.INT, TOSStat.SPR, TOSStat.DEX];
  statsPoints: number;

  @Input() build: TOSSimulatorBuild;

  private subscriptionJobs: Subscription;
  private subscriptionStatsPoints: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) {}

  onIncrementChange(event: Event, stat: string) {
    let max = 9999;
    let min = this.build.StatsBase[stat];

    let value = Math.max(min, Math.min(max, +event.target['value']));
    let delta = value - this.build.Stats[stat];

    if (this.build.statsIncrementLevelAvailable(stat, delta))
      this.build.statsIncrementLevel(stat, delta);

    event.target['value'] = value;
  }

  onIncrementClick(event: MouseEvent, stat: string, delta: number) {
    event.preventDefault();

    delta *= event.shiftKey
      ? 10
      : event.ctrlKey
        ? 100
        : 1;

    if (this.build.statsIncrementLevelAvailable(stat, delta))
      this.build.statsIncrementLevel(stat, delta);
  }

  onJobChange() {
    this.rank = this.build.Rank;
    this.changeDetector.markForCheck();
  }

  onStatsPointsChange(value: number) {
    this.statsPoints = value;
    this.changeDetector.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnDestroy();

    if (changes.build) {
      this.subscriptionJobs = this.build.Job$.subscribe(value => this.onJobChange());
      this.subscriptionStatsPoints = this.build.StatsPoints$.subscribe(value => this.onStatsPointsChange(value))
    }
  }

  ngOnDestroy(): void {
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
    this.subscriptionStatsPoints && this.subscriptionStatsPoints.unsubscribe();
  }

}
