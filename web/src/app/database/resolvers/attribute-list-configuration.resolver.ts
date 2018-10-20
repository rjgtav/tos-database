import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration, TOSListTableColumnType} from "../entity-list/entity-list.component";

@Injectable()
export class AttributeListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      sortColumn: '$ID',

      tableColumns: [
        { value: 'Icon',            type: TOSListTableColumnType.ICON,      label: '' },
        { value: '$ID',             type: TOSListTableColumnType.TEXT,      isNotMobile: true },
        { value: 'Name',            type: TOSListTableColumnType.TEXT,      isWide: true},
        { value: 'DescriptionHTML', type: TOSListTableColumnType.TEXT,      label: 'Description', isNotMobile: true, isWide: true},
        { value: 'Link_Skill',      type: TOSListTableColumnType.ICON_LINK, label: 'Skill',
          transformValue: (o) => o ? [o] : null },
      ]
    };
  }
}
