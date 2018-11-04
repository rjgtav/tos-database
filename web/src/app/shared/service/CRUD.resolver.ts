import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {Sort, SortOrder} from "../directives/sort.directive";
import {Filter} from "../directives/filter.directive";
import {CRUDRepository} from "./CRUD.repository";
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

    return of(mapToPage(this.findAll(filter, sort)));
  }

  private findAll(filter?: Filter[], sort?: Sort): T[] {
    let data = TOSDomainService[TOSDataSet.getProperty(this.dataset)];
    let sorter = data && sort ? data[0].$comparators[sort.column] : null;
    sorter = sorter ? sorter : (i, j) => (i < j) ? -1 : (i > j) ? 1 : 0;

    if (filter)
      data = data.filter((item) => !filter || !filter.find(f => !f.filter(item)));
    if (sort)
      data = data.sort((a, b) => sorter(a[sort.column], b[sort.column]) * (sort.order == SortOrder.ASC ? 1 : -1));

    return data;
  }

  private findById($ID: number): T {
    return TOSDomainService[TOSDataSet.getProperty(this.dataset) + 'ById'][$ID];
  }

}

export interface CRUDPage<T> {
  size: number,
  items: T[],
}
