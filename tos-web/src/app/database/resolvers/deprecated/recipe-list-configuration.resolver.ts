import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../../entity-list/entity-list.component";
import {
  TableCellTextPipeDefinition,
  TableCellTextPipeFormat
} from "../../../shared/components/entity-table/pipes/table-cell-text.pipe";
import {TableCellLinkPipeDefinition} from "../../../shared/components/entity-table/pipes/table-cell-link.pipe";
import {TOSRecipeMaterial} from "../../../shared/domain/tos/item/recipe/tos-recipe.model";
import {TableCellIconPipeDefinition} from "../../../shared/components/entity-table/pipes/table-cell-icon.pipe";

@Injectable()
export class RecipeListConfigurationResolver implements Resolve<TOSListConfiguration> {

  static readonly COLUMNS = [
    { label: '',              pipe: new TableCellLinkPipeDefinition('Link_Target'), class: 'p-1' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Materials',     pipe: new TableCellLinkPipeDefinition('Link_Materials', (o: TOSRecipeMaterial) => o.Quantity), class: 'p-1 text-nowrap' }
  ];

  static readonly COLUMNS_MATERIALS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Quantity',      pipe: new TableCellTextPipeDefinition('Quantity', TableCellTextPipeFormat.QUANTITY), class: 'text-nowrap' },
  ];

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      sortColumn: '$ID',
      tableColumns: RecipeListConfigurationResolver.COLUMNS,
    };
  }
}
