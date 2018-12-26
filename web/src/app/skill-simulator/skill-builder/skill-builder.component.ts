import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TOSEntity} from "../../shared/domain/tos/tos-entity.model";
import {TOSSimulatorBuild} from "../../shared/domain/tos/tos-build";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {faImage, faLink} from "@fortawesome/free-solid-svg-icons";
import {TosNeetService} from "../../shared/service/integrations/tos-neet.service";
import {TinyUrlService} from "../../shared/service/integrations/tiny-url.service";
import {ClipboardService} from "../../shared/service/clipboard.service";
import {ITOSJob} from "../../shared/domain/tos/tos-domain";
import {TOSRegionService} from "../../shared/service/tos-region.service";

const PARAM_BUILD = 'build';
const PARAM_TINYURL = 'tinyurl';
const PARAM_TOSNEET = 'tosneet';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder',
  templateUrl: './skill-builder.component.html',
  styleUrls: ['./skill-builder.component.scss']
})
export class SkillBuilderComponent implements OnDestroy, OnInit {

  faImage = faImage;
  faLink = faLink;
  TOSEntity = TOSEntity;

  build: TOSSimulatorBuild = TOSSimulatorBuild.new(TOSRegionService.Region);
  buildChanged: number = 0;
  jobs: ITOSJob[] = [];

  sharingAsImage: boolean;
  sharingAsUrl: boolean;
  tinyUrl: string;

  tooltip: TOSEntity;

  subscriptionSkill: Subscription;
  subscriptionQueryParams: Subscription;
  subscriptionJob: Subscription;
  subscriptionStatsPoints: Subscription;
  subscriptionTooltip: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private clipboardService: ClipboardService,
    private element: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private tinyUrlService: TinyUrlService,
    private tosNeetService: TosNeetService,
  ) {}

  private buildSubscribe() {
    this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
    this.subscriptionJob && this.subscriptionJob.unsubscribe();
    this.subscriptionStatsPoints && this.subscriptionStatsPoints.unsubscribe();
    this.subscriptionTooltip && this.subscriptionTooltip.unsubscribe();

    this.subscriptionSkill = this.build.Skill$.subscribe(value => this.onBuildChange());
    this.subscriptionJob = this.build.Job$.subscribe(value => this.onJobChange(value));
    this.subscriptionStatsPoints = this.build.StatsPoints$.subscribe(value => this.onBuildChange());
    this.subscriptionTooltip = this.build.Tooltip.subscribe(value => this.tooltip = value);
  }

  shareAsImage() {
    let element = this.element.nativeElement as Element;
    let options = {
      backgroundColor: window.getComputedStyle(document.body).backgroundColor,
      foreignObjectRendering: false,
      ignoreElements: (element: Element) => ['button', 'fa-icon'].indexOf(element.tagName.toLowerCase()) > -1,
      logging: false,
      windowWidth: 1920,
    };

    // Configure ultra-wide design
    this.element.nativeElement.style.display = 'block';
    this.element.nativeElement.style.maxWidth = '1750px';
    this.element.nativeElement.style.width = '1750px';
    this.sharingAsImage = true;

    window['html2canvas'](element, options).then(canvas => {
      let a = document.createElement("a");
          a.href = canvas.toDataURL("image/png");
          a.download = 'build.png';
          a.click();

      // Revert ultra-wide design
      this.element.nativeElement.style.display = '';
      this.element.nativeElement.style.maxWidth = '';
      this.element.nativeElement.style.width = '';

      this.sharingAsImage = false;
      this.changeDetector.detectChanges();
    });
  }

  async shareAsUrl() {
    if (this.tinyUrl) {
      this.clipboardService.write(this.tinyUrl);
      return;
    }

    let urlBase = location.protocol + '//' + location.host + location.pathname;
    let url = urlBase + '?' + PARAM_BUILD + '=' + await TOSSimulatorBuild.base64Encode(this.build);

    this.tinyUrl = null;
    this.sharingAsUrl = true;

    this.tinyUrlService
      .create(url)
      .subscribe(value => {
        this.tinyUrl = urlBase + '?' + PARAM_TINYURL + '=' + value;
        this.sharingAsUrl = false;

        this.changeDetector.detectChanges();
      })
  }

  async onBuildChange() {
    let encoded = await TOSSimulatorBuild.base64Encode(this.build);

    if (this.router.url.indexOf(encoded) == -1) {
      let queryParams = {};
          queryParams[PARAM_BUILD] = encoded;

      this.router.navigate(['.'], { queryParams, relativeTo: this.route });
      this.buildChanged ++;
    }
  }

  onJobChange(job: ITOSJob) {
    let jobs = this.build.Jobs;
    let unique = [];
    let uniqueIDs = [];

    for (let job of jobs)
      if (uniqueIDs.indexOf(job.$ID) == -1) {
        unique.push(job);
        uniqueIDs.push(job.$ID);
      }

    this.jobs = unique;
    this.onBuildChange();
  }

  async onQueryParamsChange(value: Params) {
    if (this.buildChanged > 0) {
      this.buildChanged --;
      this.tinyUrl = null;
      return;
    }

    if (value[PARAM_TOSNEET]) {
      this.build = await this.tosNeetService.decode(value[PARAM_TOSNEET]).toPromise();
      this.buildSubscribe();
    } else if (value[PARAM_TINYURL]) {
      this.tinyUrlService
        .parse(value[PARAM_TINYURL])
        .subscribe(url => {
          let queryParams = {};
              queryParams[PARAM_BUILD] = url.split('?' + PARAM_BUILD + '=')[1];

          this.router.navigate(['.'], { queryParams, relativeTo: this.route });
        });
    } else if (value[PARAM_BUILD]) {
      this.build = await TOSSimulatorBuild.base64Decode(TOSRegionService.Region, value[PARAM_BUILD]).toPromise();
      this.buildSubscribe();
    } else {
      this.build = TOSSimulatorBuild.new(TOSRegionService.Region);
      this.buildSubscribe();
    }

    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.subscriptionQueryParams = this.route.queryParams.subscribe(value => this.onQueryParamsChange(value));
    this.buildSubscribe();
  }

  ngOnDestroy(): void {
    this.subscriptionSkill && this.subscriptionSkill.unsubscribe();
    this.subscriptionQueryParams && this.subscriptionQueryParams.unsubscribe();
    this.subscriptionJob && this.subscriptionJob.unsubscribe();
    this.subscriptionStatsPoints && this.subscriptionStatsPoints.unsubscribe();
    this.subscriptionTooltip && this.subscriptionTooltip.unsubscribe();
  }

}
