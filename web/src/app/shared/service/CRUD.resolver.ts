import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {Sort} from "../directives/sort.directive";
import {Filter} from "../directives/filter.directive";
import {map} from "rxjs/operators";
import {Comparable} from "../domain/tos/entity/tos-entity.model";

export abstract class CRUDResolver<T extends Comparable> implements Resolve<T> {

  public static readonly PAGE_SIZE: number = 15;

  public static readonly PARAM_ID: string = 'id';
  public static readonly PARAM_FILTER: string = 'filter';
  public static readonly PARAM_PAGE: string = 'page';
  public static readonly PARAM_SEARCH: string = 'search';
  public static readonly PARAM_SORT: string = 'sort';

  protected constructor(
    private findAll: (filter?: Filter[], sort?: Sort) => T[],
    private findById: ($ID: number) => T,
    private search: (pattern: string) => Observable<T[]>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | T {

    let page = +route.queryParams[CRUDResolver.PARAM_PAGE] || 1;
    let sort = Sort.valueOf(route.queryParams[CRUDResolver.PARAM_SORT]) || undefined;
    let filter = (route.queryParams[CRUDResolver.PARAM_FILTER] || '').split(';')
      .map(filter => Filter.valueOf(filter))
      .filter((filter) => filter) || undefined;

    let mapToPage = (data: T[]): CRUDPage<T> => { return {
      size: data.length,
      items: data.slice((page - 1) * CRUDResolver.PAGE_SIZE, page * CRUDResolver.PAGE_SIZE)
    }};

    if (route.params[CRUDResolver.PARAM_ID])
      return this.findById(route.params[CRUDResolver.PARAM_ID]);

    if (route.queryParams[CRUDResolver.PARAM_SEARCH])
      return this.search(route.queryParams[CRUDResolver.PARAM_SEARCH]).pipe(map(mapToPage));

    return of(mapToPage(this.findAll(filter, sort)));
  }

}

export interface CRUDPage<T> {
  size: number,
  items: T[],
}
