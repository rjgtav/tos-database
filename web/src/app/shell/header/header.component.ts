import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Theme, ThemeService} from "../../shared/service/theme.service";
import {faMoon, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {TOSUrlService} from "../../shared/service/tos-url.service";
import {TOSDataSetService} from "../../shared/domain/tos/tos-domain";
import {TOSRegion, TOSRegionService} from "../../shared/domain/tos-region";
import {SwUpdate} from "@angular/service-worker";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly REGION = Object.values(TOSRegion);

  TOSRegionService = TOSRegionService;
  Theme = Theme;
  TOSDataSetService = TOSDataSetService;
  TOSRegion = TOSRegion;

  faMoon = faMoon;
  faSearch = faSearch;
  faSun = faSun;

  isUpdateAvailable: boolean;
  isUpdateCheck: boolean;
  isUpdateCheckInterval: number;
  isOpenSearch: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private swUpdate: SwUpdate,
    public theme: ThemeService,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(value => this.updateAvailable());

      this.isUpdateCheckInterval = this.zone.runOutsideAngular(() => setInterval(() => this.updateCheck(), 30 * 60 * 1000));
      this.updateCheck();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.isUpdateCheckInterval);
  }

  routerLink(url: string): string {
    return TOSUrlService.Route(url);
  }

  regionSelect(region: any): boolean {
    TOSRegionService.select(region);
    return false;
  }

  update(event: MouseEvent) {
    event.preventDefault();

    this.swUpdate.activateUpdate().then(value => window.location.reload(true));
  }
  updateAvailable() {
    this.isUpdateAvailable = true;
    this.changeDetector.markForCheck();
  }
  async updateCheck() {
    this.isUpdateCheck = true;
    this.changeDetector.detectChanges();

    this.swUpdate.checkForUpdate().then(value => {
      this.isUpdateCheck = false;
      this.changeDetector.detectChanges();
    });
  }

}
