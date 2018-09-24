import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TOSJob} from "../../shared/domain/tos/job/tos-job.model";
import {Subscription} from "rxjs";
import {TOSEntity} from "../../shared/domain/tos/entity/tos-entity.model";
import {TOSSimulatorBuild} from "../../shared/domain/tos/tos-build";
import {TOSNeetService} from "../../shared/service/tos-neet.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SkillSimulatorService} from "../skill-simulator.service";

const PARAM_BUILD = 'build';
const PARAM_TOSNEET = 'tosneet';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder',
  templateUrl: './skill-builder.component.html',
  styleUrls: ['./skill-builder.component.scss']
})
export class SkillBuilderComponent implements OnDestroy, OnInit {

  build: TOSSimulatorBuild = new TOSSimulatorBuild();
  buildChanged: boolean;
  jobs: TOSJob[];

  tooltip: TOSEntity;

  subscriptionBuild: Subscription;
  subscriptionQueryParams: Subscription;
  subscriptionJobs: Subscription;
  subscriptionTooltip: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private skillSimulatorService: SkillSimulatorService,
    private tosNeetService: TOSNeetService) {}

  onBuildChange() {
    this.buildChanged = true;

    let queryParams = {};
        queryParams[PARAM_BUILD] = TOSSimulatorBuild.base64Encode(this.build);

    this.router.navigate(['.'], { queryParams, relativeTo: this.route });
  }

  onQueryParamsChange(value: Params) {
    if (this.buildChanged) {
      this.buildChanged = false;
      return;
    }


    if (value[PARAM_TOSNEET]) {
      this.build = this.tosNeetService.decode(value[PARAM_TOSNEET]);
      this.buildSubscribe();
    } else if (value[PARAM_BUILD]) {
      this.build = TOSSimulatorBuild.base64Decode(value[PARAM_BUILD], this.skillSimulatorService);
      this.buildSubscribe();
    } else {
      this.build = new TOSSimulatorBuild();
      this.buildSubscribe();
    }

    this.changeDetector.detectChanges();
  }

  onJobsChange(jobs: TOSJob[]) {
    let unique = [];

    for (let job of jobs)
      if (unique.indexOf(job) == -1)
        unique.push(job);

    this.jobs = unique;
  }

  buildSubscribe() {
    this.subscriptionBuild && this.subscriptionBuild.unsubscribe();
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
    this.subscriptionTooltip && this.subscriptionTooltip.unsubscribe();

    this.subscriptionBuild = this.build.Change.subscribe(value => this.onBuildChange());
    this.subscriptionJobs = this.build.Jobs.subscribe(value => this.onJobsChange(value));
    this.subscriptionTooltip = this.build.Tooltip.subscribe(value => this.tooltip = value);
  }

  ngOnInit() {
    this.subscriptionQueryParams = this.route.queryParams.subscribe(value => this.onQueryParamsChange(value));
    this.buildSubscribe();
  }

  ngOnDestroy(): void {
    this.subscriptionBuild && this.subscriptionBuild.unsubscribe();
    this.subscriptionQueryParams && this.subscriptionQueryParams.unsubscribe();
    this.subscriptionJobs && this.subscriptionJobs.unsubscribe();
    this.subscriptionTooltip && this.subscriptionTooltip.unsubscribe();
  }

}
