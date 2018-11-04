import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration, TOSListTableColumnType} from "../entity-list/entity-list.component";
import {TOSGemType} from "../../shared/domain/tos/tos-domain";

@Injectable()
export class GemListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'TypeGem',
          label: 'Type',
          groups: [
            {
              options: [
                TOSGemType.SKILL,
                TOSGemType.STATS,
              ]
            }
          ]
        },
      ],

      sortColumn: '$ID',

      tableColumns: [
        { value: 'Icon',            type: TOSListTableColumnType.ICON,  label: '' },
        { value: '$ID',             type: TOSListTableColumnType.TEXT,  isNotMobile: true },
        { value: 'Name',            type: TOSListTableColumnType.TEXT,  isWide: true},
        { value: 'TypeGem',         type: TOSListTableColumnType.TEXT,  label: 'Type' },
      ]
    };
  }
}
