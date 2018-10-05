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

  stats: string[] = [TOSStat.STR, TOSStat.CON, TOSStat.INT, TOSStat.SPR, TOSStat.DEX];
  statsPoints: number;


  @Input() build: TOSSimulatorBuild;

  private subscriptionStatsPoints: Subscription;

  constructor() { }

  onIncrementClick(event: MouseEvent, stat: string, delta: number) {
    event.preventDefault();

    delta *= event.shiftKey ? 20 : 1;

    if (this.build.statIncrementLevelAvailable(stat, delta))
      this.build.statIncrementLevel(stat, delta);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.build) {
      this.subscriptionStatsPoints && this.subscriptionStatsPoints.unsubscribe();
      this.subscriptionStatsPoints = this.build.StatsPoints.subscribe(value => this.statsPoints = value)
    }
  }

  ngOnDestroy(): void {
    this.subscriptionStatsPoints && this.subscriptionStatsPoints.unsubscribe();
  }

}
