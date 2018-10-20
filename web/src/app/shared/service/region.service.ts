import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Route, Router, RouterStateSnapshot,
  UrlMatchResult,
  UrlSegment, UrlSegmentGroup
} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TOSRepositoryService} from "../domain/tos/tos-repository.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegionService implements CanActivate {

  private static region: TOSRegion;

  static get Region(): TOSRegion { return RegionService.region = RegionService.region || TOSRegion.iTOS; }
  static get Regions(): TOSRegion[] { return [TOSRegion.iTOS, TOSRegion.kTOS, TOSRegion.kTEST] }

  static RegionUrl(url: string): string {
    return '/' + TOSRegion.toUrl(this.Region) + (url.startsWith('/') ? '' : '/') + url;
  }

  static UrlMatcher(segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult {
    let region = segments.length
      ? TOSRegion.valueOf(segments[0].path)
      : null;

    //console.log('UrlMatcher region', region, RegionService.region)
    return region == null && segments
      ? { consumed: [segments[0]], posParams: { redirect: segments[0] }}
      : null;
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let segments = state.url.split('/').filter(value => value.length);
    let regionOld = RegionService.region;
    let regionNew = RegionService.region = segments.length
      ? TOSRegion.valueOf(segments[0])
      : TOSRegion.iTOS;

    //console.log('canActivate', regionOld, '=>', regionNew, 'state', segments)
    return TOSRepositoryService
      .load(regionOld != regionNew)
      .pipe(map(value => true));
  }

  regionRelect(region: TOSRegion) {
    let regionOld = '/' + TOSRegion.toUrl(RegionService.region) + '/';
    let regionNew = '/' + TOSRegion.toUrl(region) + '/';

    let url = this.router.routerState.snapshot.url.replace(regionOld, regionNew);
        url = url.slice(0, url.indexOf('?'));

    this.router.navigate([url], { queryParamsHandling: 'merge' });
  }

}

enum TOSRegion {
  iTOS = 'iTOS',
  kTEST = 'kTOS (Test)',
  kTOS = 'kTOS',
}

namespace TOSRegion {

  export function toUrl(value: TOSRegion): string {
    switch (value) {
      case TOSRegion.iTOS:  return 'itos';
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
