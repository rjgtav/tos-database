import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../entity-list/entity-list.component";
import {TOSItemTypeService} from "../../shared/domain/tos/tos-domain";
import {TableCellIconPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-icon.pipe";
import {
  TableCellTextPipeDefinition,
  TableCellTextPipeFormat
} from "../../shared/components/entity-table/pipes/table-cell-text.pipe";

@Injectable()
export class ItemListConfigurationResolver implements Resolve<TOSListConfiguration> {

  static readonly COLUMNS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Type',          pipe: new TableCellTextPipeDefinition('Type') },
  ];

  static readonly COLUMNS_MONSTERS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Chance',        pipe: new TableCellTextPipeDefinition('Chance', TableCellTextPipeFormat.PERCENTAGE), class: 'text-nowrap' },
  ];

  static readonly COLUMNS_MAPS = [
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Chance',        pipe: new TableCellTextPipeDefinition('Chance', TableCellTextPipeFormat.PERCENTAGE), class: 'text-nowrap' },
  ];

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'Type',
          groupBy: TOSItemTypeService.groupBy,
          indexOf: TOSItemTypeService.indexOf,
          toString: TOSItemTypeService.toString,
        },
      ],

      sortColumn: '$ID',
      tableColumns: ItemListConfigurationResolver.COLUMNS,
    };
  }
}
