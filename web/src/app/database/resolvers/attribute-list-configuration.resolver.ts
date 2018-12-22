import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../entity-list/entity-list.component";
import {TableCellIconPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-icon.pipe";
import {
  TableCellTextPipeDefinition,
  TableCellTextPipeFormat
} from "../../shared/components/entity-table/pipes/table-cell-text.pipe";
import {TableCellLinkPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-link.pipe";

@Injectable()
export class AttributeListConfigurationResolver implements Resolve<TOSListConfiguration> {

  static readonly COLUMNS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Description',   pipe: new TableCellTextPipeDefinition('Description', TableCellTextPipeFormat.MULTILINE), hideMobile: true, wide: true },
    { label: 'Skill',         pipe: new TableCellLinkPipeDefinition('Link_Skill'), class: 'p-1'},
  ];

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      sortColumn: '$ID',
      tableColumns: AttributeListConfigurationResolver.COLUMNS,
    };
  }
}
