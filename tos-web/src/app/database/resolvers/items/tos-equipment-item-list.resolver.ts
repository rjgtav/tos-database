import {Router} from "@angular/router";
import {TOSItemListResolver} from "../tos-item-list.resolver";
import {SearchService} from "../../../shared/service/search.service";
import {EntityListFilterV2} from "../../entity-list-filter-v2/entity-list-filter-v2.component";
import {
  EntityListFilterV2$Enum,
  EntityListFilterV2$Enum$Selection,
  EntityListFilterV2$Enum$Theme
} from "../../entity-list-filter-v2/entity-list-filter-v2-enum/entity-list-filter-v2-enum.component";
import {EntityListFilterV2$Range} from "../../entity-list-filter-v2/entity-list-filter-v2-range/entity-list-filter-v2-range.component";
import {TOSItemEquipmentRepositoryV2} from "../../../shared/domain/tos/item/v2-tos-item-equipment.repository";
import {ITOSItemEquipmentV2} from "../../../shared/domain/tos/tos-domain";
import {FlexSearchEnum, FlexSearchEnum$Id,} from "../../../../../../tos-search/src/domain/flexsearch-enum";

export abstract class TOSEquipmentItemListResolver extends TOSItemListResolver<ITOSItemEquipmentV2> {

  protected constructor(
    prefix: string,
    repository: TOSItemEquipmentRepositoryV2,
    router: Router,
    search: SearchService,
  ) { super(prefix, repository, router, search) }

  filter(): EntityListFilterV2<any>[] {
    return [
      new EntityListFilterV2$Enum(
        'ItemGrade',
        'Grade',
        FlexSearchEnum.values(FlexSearchEnum$Id.Item$Grade),
        EntityListFilterV2$Enum$Selection.SINGLE,
        EntityListFilterV2$Enum$Theme.DROPDOWN,
      ),
      new EntityListFilterV2$Enum(
        'Material',
        'Material',
        FlexSearchEnum.values(FlexSearchEnum$Id.Equipment$Material),
        EntityListFilterV2$Enum$Selection.SINGLE,
        EntityListFilterV2$Enum$Theme.DROPDOWN,
      ),
      new EntityListFilterV2$Range(
        'UseLv',
        'Required Level',
        0,
      ),
      new EntityListFilterV2$Enum(
        'MaxSocket_COUNT',
        'Sockets',
        FlexSearchEnum.values(FlexSearchEnum$Id.Equipment$Sockets),
        EntityListFilterV2$Enum$Selection.SINGLE,
        EntityListFilterV2$Enum$Theme.DROPDOWN,
      ),
      new EntityListFilterV2$Enum(
        '$Stats',
        'Stats',
        FlexSearchEnum.values(FlexSearchEnum$Id.Equipment$Stats),
        EntityListFilterV2$Enum$Selection.MULTI,
        EntityListFilterV2$Enum$Theme.DROPDOWN,
      ),
    ]
  }

}
