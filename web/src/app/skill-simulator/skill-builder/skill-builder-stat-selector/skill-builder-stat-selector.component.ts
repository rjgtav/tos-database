import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {TOSStat} from "../../../shared/domain/tos/entity/tos-entity.model";
import {TOSSimulatorBuild} from "../../../shared/domain/tos/tos-build";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-skill-builder-stat-selector',
  templateUrl: './skill-builder-stat-selector.component.html',
  styleUrls: ['./skill-builder-stat-selector.component.scss']
})
export class SkillBuilderStatSelectorComponent implements OnChanges, OnDestroy {

  rank: number;
  stats: string[] = [TOSStat.STR, TOSStat.CON, TOSStat.INT, TOSStat.SPR, TOSStat.DEX];
  statsPoints: number;

  @Input() build: TOSSimulatorBuild;

  private subscriptionJobs: Subscription;
  private subscriptionStatsPoints: Subscription;

  constructor() {}

  onIncrementChange(event: Event, stat: string) {
    let max = 9999;
    let min = this.build.StatsBase[stat];

    let value = Math.max(min, Math.min(max, +event.target['value']));
    let delta = value - this.build.Stats[stat];

    if (this.build.statIncrementLevelAvailable(stat, delta))
      this.build.statIncrementLevel(stat, delta);

    event.target['value'] = value;
  }

  onIncrementClick(event: MouseEvent, stat: string, delta: number) {
    event.preventDefault();

    delta *= event.shiftKey
      ? 10
      : event.ctrlKey
        ? 100
        : 1;

    if (this.build.statIncrementLevelAvailable(stat, delta))
      this.build.statIncrementLevel(stat, delta);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.build) {
      this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
      this.subscriptionJobs = this.build.Jobs.subscribe(value => this.rank = this.build.Rank);

      this.subscriptionStatsPoints && this.subscriptionStatsPoints.unsubscribe();
      this.subscriptionStatsPoints = this.build.StatsPoints.subscribe(value => this.statsPoints = value)
    }
  }

  ngOnDestroy(): void {
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
    this.subscriptionStatsPoints && this.subscriptionStatsPoints.unsubscribe();
  }

}
