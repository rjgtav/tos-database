import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {VersionService} from "../../shared/service/version.service";
import {LoadingService} from "./loading.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  isClearCacheAvailable: boolean;
  isClearCacheAvailableTimeout: number;

  loadingSupported: boolean;
  loadingComplete: boolean;
  loadingMessage: string;
  loadingProgress: number;
  loadingTotal: number;

  updateAvailable: boolean;
  updateInstalled: boolean;
  updateVersion: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private loading: LoadingService,
    private version: VersionService,
    private zone: NgZone,
  ) {
    this.loadingSupported = this.loading.supported;
    this.loading.complete$.subscribe(value => this.onLoadingComplete(value));
    this.loading.progress$.subscribe(value => this.onLoadingProgress(value));
    this.loading.message$.subscribe(value => this.onLoadingMessage(value));
    this.loading.total$.subscribe(value => this.onLoadingTotal(value));

    this.version.versionHuman$.subscribe(value => this.onVersionHuman(value));
    this.version.versionUpdateAvailable$.subscribe(value => this.onVersionUpdateAvailable(value));
    this.version.versionUpdateInstalled$.subscribe(value => this.onVersionUpdateInstalled(value));
  }

  get show() {
    return !this.updateInstalled || this.updateAvailable && !this.loadingComplete
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => this.isClearCacheAvailableTimeout = setTimeout(() => {
        this.isClearCacheAvailable = true;
        this.changeDetector.detectChanges();
      }, 3 * 1000
    ));
  }

  ngOnDestroy(): void {
    clearTimeout(this.isClearCacheAvailableTimeout);
  }

  onLoadingComplete(value: boolean) {
    this.loadingComplete = value;
    this.changeDetector.detectChanges();
  }
  onLoadingMessage(value: string) {
    this.loadingMessage = value;
    this.loadingProgress ? this.changeDetector.detectChanges() : this.changeDetector.markForCheck();
  }
  onLoadingProgress(value: number) {
    this.loadingProgress = value;
    this.changeDetector.detectChanges();
  }
  onLoadingTotal(value: number) {
    this.loadingTotal = value;
    this.changeDetector.detectChanges();
  }

  onResetClick() {
    this.loading.reset();
  }

  onVersionHuman(value: string) {
    this.updateVersion = value;
    this.changeDetector.detectChanges();
  }
  onVersionUpdateAvailable(value: boolean) {
    this.updateAvailable = value;
    this.changeDetector.detectChanges();
  }
  onVersionUpdateInstalled(value: boolean) {
    this.updateInstalled = value;
    this.changeDetector.markForCheck();
  }

}
