import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TOSListConfiguration} from "../entity-list/entity-list.component";
import {
  TOSElementService,
  TOSEquipmentMaterialService,
  TOSMonsterRaceService,
  TOSMonsterRankService,
  TOSMonsterSizeService
} from "../../shared/domain/tos/tos-domain";
import {TableCellIconPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-icon.pipe";
import {
  TableCellTextPipeDefinition,
  TableCellTextPipeFormat
} from "../../shared/components/entity-table/pipes/table-cell-text.pipe";
import {TableCellNumberPipeDefinition} from "../../shared/components/entity-table/pipes/table-cell-number.pipe";
import {TOSMonsterDrop, TOSMonsterSpawn} from "../../shared/domain/tos/monster/tos-monster.model";

@Injectable()
export class MonsterListConfigurationResolver implements Resolve<TOSListConfiguration> {

  static readonly COLUMNS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon'), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID'), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name'), wide: true },
    { label: 'Armor',         pipe: new TableCellTextPipeDefinition('Armor'), hideMobile: true },
    { label: 'Element',       pipe: new TableCellIconPipeDefinition('Element', null, TOSElementService.icon), class: 'p-1 text-center', hideMobile: true },
    { label: 'Level',         pipe: new TableCellNumberPipeDefinition('Level'), hideMobile: true },
    { label: 'Race',          pipe: new TableCellIconPipeDefinition('Race', null, TOSMonsterRaceService.icon), class: 'p-1 text-center', hideMobile: true },
    { label: 'Rank',          pipe: new TableCellTextPipeDefinition('Rank') },
    { label: 'Size',          pipe: new TableCellTextPipeDefinition('Size'), hideMobile: true },
  ];

  static readonly COLUMNS_DROPS = [
    { label: '',              pipe: new TableCellIconPipeDefinition('Icon', (o: TOSMonsterDrop) => o.Item), class: 'p-1 text-center' },
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID', null, (o: TOSMonsterDrop) => o.Item), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name', null, (o: TOSMonsterDrop) => o.Item), wide: true },
    { label: 'Quantity',      pipe: new TableCellTextPipeDefinition('Quantity_MIN.Quantity_MAX', TableCellTextPipeFormat.QUANTITY_RANGE), class: 'text-nowrap' },
    { label: 'Chance',        pipe: new TableCellTextPipeDefinition('Chance', TableCellTextPipeFormat.PERCENTAGE), class: 'text-nowrap' },
  ];

  static readonly COLUMNS_SPAWNS = [
    { label: '$ID',           pipe: new TableCellTextPipeDefinition('$ID', null, (o: TOSMonsterSpawn) => o.Map), hideMobile: true },
    { label: 'Name',          pipe: new TableCellTextPipeDefinition('Name', null, (o: TOSMonsterSpawn) => o.Map), wide: true },
    { label: 'Population',    pipe: new TableCellTextPipeDefinition('Population', TableCellTextPipeFormat.QUANTITY), class: 'text-nowrap' },
  ];

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TOSListConfiguration> | Promise<TOSListConfiguration> | TOSListConfiguration {
    return {
      filter: [
        {
          column: 'Armor',
          groupBy: TOSEquipmentMaterialService.groupBy,
          indexOf: TOSEquipmentMaterialService.indexOf,
          toString: TOSEquipmentMaterialService.toString,
        },
        {
          column: 'Element',
          groupBy: TOSElementService.groupBy,
          indexOf: TOSElementService.indexOf,
          toString: TOSElementService.toString,
        },
        {
          column: 'Race',
          groupBy: TOSMonsterRaceService.groupBy,
          indexOf: TOSMonsterRaceService.indexOf,
          toString: TOSMonsterRaceService.toString,
        },
        {
          column: 'Rank',
          groupBy: TOSMonsterRankService.groupBy,
          indexOf: TOSMonsterRankService.indexOf,
          toString: TOSMonsterRankService.toString,
        },
        {
          column: 'Size',
          groupBy: TOSMonsterSizeService.groupBy,
          indexOf: TOSMonsterSizeService.indexOf,
          toString: TOSMonsterSizeService.toString,
        },
      ],

      sortColumn: '$ID',
      tableColumns: MonsterListConfigurationResolver.COLUMNS,
    };
  }
}
