import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup
} from "@angular/router";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {TOSSearchService} from "./tos-search.service";
import {TOSRegion} from "../domain/tos-region";
import {UpdateService} from "./update.service";
import {map} from "rxjs/operators";
import {TOSDomainService} from "../domain/tos/tos-domain.service";

@Injectable({
  providedIn: 'root'
})
export class TOSRegionService implements CanActivate, CanDeactivate<any> {

  private static region: BehaviorSubject<TOSRegion> = new BehaviorSubject(null);

  static get Region(): TOSRegion { return TOSRegionService.region.getValue() }
  static get Region$(): Observable<TOSRegion> { return TOSRegionService.region.asObservable(); }
  static get Regions(): TOSRegion[] { return [TOSRegion.iTOS, TOSRegion.jTOS, TOSRegion.kTOS, TOSRegion.kTEST] }

  static UrlMatcher(segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult {
    let region = segments.length
      ? TOSRegion.valueOf(segments[0].path)
      : null;

    //console.log('UrlMatcher region', region, TOSRegionService.region)
    return region == null && segments
      ? { consumed: [segments[0]], posParams: { redirect: segments[0] }}
      : null;
  }

  constructor(
    private domain: TOSDomainService,
    private route: ActivatedRoute,
    private router: Router,
    private search: TOSSearchService,
    private update: UpdateService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let segments = state.url.split('/').filter(value => value.length);
    let region = segments.length ? TOSRegion.valueOf(segments[0]) : TOSRegion.iTOS;

    TOSRegionService.region.next(region);

    // Load search in the background
    this.search.load(region);

    // Check for updates
    return this.update.updateAvailable(region)
      ? this.domain.load$(region).pipe(map(value => { this.update.updateVersion(region); return true }))
      : true;
  }

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return !this.domain.isLoading;
  }

  regionSelect(region: TOSRegion) {
    // Update url
    let regionOld = '/' + TOSRegion.toUrl(TOSRegionService.Region);
    let regionNew = '/' + TOSRegion.toUrl(region);
    //console.log('regionSelect', regionOld, regionNew, url)

    location.href = this.router.routerState.snapshot.url.replace(regionOld, regionNew);
  }

}
