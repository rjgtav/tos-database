import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../entity-list/entity-list.component";
import {
  TOSEquipmentGrade,
  TOSEquipmentGradeService,
  TOSEquipmentMaterialService,
  TOSEquipmentTypeService
} from "../../shared/domain/tos/tos-domain";
import {TableCellIconPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-icon.pipe";
import {TableCellTextPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-text.pipe";
import {TableCellNumberPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-number.pipe";
import {TableCellBadgePipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-badge.pipe";

@Injectable()
export class EquipmentListConfigurationResolver implements Resolve<TOSListConfiguration> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'Grade',
          groupBy: TOSEquipmentGradeService.groupBy,
          indexOf: TOSEquipmentGradeService.indexOf,
          toString: TOSEquipmentGradeService.toString,
        },
        {
          column: 'Material',
          groupBy: TOSEquipmentMaterialService.groupBy,
          indexOf: TOSEquipmentMaterialService.indexOf,
          toString: TOSEquipmentMaterialService.toString,
        },
        {
          column: 'TypeEquipment',
          label: 'Type',
          groupBy: TOSEquipmentTypeService.groupBy,
          indexOf: TOSEquipmentTypeService.indexOf,
          toString: TOSEquipmentTypeService.toString,
        }
      ],

      sortColumn: '$ID',

      tableColumns: [
        { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
        { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
        { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
        { label: 'Material',      pipe: new TableCellTextPipeDefinition('Material'), hideMobile: true },
        { label: 'Grade',         pipe: new TableCellBadgePipeDefinition('Grade', (o: TOSEquipmentGrade) => TOSEquipmentGradeService.color(o)), hideMobile: true },
        { label: 'Level',         pipe: new TableCellNumberPipeDefinition('RequiredLevel') },
        { label: 'Type',          pipe: new TableCellTextPipeDefinition('TypeEquipment'), class: 'text-nowrap', hideMobile: true },
      ]
    };
  }
}
