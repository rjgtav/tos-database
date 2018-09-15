import { Component} from '@angular/core';
import {Theme, ThemeService} from "../../shared/service/theme.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  Theme = Theme;

  isOpenDatabase: boolean;

  constructor(public theme: ThemeService) {}

}
