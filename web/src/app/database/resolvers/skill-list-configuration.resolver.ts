import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../entity-list/entity-list.component";
import {TOSElementService, TOSSkillRequiredStanceCompanionService} from "../../shared/domain/tos/tos-domain";
import {TableCellIconPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-icon.pipe";
import {TableCellTextPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-text.pipe";
import {TableCellLinkPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-link.pipe";

@Injectable()
export class SkillListConfigurationResolver implements Resolve<TOSListConfiguration> {

  static readonly COLUMNS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Attributes',    pipe: new TableCellLinkPipeDefinition('Link_Attributes'), class: 'p-1 text-nowrap'  },
    { label: 'Class',         pipe: new TableCellLinkPipeDefinition('Link_Job'), class: 'p-1'}
  ];

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'RequiredStanceCompanion',
          label: 'Companion',
          groupBy: TOSSkillRequiredStanceCompanionService.groupBy,
          indexOf: TOSSkillRequiredStanceCompanionService.indexOf,
          toString: TOSSkillRequiredStanceCompanionService.toString,
        },
        {
          column: 'Element',
          groupBy: TOSElementService.groupBy,
          indexOf: TOSElementService.indexOf,
          toString: TOSElementService.toString,
        },
        {
          column: 'IsEnchanter',
          label: 'Enchanter',
          groupBy: () => [{ options: ['Yes'] }],
          indexOf: value => value == 'Yes' ? -1 : -2,
          toString: value => value ? 'Yes' : null,
        },
        {
          column: 'IsPardoner',
          label: 'Pardoner',
          groupBy: () => [{ options: ['Yes'] }],
          indexOf: value => value == 'Yes' ? -1 : -2,
          toString: value => value ? 'Yes' : null,
        },
        {
          column: 'IsShinobi',
          label: 'Shinobi',
          groupBy: () => [{ options: ['Yes'] }],
          indexOf: value => value == 'Yes' ? -1 : -2,
          toString: value => value ? 'Yes' : null,
        },
      ],

      sortColumn: '$ID',
      tableColumns: SkillListConfigurationResolver.COLUMNS,
    };
  }
}
