import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {UpdateService} from "../../shared/service/update.service";
import {LoadingService} from "./loading.service";
import {TOSRegionService} from "../../shared/domain/tos-region";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  installComplete: boolean;
  installProgress: number;
  installSupported: boolean;
  installTotal: number;

  updateAvailable: boolean;
  updateComplete: boolean;
  updateProgress: number;
  updateTotal: number;
  updateVersion: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private loading: LoadingService,
    private update: UpdateService,
  ) {
    this.loading.updateProgress$.subscribe(value => this.onUpdateProgress(value));
    this.loading.updateComplete$.subscribe(value => this.updateComplete = value);
    this.loading.installComplete$.subscribe(value => this.installComplete = value);
    this.loading.installProgress$.subscribe(value => this.onInstallProgress(value));

    this.installSupported = this.loading.installSupported;
    this.onUpdateAvailable();
  }

  onInstallProgress(value: number) {
    this.installProgress = Math.max(value, 0);
    this.installTotal = Math.max(this.loading.installTotal, 0);
    this.installTotal = isNaN(this.installTotal) ? 0 : this.installTotal;
    this.changeDetector.markForCheck();
  }

  onUpdateAvailable() {
    let region = TOSRegionService.get();

    this.updateAvailable = this.update.updateAvailable(region);
    this.updateAvailable && this.changeDetector.markForCheck();
    this.updateVersion = this.update.versionHuman(region);
  }
  onUpdateProgress(value: number) {
    if (!this.updateAvailable) return;

    this.updateProgress = Math.max(value, 0);
    this.updateTotal = this.loading.updateTotal;
    this.changeDetector.markForCheck();
  }

}
