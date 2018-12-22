import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../entity-list/entity-list.component";
import {TOSJobDifficultyService, TOSJobTreeService} from "../../shared/domain/tos/tos-domain";
import {TableCellIconPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-icon.pipe";
import {TableCellTextPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-text.pipe";
import {TableCellNumberPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-number.pipe";

@Injectable()
export class JobListConfigurationResolver implements Resolve<TOSListConfiguration> {

  static readonly COLUMNS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Circles',       pipe: new TableCellNumberPipeDefinition('CircleMax') },
    { label: 'Difficulty',    pipe: new TableCellTextPipeDefinition('JobDifficulty'), hideMobile: true },
    { label: 'Rank',          pipe: new TableCellNumberPipeDefinition('Rank') },
    { label: 'Tree',          pipe: new TableCellTextPipeDefinition('JobTree') },
  ];

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'JobDifficulty',
          label: 'Difficulty',
          groupBy: TOSJobDifficultyService.groupBy,
          indexOf: TOSJobDifficultyService.indexOf,
          toString: TOSJobDifficultyService.toString,
        },
        {
          column: 'JobTree',
          label: 'Tree',
          groupBy: TOSJobTreeService.groupBy,
          indexOf: TOSJobTreeService.indexOf,
          toString: TOSJobTreeService.toString,
        },
      ],

      sortColumn: 'JobTree',
      tableColumns: JobListConfigurationResolver.COLUMNS,
    };
  }
}
