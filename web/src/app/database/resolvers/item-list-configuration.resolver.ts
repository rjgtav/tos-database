import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration, TOSListTableColumnType} from "../entity-list/entity-list.component";
import {TOSItemType} from "../../shared/domain/tos/tos-domain";

@Injectable()
export class ItemListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'Type',
          groups: [
            {
              options: [
                TOSItemType.DRUG,
                TOSItemType.EVENT,
                TOSItemType.MATERIAL,
                TOSItemType.PREMIUM,
                TOSItemType.QUEST,
              ]
            },
          ],
        },
      ],

      sortColumn: '$ID',

      tableColumns: [
        { value: 'Icon',  type: TOSListTableColumnType.ICON,  label: '' },
        { value: '$ID',   type: TOSListTableColumnType.TEXT,  isNotMobile: true },
        { value: 'Name',  type: TOSListTableColumnType.TEXT,  isWide: true },
        { value: 'Type',  type: TOSListTableColumnType.TEXT,  },
      ]
    };
  }
}
