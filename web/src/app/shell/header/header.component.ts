import { Component} from '@angular/core';
import {Theme, ThemeService} from "../../shared/service/theme.service";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faCommentAlt, faMoon} from "@fortawesome/free-solid-svg-icons";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  Theme = Theme;

  faCommentAlt = faCommentAlt;
  faGithub = faGithub;
  faMoon = faMoon;
  faSun = faSun;

  isOpenDatabase: boolean;

  constructor(public theme: ThemeService) {}

}
