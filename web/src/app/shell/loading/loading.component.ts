import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {UpdateService} from "../../shared/service/update.service";
import {LoadingService} from "./loading.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  isClearCache: boolean;
  isClearCacheAvailable: boolean;
  isClearCacheAvailableTimeout: number;

  installComplete: boolean;
  installProgress: number = 0;
  installSupported: boolean;
  installTotal: number = 0;

  updateAvailable: boolean;
  updateComplete: boolean;
  updateProgress: number = 0;
  updateTotal: number = 0;
  updateVersion: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private loading: LoadingService,
    private update: UpdateService,
    private zone: NgZone,
  ) {
    this.loading.updateProgress$.subscribe(value => this.onUpdateProgress(value));
    this.loading.updateComplete$.subscribe(value => this.updateComplete = value);
    this.loading.installComplete$.subscribe(value => this.installComplete = value);
    this.loading.installProgress$.subscribe(value => this.onInstallProgress(value));

    this.installSupported = this.loading.installSupported;
    this.onUpdateAvailable();
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => this.isClearCacheAvailableTimeout = setTimeout(() => {
        this.isClearCacheAvailable = true;
        this.changeDetector.markForCheck();
      }, 5 * 1000
    ));
  }

  ngOnDestroy(): void {
    clearTimeout(this.isClearCacheAvailableTimeout);
  }

  onClearCacheClick() {
    this.isClearCache = true;
    this.loading.clear();
  }

  onInstallProgress(value: number) {
    this.installProgress = Math.max(value, 0);
    this.installTotal = Math.max(this.loading.installTotal, 0);
    this.installTotal = isNaN(this.installTotal) ? 0 : this.installTotal;
    this.changeDetector.markForCheck();
  }

  onUpdateAvailable() {
    this.updateAvailable = this.update.updateAvailable();
    this.updateAvailable && this.changeDetector.markForCheck();
    this.updateVersion = this.update.versionHuman;
  }
  onUpdateProgress(value: number) {
    if (!this.updateAvailable) return;

    this.updateProgress = Math.max(value, 0);
    this.updateTotal = this.loading.updateTotal;
    this.changeDetector.markForCheck();
  }

}
