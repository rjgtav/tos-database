import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Theme, ThemeService} from "../../shared/service/theme.service";
import {faMoon, faSearch, faSync, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {TOSUrlService} from "../../shared/service/tos-url.service";
import {TOSRegion, TOSRegionService} from "../../shared/domain/tos-region";
import {PatreonService} from "../../home/patreon/patreon.service";
import {InstallService} from "../../shared/service/install.service";
import {TOSLanguage, TOSLanguageService} from "../../shared/domain/tos-language";

const UPDATE_KEY = 'update';
const UPDATE_INTERVAL = 60 * 60 * 1000;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly LANGUAGES = TOSLanguageService.values();
  readonly REGIONS = TOSRegionService.values();

  readonly Theme = Theme;
  readonly TOSLanguageService = TOSLanguageService;
  readonly TOSRegion = TOSRegion;
  readonly TOSRegionService = TOSRegionService;

  readonly faMoon = faMoon;
  readonly faSearch = faSearch;
  readonly faSun = faSun;
  readonly faTimes = faTimes;
  readonly faSync = faSync;

  languageSelected: TOSLanguage;
  regionSelected: TOSRegion;

  patrons: string[];
  patronsCount: number;

  isUpdateAvailable: boolean;
  isUpdateCheck: boolean;
  isUpdateCheckManual: boolean;
  isUpdateCheckTimeout: number;
  isUpdateInstall: boolean;
  isOpenSearch: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private install: InstallService,
    private patreon: PatreonService,
    public theme: ThemeService,
    private zone: NgZone,
  ) {
    this.languageSelected = TOSLanguageService.get();
    this.regionSelected = TOSRegionService.get();

    this.patreon.patreonShow() && this.patreon.patrons$Random(3).subscribe(value => {
      this.patrons = value.result;
      this.patronsCount = value.total;
      this.changeDetector.markForCheck();
    })
  }

  ngOnInit(): void {
    this.updateCheck();
  }

  ngOnDestroy(): void {
    clearTimeout(this.isUpdateCheckTimeout);
  }

  languageSelect(language: any) {
    TOSLanguageService.set(language);
    return false;
  }

  patreonDismiss() {
    this.patreon.patreonDismiss();
    this.patrons = null;
    this.patronsCount = -1;
  }

  routerLink(url: string): string {
    return TOSUrlService.Route(url);
  }

  regionSelect(region: any): boolean {
    TOSRegionService.set(region);
    return false;
  }

  updateInstall(event: MouseEvent) {
    event.preventDefault();

    this.isUpdateInstall = true;
    this.changeDetector.markForCheck();

    this.install.update$install();
  }
  updateCheck(updateManual: boolean = false) {
    this.isUpdateCheckManual = updateManual;
    this.changeDetector.markForCheck();

    let now = new Date();
    let updateNext = localStorage.getItem(UPDATE_KEY) && new Date(localStorage.getItem(UPDATE_KEY));
        updateNext && updateNext.setTime(updateNext.getTime() + UPDATE_INTERVAL);
        updateNext = updateNext || now;

    // If the time has come, check for updates
    if (updateNext.getTime() <= new Date().getTime() || (this.isUpdateCheckManual && !this.isUpdateAvailable && !this.isUpdateCheck)) {
      localStorage.setItem(UPDATE_KEY, now.toISOString());

      this.isUpdateCheck = true;
      this.changeDetector.markForCheck();

      this.install.update$check().subscribe(value => {
        this.isUpdateCheck = false;
        this.isUpdateCheckManual = false;
        this.isUpdateAvailable = value;

        this.changeDetector.detectChanges();
        this.updateCheck();
      });
    }

    // In case there is no update available, schedule to check again in the future
    if (!this.isUpdateAvailable)
      this.zone.runOutsideAngular(() =>
        this.isUpdateCheckTimeout = setTimeout(() => this.updateCheck(), UPDATE_INTERVAL));
  }

}
