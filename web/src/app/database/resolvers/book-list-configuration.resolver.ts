import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration, TOSListTableType} from "../item-list/item-list.component";

@Injectable()
export class BookListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      sortColumn: '$ID',

      tableColumns: [
        { value: 'Icon',  type: TOSListTableType.ICON,  width: 1, label: '', class: 'p-1' },
        { value: '$ID',   type: TOSListTableType.TEXT,  width: 1, },
        { value: 'Name',  type: TOSListTableType.TEXT,  },
        { value: 'Type',  type: TOSListTableType.TEXT,  width: 1, },
      ]
    };
  }
}
