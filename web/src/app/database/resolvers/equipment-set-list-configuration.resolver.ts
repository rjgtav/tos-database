import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration, TOSListTableColumnType} from "../entity-list/entity-list.component";

@Injectable()
export class EquipmentSetListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      sortColumn: '$ID',

      tableColumns: [
        { value: '$ID',           type: TOSListTableColumnType.TEXT,        isNotMobile: true },
        { value: 'Name',          type: TOSListTableColumnType.TEXT,        isWide: true},
        { value: 'Link_Items',    type: TOSListTableColumnType.ICON_LINK,   label: 'Items', isNotMobile: true },
      ]
    };
  }
}
