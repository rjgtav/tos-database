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
import {ITOSItemEquipmentWeaponV2} from "../../../shared/domain/tos/tos-domain";
import {TOSItemEquipmentWeaponRepositoryV2} from "../../../shared/domain/tos/item/v2-tos-item-equipment-weapon.repository";
import {EntityTooltipV2EquipmentInfo} from "../../../shared/components/entity-tooltip-v2/entity-tooltip-v2-equipment-info/entity-tooltip-v2-equipment-info.component";
import {EntityTooltipV2} from "../../../shared/components/entity-tooltip-v2/entity-tooltip-v2.model";
import {EntityTooltipV2Tradability} from "../../../shared/components/entity-tooltip-v2/entity-tooltip-v2-item-tradability/entity-tooltip-v2-item-tradability.component";
import {EntityTooltipV2Divider} from "../../../shared/components/entity-tooltip-v2/entity-tooltip-v2-divider/entity-tooltip-v2-divider.component";
import {EntityTooltipV2EquipmentUpgradability} from "../../../shared/components/entity-tooltip-v2/entity-tooltip-v2-equipment-upgradability/entity-tooltip-v2-equipment-upgradability.component";
import {EntityTooltipV2ItemLifeTime} from "../../../shared/components/entity-tooltip-v2/entity-tooltip-v2-item-lifetime/entity-tooltip-v2-item-lifetime.component";
import {EntityDetailV2} from "../../entity-detail-v2/entity-detail-v2.model";
import {EntityDetailV2Divider} from "../../entity-detail-v2/entity-detail-v2-divider/entity-detail-v2-divider.component";
import {EntityDetailV2EntityDescription} from "../../entity-detail-v2/entity-detail-v2-entity-description/entity-detail-v2-entity-description.component";
import {EntityDetailV2EquipmentEnhancement} from "../../entity-detail-v2/entity-detail-v2-equipment-enhancement/entity-detail-v2-equipment-enhancement.component";

@Injectable()
export class TOSItemWeaponResolver extends TOSItemResolver<ITOSItemEquipmentWeaponV2> {

  constructor(
    repository: TOSItemEquipmentWeaponRepositoryV2,
    router: Router,
    search: SearchService,
  ) { super('Weapon', repository, router, search) }

  listColumns(): EntityTableV2Column<ITOSItemEquipmentWeaponV2>[] {
    return [
      { label: '', config: new EntityTableV2CellIconEquipment<ITOSItemEquipmentWeaponV2>() },
      { label: 'ID', config: new EntityTableV2CellText<ITOSItemEquipmentWeaponV2>('ClassID', false) },
      { label: 'Name', config: new EntityTableV2CellText<ITOSItemEquipmentWeaponV2>('Name', false), grow: true },
      { label: 'Req. Level', config: new EntityTableV2CellText<ITOSItemEquipmentWeaponV2>('UseLv', false) },
      { label: 'Created', config: new EntityTableV2CellTextDate<ITOSItemEquipmentWeaponV2>('__Entry_Created', false) },
      { label: 'Updated', config: new EntityTableV2CellTextDate<ITOSItemEquipmentWeaponV2>('__Entry_Updated', false) },
    ];
  }

  listFilter() {
    return [
      new EntityListFilterV2$Enum<ITOSItemEquipmentWeaponV2>(
        'ItemGrade',
        'Grade',
        FlexSearchEnum.values(FlexSearchEnum$Id.Item$Grade),
        EntityListFilterV2$Enum$Selection.SINGLE,
        EntityListFilterV2$Enum$Theme.DROPDOWN,
      ),
      new EntityListFilterV2$Range<ITOSItemEquipmentWeaponV2>(
        'UseLv',
        'Required Level',
        0,
      ),
      new EntityListFilterV2$Enum<ITOSItemEquipmentWeaponV2>(
        'MaxSocket_COUNT',
        'Sockets',
        FlexSearchEnum.values(FlexSearchEnum$Id.Equipment$Sockets),
        EntityListFilterV2$Enum$Selection.SINGLE,
        EntityListFilterV2$Enum$Theme.DROPDOWN,
      ),
      new EntityListFilterV2$Enum<ITOSItemEquipmentWeaponV2>(
        '$Stats',
        'Stats',
        FlexSearchEnum.values(FlexSearchEnum$Id.Equipment$Stats),
        EntityListFilterV2$Enum$Selection.MULTI,
        EntityListFilterV2$Enum$Theme.DROPDOWN,
      ),
    ]
  }

  detailInfo(): EntityDetailV2<ITOSItemEquipmentWeaponV2>[] {
    return [
      new EntityDetailV2Divider('Description'),
      new EntityDetailV2EntityDescription(),
      new EntityDetailV2Divider('Enhancement & Transcendence'),
      new EntityDetailV2EquipmentEnhancement(),
    ]
  }

  tooltip(): EntityTooltipV2<ITOSItemEquipmentWeaponV2>[] {
    return [
      new EntityTooltipV2ItemLifeTime(),
      new EntityTooltipV2EquipmentInfo(),
      new EntityTooltipV2Divider('Tradability'),
      new EntityTooltipV2Tradability(),
      new EntityTooltipV2Divider('Upgradability'),
      new EntityTooltipV2EquipmentUpgradability(),
    ];
  }

}
