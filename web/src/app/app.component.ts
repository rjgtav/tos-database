import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgbTooltipConfig} from "@ng-bootstrap/ng-bootstrap";
import {NavigationEnd, Router} from "@angular/router";
import {SEOService} from "./shared/service/seo.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private page: string;

  constructor(private ngbTooltipConfig: NgbTooltipConfig, private router: Router, private seo: SEOService) {
    this.ngbTooltipConfig.disableTooltip = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let pageOld = this.page;
        let pageNew = this.page = event.urlAfterRedirects.split('?')[0];

        if (pageOld != pageNew)
          window['dataLayer'].push({event: 'pageview', page: {path: pageNew }});
      }
    });
  }

}
