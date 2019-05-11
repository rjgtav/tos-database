import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../entity-list/entity-list.component";
import {TOSCardTypeService, TOSElementService, TOSMonsterRaceService,} from "../../shared/domain/tos/tos-domain";
import {TableCellIconPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-icon.pipe";
import {TableCellTextPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-text.pipe";

@Injectable()
export class CardListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'TypeCard',
          label: 'Type',
          groupBy: TOSCardTypeService.groupBy,
          indexOf: TOSCardTypeService.indexOf,
          toString: TOSCardTypeService.toString,
        },
      ],

      sortColumn: '$ID',

      tableColumns: [
        { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
        { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
        { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
        { label: 'Element',       pipe: new TableCellIconPipeDefinition('MonsterElement', TOSElementService.icon), class: 'p-1 text-center', hideMobile: true },
        { label: 'Race',          pipe: new TableCellIconPipeDefinition('MonsterRace', TOSMonsterRaceService.icon), class: 'p-1 text-center', hideMobile: true },
        { label: 'Type',          pipe: new TableCellTextPipeDefinition('TypeCard') },
      ]
    };
  }
}
