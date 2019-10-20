import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Route,
  RouterStateSnapshot,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup
} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TOSRegionService} from "../domain/tos-region";
import {TOSDomainService} from "../domain/tos/tos-domain.service";
import {LoadingService} from "../../shell/loading/loading.service";

@Injectable({
  providedIn: 'root'
})
export class RouteService implements CanActivate, CanDeactivate<any> {

  static UrlMatcher(segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult {
    let region = segments.length
      ? TOSRegionService.valueOf(segments[0].path)
      : null;

    //console.log('UrlMatcher region', region, TOSRegionService.region)
    return region == null && segments
      ? { consumed: [segments[0]], posParams: { redirect: segments[0] }}
      : null;
  }

  constructor(
    private domain: TOSDomainService,
    private loading: LoadingService,
  ) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.loading.complete$;
  }

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.loading.complete$;
  }

}
