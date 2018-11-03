import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate, CanDeactivate,
  Route, Router, RouterStateSnapshot,
  UrlMatchResult,
  UrlSegment, UrlSegmentGroup
} from "@angular/router";
import {Injectable} from "@angular/core";
import {forkJoin, Observable} from "rxjs";
import {TOSRepositoryService} from "../domain/tos/tos-repository.service";
import {map} from "rxjs/operators";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {TOSSearchService} from "./tos-search.service";

@Injectable({
  providedIn: 'root'
})
export class TOSRegionService implements CanActivate, CanDeactivate<any> {

  private static region: TOSRegion;

  static get Region(): TOSRegion { return TOSRegionService.region = TOSRegionService.region || TOSRegion.iTOS; }
  static get Regions(): TOSRegion[] { return [TOSRegion.iTOS, TOSRegion.jTOS, TOSRegion.kTOS, TOSRegion.kTEST] }

  static RegionUrl(url: string): string {
    return url
      ? '/' + TOSRegion.toUrl(this.Region) + (url.startsWith('/') ? '' : '/') + url
      : '/' + TOSRegion.toUrl(this.Region) + '/';
  }

  static UrlMatcher(segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult {
    let region = segments.length
      ? TOSRegion.valueOf(segments[0].path)
      : null;

    //console.log('UrlMatcher region', region, TOSRegionService.region)
    return region == null && segments
      ? { consumed: [segments[0]], posParams: { redirect: segments[0] }}
      : null;
  }

  constructor(private loadingBar: LoadingBarService, private route: ActivatedRoute, private router: Router, private search: TOSSearchService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let segments = state.url.split('/').filter(value => value.length);
    let regionOld = TOSRegionService.region;
    let regionNew = TOSRegionService.region = segments.length
      ? TOSRegion.valueOf(segments[0])
      : TOSRegion.iTOS;

    let force = regionOld != regionNew;

    // Load search in the background
    this.search.load(force);

    //console.log('canActivate', regionOld, '=>', regionNew)
    return TOSRepositoryService
      .load(this.loadingBar, force)
      .pipe(map(value => true));
  }

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return TOSRepositoryService.IsLoaded;
  }

  regionRelect(region: TOSRegion) {
    let regionOld = '/' + TOSRegion.toUrl(TOSRegionService.region);
    let regionNew = '/' + TOSRegion.toUrl(region);

    let url = this.router.routerState.snapshot.url.replace(regionOld, regionNew);

    if (url.indexOf('?') > 0)
        url = url.slice(0, url.indexOf('?'));

    //console.log('regionSelect', regionOld, regionNew, url)
    this.router.navigate([url], { queryParamsHandling: 'merge' });
  }

}

enum TOSRegion {
  iTOS = 'iTOS',
  jTOS = 'jTOS',
  kTEST = 'kTOS (Test)',
  kTOS = 'kTOS',
}

namespace TOSRegion {

  export function toUrl(value: TOSRegion): string {
    switch (value) {
      case TOSRegion.iTOS:  return 'itos';
      case TOSRegion.jTOS:  return 'jtos';
      case TOSRegion.kTOS:  return 'ktos';
      case TOSRegion.kTEST:  return 'ktest';
    }
  }

  export function valueOf(param: string): TOSRegion {
    return Object
      .values(TOSRegion)
      .find(value => toUrl(value) == param.toLowerCase());
  }

}
