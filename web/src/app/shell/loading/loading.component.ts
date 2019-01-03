import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {UpdateService} from "../../shared/service/update.service";
import {TOSRegionService} from "../../shared/service/tos-region.service";
import {TOSRegion} from "../../shared/domain/tos-region";
import {TOSDomainService} from "../../shared/domain/tos/tos-domain.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  updateAvailable: boolean;
  updateProgress: number;
  updateTotal: number;
  updateVersion: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private domain: TOSDomainService,
    private update: UpdateService
  ) {
    TOSRegionService.Region$.subscribe(value => this.onRegionChange(value));
    this.domain.loadProgress$.subscribe(value => this.onUpdateProgress(value))
  }

  onRegionChange(value: TOSRegion) {
    this.updateVersion = this.update.versionHuman(value);
    this.onUpdateAvailable(value);
  }

  onUpdateAvailable(region: TOSRegion) {
    if (!region) return;

    this.updateAvailable = this.update.updateAvailable(region);
    this.updateAvailable && this.changeDetector.markForCheck();
  }
  onUpdateProgress(value: number) {
    if (!this.updateAvailable) return;

    this.updateProgress = Math.max(value, 0);
    this.updateTotal = this.domain.loadTotal;
    this.updateAvailable = this.updateProgress < this.updateTotal;
    this.changeDetector.markForCheck();
  }

}
