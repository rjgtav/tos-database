import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {CRUDService} from "./CRUD.service";
import {Sort} from "../directives/sort.directive";
import {Filter} from "../directives/filter.directive";
import {map} from "rxjs/operators";

export abstract class CRUDResolver<T> implements Resolve<T> {

  public static readonly PAGE_SIZE: number = 15;

  public static readonly PARAM_ID: string = 'id';
  public static readonly PARAM_FILTER: string = 'filter';
  public static readonly PARAM_PAGE: string = 'page';
  public static readonly PARAM_SEARCH: string = 'search';
  public static readonly PARAM_SORT: string = 'sort';

  protected constructor(private service: CRUDService<T>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | T {
    let page = +route.queryParams[CRUDResolver.PARAM_PAGE] || 1;
    let sort = Sort.valueOf(route.queryParams[CRUDResolver.PARAM_SORT]) || undefined;
    let filter = Filter.valueOf(route.queryParams[CRUDResolver.PARAM_FILTER]) || null;

    let mapToPage = (data) => { return {
      size: data.length,
      items: data.slice((page - 1) * CRUDResolver.PAGE_SIZE, page * CRUDResolver.PAGE_SIZE)
    }};

    if (route.params[CRUDResolver.PARAM_ID])
      return this.service.findById(route.params[CRUDResolver.PARAM_ID]);

    if (route.queryParams[CRUDResolver.PARAM_SEARCH])
      return this.service.search(route.queryParams[CRUDResolver.PARAM_SEARCH]).pipe(map(mapToPage));

    return this.service.findAll(filter, sort).pipe(map(mapToPage));
  }

}
