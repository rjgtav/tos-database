import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {TOSItemType} from "../../shared/domain/tos/item/tos-item.model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration, TOSListTableType} from "../item-list/item-list.component";

@Injectable()
export class ItemListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filterColumn: 'Type',
      filterGroups: [
        {
          label: 'Items',
          values: [
            TOSItemType.CUBE,
            TOSItemType.DRUG,
            TOSItemType.EVENT,
            TOSItemType.MATERIAL,
            TOSItemType.QUEST,
          ]
        },
      ],

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
