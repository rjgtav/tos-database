import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Theme, ThemeService} from "../../shared/service/theme.service";
import {Subscription} from "rxjs";
import {UpdateService} from "../../shared/service/update.service";
import {LoadingService} from "../loading/loading.service";
import {TOSRegionService} from "../../shared/domain/tos-region";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {

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

  onClearCacheClick(event: MouseEvent) {
    event.preventDefault();

    if (window.confirm(`Are you sure you want to clear the cache?\nEverything for ${ TOSRegionService.get() } will have to be downloaded again`))
      this.loading.clear();
  }

  onThemeChange(theme: Theme) {
    this.isLightTheme = theme == Theme.LIGHT;
    this.changeDetector.markForCheck();
  }

  onUpdateComplete() {
    this.updateVersion = this.update.versionHuman;
    this.changeDetector.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscriptionTheme.unsubscribe();
  }

}
