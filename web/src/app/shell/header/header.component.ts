import {Component, OnInit} from '@angular/core';
import {Theme, ThemeService} from "../../shared/service/theme.service";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faCommentAlt, faMoon, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {TOSRegionService} from "../../shared/service/tos-region.service";
import {TOSUrlService} from "../../shared/service/tos-url.service";

@Component({
  selector: 'tos-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Theme = Theme;
  RegionService = TOSRegionService;

  faCommentAlt = faCommentAlt;
  faGithub = faGithub;
  faMoon = faMoon;
  faSearch = faSearch;
  faSun = faSun;

  isOpenDatabase: boolean;
  isOpenRegion: boolean;
  isOpenSearch: boolean;
  isGithub: boolean;

  constructor(private regionService: TOSRegionService, public theme: ThemeService) {}

  routerLink(url: string): string {
    return TOSUrlService.Route(TOSRegionService.Region, url);
  }

  regionSelect(region: any) {
    this.regionService.regionRelect(region);
  }

  ngOnInit(): void {
    this.isGithub = location.href.indexOf('github.io') > 0;
  }

}
