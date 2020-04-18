import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../../entity-list/entity-list.component";
import {TOSGemTypeService} from "../../../shared/domain/tos/tos-domain";
import {TableCellIconPipeDefinition} from "../../../shared/components/entity-table/pipes/table-cell-icon.pipe";
import {TableCellTextPipeDefinition} from "../../../shared/components/entity-table/pipes/table-cell-text.pipe";

@Injectable()
export class GemListConfigurationResolver implements Resolve<TOSListConfiguration> {

  static readonly COLUMNS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Type',          pipe: new TableCellTextPipeDefinition('TypeGem') },
  ];

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'TypeGem',
          label: 'Type',
          groupBy: TOSGemTypeService.groupBy,
          indexOf: TOSGemTypeService.indexOf,
          toString: TOSGemTypeService.toString,
        },
      ],

      sortColumn: '$ID',
      tableColumns: GemListConfigurationResolver.COLUMNS,
    };
  }
}
