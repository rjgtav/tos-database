import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private page: string;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Track page views with Google Analytics
        let pageOld = this.page;
        let pageNew = this.page = event.urlAfterRedirects.split('?')[0];

        if (pageOld != pageNew)
          window['dataLayer'].push({event: 'pageview', page: {path: pageNew }});
      }
    });
  }
}
