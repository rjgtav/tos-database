import {TOSEntityResolver} from "../tos-entity.resolver";
import {ITOSItemV2} from "../../../shared/domain/tos/tos-domain";
import {
  EntityListFilterV2$Enum,
  EntityListFilterV2$Enum$Selection,
  EntityListFilterV2$Enum$Theme
} from "../../entity-list-filter-v2/entity-list-filter-v2-enum/entity-list-filter-v2-enum.component";
import {Router} from "@angular/router";
import {SearchService} from "../../../shared/service/search.service";
import {TOSItemRepositoryV2} from "../../../shared/domain/tos/item/v2-tos-item.repository";
import {FlexSearchEnum, FlexSearchEnum$Id} from "../../../../../../tos-search/src/domain/flexsearch-enum";

export abstract class TOSItemResolver<ENTITY extends ITOSItemV2> extends TOSEntityResolver<ENTITY> {

  protected constructor(
    private category: string,
    repository: TOSItemRepositoryV2<any>,
    router: Router,
    search: SearchService,
  ) { super(repository, router, search) }

  listFilterHeader() {
    return new EntityListFilterV2$Enum<ITOSItemV2>(
      'MarketCategory',
      null,
      FlexSearchEnum.values(FlexSearchEnum$Id.Item$MarketCategory).filter(option => option.value.startsWith(`${ this.category }_`)),
      EntityListFilterV2$Enum$Selection.SINGLE,
      EntityListFilterV2$Enum$Theme.RADIO,
    )
  }

  listTitle(): string {
    return this.category;
  }

}
