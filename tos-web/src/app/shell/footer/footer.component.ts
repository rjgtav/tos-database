import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {Theme, ThemeService} from "../../shared/service/theme.service";
import {Subscription} from "rxjs";
import {VersionService} from "../../shared/service/version.service";
import {LoadingService} from "../loading/loading.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  isLightTheme: boolean;
  updateVersion: string;

  subscriptionTheme: Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private loading: LoadingService,
    private theme: ThemeService,
    private update: VersionService,
  ) {
    this.update.versionHuman$.subscribe(value => this.onVersionChange(value));
    this.theme.change$.subscribe(value => this.onThemeChange(value));
  }

  onClearCacheClick(event: MouseEvent) {
    event.preventDefault();
    this.loading.reset();
  }

  onThemeChange(theme: Theme) {
    this.isLightTheme = theme == Theme.LIGHT;
    this.changeDetector.markForCheck();
  }

  onVersionChange(value: string) {
    this.updateVersion = value;
    this.changeDetector.markForCheck();
  }

}
