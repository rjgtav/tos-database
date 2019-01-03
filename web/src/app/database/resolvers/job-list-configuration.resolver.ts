import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../entity-list/entity-list.component";
import {TOSJobDifficultyService, TOSJobTreeService} from "../../shared/domain/tos/tos-domain";
import {TableCellIconPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-icon.pipe";
import {TableCellTextPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-text.pipe";
import {TableCellLinkPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-link.pipe";

@Injectable()
export class JobListConfigurationResolver implements Resolve<TOSListConfiguration> {

  static readonly COLUMNS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Attributes',    pipe: new TableCellLinkPipeDefinition('Link_Attributes'), class: 'p-1 text-nowrap'  },
    { label: 'Difficulty',    pipe: new TableCellTextPipeDefinition('JobDifficulty'), hideMobile: true },
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

      sortColumn: '$ID',
      tableColumns: JobListConfigurationResolver.COLUMNS,
    };
  }
}
