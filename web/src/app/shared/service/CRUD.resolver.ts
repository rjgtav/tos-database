import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {TOSEntity} from "../domain/tos/tos-entity.model";
import {TOSDataSet} from "../domain/tos/tos-domain";
import {TOSDomainService} from "../domain/tos/tos-domain.service";

export abstract class CRUDResolver<T extends TOSEntity> implements Resolve<T> {

  public static readonly PAGE_SIZE: number = 15;

  public static readonly PARAM_ID: string = 'id';
  public static readonly PARAM_FILTER: string = 'filter';
  public static readonly PARAM_PAGE: string = 'page';
  public static readonly PARAM_SORT: string = 'sort';

  protected constructor(private dataset: TOSDataSet) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | T {
    let dataset = TOSDataSet.toProperty(this.dataset);

    if (route.params[CRUDResolver.PARAM_ID])
      return TOSDomainService[dataset + 'ById'](+route.params[CRUDResolver.PARAM_ID]);

    let page: CRUDPage = {
      filter: route.queryParams[CRUDResolver.PARAM_FILTER],
      pageNumber: +route.queryParams[CRUDResolver.PARAM_PAGE] || 1,
      pageSize: CRUDResolver.PAGE_SIZE,
      sort: route.queryParams[CRUDResolver.PARAM_SORT],
    };

    return TOSDomainService[dataset](page);
  }

}

export interface CRUDPageResult<T> {
  size: number,
  result: T[],
}
export interface CRUDPage {
  filter: string;
  pageNumber: number;
  pageSize: number;
  sort: string;
}
