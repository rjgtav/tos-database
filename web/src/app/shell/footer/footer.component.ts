import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Theme, ThemeService} from "../../shared/service/theme.service";
import {Subscription} from "rxjs";
import {faDiscord, faTwitch} from "@fortawesome/free-brands-svg-icons";
import {UpdateService} from "../../shared/service/update.service";
import {TOSRegionService} from "../../shared/service/tos-region.service";
import {TOSRegion} from "../../shared/domain/tos-region";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {
  faDiscord = faDiscord;
  faTwitch = faTwitch;

  isLightTheme: boolean;
  updateVersion: string;

  subscription: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private theme: ThemeService,
    private update: UpdateService,
  ) {
    TOSRegionService.Region$.subscribe(value => this.onRegionChange(value));
    this.subscription = theme.subscribe(this.onThemeChange.bind(this));
  }

  onRegionChange(value: TOSRegion) {
    this.updateVersion = this.update.versionHuman(value);
    this.changeDetector.markForCheck();
  }

  onThemeChange(theme: Theme) {
    this.isLightTheme = theme == Theme.LIGHT;
    this.changeDetector.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
