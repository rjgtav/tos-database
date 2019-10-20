import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {SearchService} from "../../../shared/service/search.service";
import {TOSEquipmentItemListResolver} from "./tos-equipment-item-list.resolver";
import {EntityTableV2Column} from "../../../shared/components/entity-table-v2/entity-table-v2.component";
import {ITOSItemEquipmentV2} from "../../../shared/domain/tos/tos-domain";
import {TOSItemEquipmentRepositoryV2} from "../../../shared/domain/tos/item/v2-tos-item-equipment.repository";
import {EntityTableV2CellText} from "../../../shared/components/entity-table-v2/entity-table-v2-cell/entity-table-v2-cell-text/entity-table-v2-cell-text.component";
import {EntityTableV2CellIconGrade} from "../../../shared/components/entity-table-v2/entity-table-v2-cell/entity-table-v2-cell-icon-grade/entity-table-v2-cell-icon-grade.component";
import {EntityTableV2CellTextDate} from "../../../shared/components/entity-table-v2/entity-table-v2-cell/entity-table-v2-cell-text-date/entity-table-v2-cell-text-date.component";

@Injectable()
export class TOSArmorEquipmentListResolver extends TOSEquipmentItemListResolver {

  constructor(
    repository: TOSItemEquipmentRepositoryV2,
    router: Router,
    search: SearchService,
  ) { super('Armor_', repository, router, search) }

  columns(): EntityTableV2Column<ITOSItemEquipmentV2>[] {
    return [
      { label: '', cell: new EntityTableV2CellIconGrade<ITOSItemEquipmentV2>('Icon', 'ItemGrade', true, 40) },
      { label: 'ID', cell: new EntityTableV2CellText<ITOSItemEquipmentV2>('ClassID', false) },
      { label: 'Name', cell: new EntityTableV2CellText<ITOSItemEquipmentV2>('Name', false), grow: true },
      { label: 'Material', cell: new EntityTableV2CellText<ITOSItemEquipmentV2>('Material$Label', true) },
      { label: 'Req. Level', cell: new EntityTableV2CellText<ITOSItemEquipmentV2>('UseLv', false) },
      { label: 'Created', cell: new EntityTableV2CellTextDate<ITOSItemEquipmentV2>('__Entry_Created', false) },
      { label: 'Updated', cell: new EntityTableV2CellTextDate<ITOSItemEquipmentV2>('__Entry_Updated', false) },
    ];
  }

}
