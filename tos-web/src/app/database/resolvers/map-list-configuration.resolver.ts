import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../entity-list/entity-list.component";
import {TableCellTextPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-text.pipe";
import {TableCellNumberPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-number.pipe";

@Injectable()
export class MapListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'HasChallengeMode',
          label: 'ChallengeMode',
          groupBy: () => [{ options: ['Yes'] }],
          indexOf: value => value == 'Yes' ? -1 : -2,
          toString: value => value ? 'Yes' : null,
        },
        {
          column: 'HasWarp',
          label: 'Warp',
          groupBy: () => [{ options: ['Yes'] }],
          indexOf: value => value == 'Yes' ? -1 : -2,
          toString: value => value ? 'Yes' : null,
        },
      ],

      sortColumn: '$ID',

      tableColumns: [
        { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
        { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
        { label: 'Level',         pipe: new TableCellNumberPipeDefinition('Level'), hideMobile: true },
        { label: 'Rank',          pipe: new TableCellNumberPipeDefinition('Stars'), hideMobile: true },
        { label: 'Type',          pipe: new TableCellTextPipeDefinition('Type') },
      ]
    };
  }
}
