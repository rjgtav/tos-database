import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Theme, ThemeService} from "../../shared/service/theme.service";
import {faGithub, faPatreon} from "@fortawesome/free-brands-svg-icons";
import {faCommentAlt, faMoon, faSearch} from "@fortawesome/free-solid-svg-icons";
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
export class HeaderComponent implements OnInit {
  readonly REGION = Object.values(TOSRegion);

  TOSRegionService = TOSRegionService;
  Theme = Theme;
  TOSDataSetService = TOSDataSetService;
  TOSRegion = TOSRegion;

  faCommentAlt = faCommentAlt;
  faGithub = faGithub;
  faMoon = faMoon;
  faPatreon = faPatreon;
  faSearch = faSearch;
  faSun = faSun;

  isUpdateAvailable: boolean;
  isOpenSearch: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private swUpdate: SwUpdate,
    public theme: ThemeService
  ) {}

  ngOnInit(): void {
    this.swUpdate.isEnabled && this.swUpdate.available.subscribe(value => this.updateAvailable())
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
    window.location.reload(true);
  }
  updateAvailable() {
    this.isUpdateAvailable = true;
    this.changeDetector.markForCheck();
  }

}
