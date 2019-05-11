import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../entity-list/entity-list.component";
import {
  TableCellTextPipeDefinition,
  TableCellTextPipeFormat
} from "../../shared/components/entity-table/pipes/table-cell-text.pipe";
import {TableCellNumberPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-number.pipe";
import {TableCellIconPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-icon.pipe";

@Injectable()
export class MapListConfigurationResolver implements Resolve<TOSListConfiguration> {

  static readonly COLUMNS = [
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Level',         pipe: new TableCellNumberPipeDefinition('Level') },
    { label: 'Rank',          pipe: new TableCellNumberPipeDefinition('Stars'), hideMobile: true },
    { label: 'Type',          pipe: new TableCellTextPipeDefinition('Type') },
  ];

  static readonly COLUMNS_ITEMS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Quantity',      pipe: new TableCellTextPipeDefinition('Quantity_MIN.Quantity_MAX', TableCellTextPipeFormat.QUANTITY_RANGE), class: 'text-nowrap' },
    { label: 'Chance',        pipe: new TableCellTextPipeDefinition('Chance', TableCellTextPipeFormat.PERCENTAGE), class: 'text-nowrap' },
  ];

  static readonly COLUMNS_NPCS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Population',    pipe: new TableCellTextPipeDefinition('Population', TableCellTextPipeFormat.QUANTITY), class: 'text-nowrap' },
    { label: 'Respawn',       pipe: new TableCellTextPipeDefinition('TimeRespawn', TableCellTextPipeFormat.TIME), class: 'text-nowrap' },
  ];

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
      tableColumns: MapListConfigurationResolver.COLUMNS,
    };
  }
}
