import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {VersionService} from "../../shared/service/version.service";
import {LoadingService} from "../loading/loading.service";
import {PreferenceService, PreferenceTheme} from "../../shared/service/preference.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  isLightTheme: boolean;
  updateVersion: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private loading: LoadingService,
    private preferences: PreferenceService,
    private update: VersionService,
  ) {
    this.preferences.getTheme$().subscribe(value => this.onChangeTheme(value));
    this.update.versionHuman$.subscribe(value => this.onChangeVersion(value));
  }

  onClearCacheClick(event: MouseEvent) {
    event.preventDefault();
    this.loading.reset();
  }

  onChangeTheme(theme: PreferenceTheme) {
    this.isLightTheme = theme == PreferenceTheme.LIGHT;
    this.changeDetector.markForCheck();
  }

  onChangeVersion(value: string) {
    this.updateVersion = value;
    this.changeDetector.markForCheck();
  }

}
