import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Theme, ThemeService} from "../../shared/service/theme.service";
import {Subscription} from "rxjs";
import {faDiscord, faTwitch} from "@fortawesome/free-brands-svg-icons";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy, OnInit {
  faDiscord = faDiscord;
  faTwitch = faTwitch;

  isLightTheme: boolean;
  subscription: Subscription;

  constructor(theme: ThemeService) {
    this.subscription = theme.subscribe(this.onThemeChange.bind(this));
  }

  onThemeChange(theme: Theme) {
    this.isLightTheme = theme == Theme.LIGHT;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
