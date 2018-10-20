import { Component} from '@angular/core';
import {Theme, ThemeService} from "../../shared/service/theme.service";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faCommentAlt, faMoon} from "@fortawesome/free-solid-svg-icons";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {RegionService} from "../../shared/service/region.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  Theme = Theme;
  RegionService = RegionService;

  faCommentAlt = faCommentAlt;
  faGithub = faGithub;
  faMoon = faMoon;
  faSun = faSun;

  isOpenDatabase: boolean;
  isOpenRegion: boolean;

  constructor(private regionService: RegionService, public theme: ThemeService) {}

  routerLink(url: string): string {
    return RegionService.RegionUrl(url);
  }

  regionSelect(region: any) {
    this.regionService.regionRelect(region);
  }

}
