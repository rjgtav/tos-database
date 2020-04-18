import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {SearchService} from "../../../shared/service/search.service";
import {EntityTableV2Column} from "../../../shared/components/entity-table-v2/entity-table-v2.component";
import {EntityTableV2CellText} from "../../../shared/components/entity-table-v2/entity-table-v2-cell/entity-table-v2-cell-text/entity-table-v2-cell-text.component";
import {EntityTableV2CellIconEquipment} from "../../../shared/components/entity-table-v2/entity-table-v2-cell/entity-table-v2-cell-icon-equipment/entity-table-v2-cell-icon-equipment.component";
import {EntityTableV2CellTextDate} from "../../../shared/components/entity-table-v2/entity-table-v2-cell/entity-table-v2-cell-text-date/entity-table-v2-cell-text-date.component";
import {
  EntityListFilterV2$Enum,
  EntityListFilterV2$Enum$Selection,
  EntityListFilterV2$Enum$Theme
} from "../../entity-list-filter-v2/entity-list-filter-v2-enum/entity-list-filter-v2-enum.component";
import {FlexSearchEnum, FlexSearchEnum$Id} from "../../../../../../tos-search/src/domain/flexsearch-enum";
import {EntityListFilterV2$Range} from "../../entity-list-filter-v2/entity-list-filter-v2-range/entity-list-filter-v2-range.component";
import {TOSItemResolver} from "./tos-item.resolver";
import {ITOSItemEquipmentArmorV2} from "../../../shared/domain/tos/tos-domain";
import {TOSItemEquipmentArmorRepositoryV2} from "../../../shared/domain/tos/item/v2-tos-item-equipment-armor.repository";
import {EntityTooltipV2} from "../../../shared/components/entity-tooltip-v2/entity-tooltip-v2.model";
import {EntityDetailV2} from "../../entity-detail-v2/entity-detail-v2.model";

@Injectable()
export class TOSItemArmorResolver extends TOSItemResolver<ITOSItemEquipmentArmorV2> {

  constructor(
    repository: TOSItemEquipmentArmorRepositoryV2,
    router: Router,
    search: SearchService,
  ) { super('Armor', repository, router, search) }

  listColumns(): EntityTableV2Column<ITOSItemEquipmentArmorV2>[] {
    return [
      { label: '', config: new EntityTableV2CellIconEquipment<ITOSItemEquipmentArmorV2>() },
      { label: 'ID', config: new EntityTableV2CellText<ITOSItemEquipmentArmorV2>('ClassID', false) },
      { label: 'Name', config: new EntityTableV2CellText<ITOSItemEquipmentArmorV2>('Name', false), grow: true },
      { label: 'Material', config: new EntityTableV2CellText<ITOSItemEquipmentArmorV2>('Material$Label', true) },
      { label: 'Req. Level', config: new EntityTableV2CellText<ITOSItemEquipmentArmorV2>('UseLv', false) },
      { label: 'Created', config: new EntityTableV2CellTextDate<ITOSItemEquipmentArmorV2>('__Entry_Created', false) },
      { label: 'Updated', config: new EntityTableV2CellTextDate<ITOSItemEquipmentArmorV2>('__Entry_Updated', false) },
    ];
  }

  listFilter() {
    return [
      new EntityListFilterV2$Enum<ITOSItemEquipmentArmorV2>(
        'ItemGrade',
        'Grade',
        FlexSearchEnum.values(FlexSearchEnum$Id.Item$Grade),
        EntityListFilterV2$Enum$Selection.SINGLE,
        EntityListFilterV2$Enum$Theme.DROPDOWN,
      ),
      new EntityListFilterV2$Enum<ITOSItemEquipmentArmorV2>(
        'Material',
        'Material',
        FlexSearchEnum.values(FlexSearchEnum$Id.Equipment$Material),
        EntityListFilterV2$Enum$Selection.SINGLE,
        EntityListFilterV2$Enum$Theme.DROPDOWN,
      ),
      new EntityListFilterV2$Range<ITOSItemEquipmentArmorV2>(
        'UseLv',
        'Required Level',
        0,
      ),
      new EntityListFilterV2$Enum<ITOSItemEquipmentArmorV2>(
        'MaxSocket_COUNT',
        'Sockets',
        FlexSearchEnum.values(FlexSearchEnum$Id.Equipment$Sockets),
        EntityListFilterV2$Enum$Selection.SINGLE,
        EntityListFilterV2$Enum$Theme.DROPDOWN,
      ),
      new EntityListFilterV2$Enum<ITOSItemEquipmentArmorV2>(
        '$Stats',
        'Stats',
        FlexSearchEnum.values(FlexSearchEnum$Id.Equipment$Stats),
        EntityListFilterV2$Enum$Selection.MULTI,
        EntityListFilterV2$Enum$Theme.DROPDOWN,
      ),
    ]
  }

  // TODO: merge with weapon in an equipment resolver
  detailInfo(): EntityDetailV2<ITOSItemEquipmentArmorV2>[] {
    return [];
  }

  // TODO: merge with weapon in an equipment resolver
  tooltip(): EntityTooltipV2<ITOSItemEquipmentArmorV2>[] {
    return [];
  }

}
