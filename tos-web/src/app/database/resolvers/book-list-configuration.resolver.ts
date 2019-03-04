import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../entity-list/entity-list.component";
import {TableCellIconPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-icon.pipe";
import {TableCellTextPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-text.pipe";

@Injectable()
export class BookListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      sortColumn: '$ID',

      tableColumns: [
        { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1' },
        { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
        { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
      ]
    };
  }
}
