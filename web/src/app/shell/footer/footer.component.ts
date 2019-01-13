import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Theme, ThemeService} from "../../shared/service/theme.service";
import {Subscription} from "rxjs";
import {faDiscord, faTwitch} from "@fortawesome/free-brands-svg-icons";
import {UpdateService} from "../../shared/service/update.service";
import {TOSRegionService} from "../../shared/domain/tos-region";
import {LoadingService} from "../loading/loading.service";

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

  subscriptionTheme: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private loading: LoadingService,
    private theme: ThemeService,
    private update: UpdateService,
  ) {
    this.loading.updateComplete$.subscribe(value => this.onUpdateComplete());
    this.subscriptionTheme = theme.subscribe(this.onThemeChange.bind(this));
  }

  onThemeChange(theme: Theme) {
    this.isLightTheme = theme == Theme.LIGHT;
    this.changeDetector.markForCheck();
  }

  onUpdateComplete() {
    this.updateVersion = this.update.versionHuman(TOSRegionService.get());
    this.changeDetector.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscriptionTheme.unsubscribe();
  }

}
