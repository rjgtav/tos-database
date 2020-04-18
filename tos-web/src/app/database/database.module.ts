import {NgModule} from '@angular/core';

import {SharedModule} from "../shared/shared.module";
import {EntityListFilterComponent} from './entity-filter/entity-list-filter.component';
import {EntityDetailComponent} from "./entity-detail/entity-detail.component";
import {EntityListComponent} from "./entity-list/entity-list.component";
import {AttributeListConfigurationResolver} from "./resolvers/deprecated/attribute-list-configuration.resolver";
import {BookListConfigurationResolver} from "./resolvers/deprecated/book-list-configuration.resolver";
import {CardListConfigurationResolver} from "./resolvers/deprecated/card-list-configuration.resolver";
import {CollectionListConfigurationResolver} from "./resolvers/deprecated/collection-list-configuration.resolver";
import {CubeListConfigurationResolver} from "./resolvers/deprecated/cube-list-configuration.resolver";
import {EquipmentListConfigurationResolver} from "./resolvers/deprecated/equipment-list-configuration-resolver.service";
import {EquipmentSetListConfigurationResolver} from "./resolvers/deprecated/equipment-set-list-configuration.resolver";
import {GemListConfigurationResolver} from "./resolvers/deprecated/gem-list-configuration.resolver";
import {ItemListConfigurationResolver} from "./resolvers/deprecated/item-list-configuration.resolver";
import {JobListConfigurationResolver} from "./resolvers/deprecated/job-list-configuration.resolver";
import {MonsterListConfigurationResolver} from "./resolvers/deprecated/monster-list-configuration.resolver";
import {RecipeListConfigurationResolver} from "./resolvers/deprecated/recipe-list-configuration.resolver";
import {SkillListConfigurationResolver} from "./resolvers/deprecated/skill-list-configuration.resolver";
import {MapListConfigurationResolver} from "./resolvers/deprecated/map-list-configuration.resolver";
import {EntityDetailMapComponent} from './entity-detail-v1/entity-detail-map/entity-detail-map.component';
import {EntityListV2Component} from './entity-list-v2/entity-list-v2.component';
import {EntityListFilterV2Component} from './entity-list-filter-v2/entity-list-filter-v2.component';
import {EntityListFilterV2EnumComponent} from './entity-list-filter-v2/entity-list-filter-v2-enum/entity-list-filter-v2-enum.component';
import {EntityListFilterV2NumberComponent} from './entity-list-filter-v2/entity-list-filter-v2-number/entity-list-filter-v2-number.component';
import {EntityListFilterV2RangeComponent} from './entity-list-filter-v2/entity-list-filter-v2-range/entity-list-filter-v2-range.component';
import {TOSItemArmorResolver} from "./resolvers/items/tos-item-armor.resolver";
import {TOSItemWeaponResolver} from "./resolvers/items/tos-item-weapon.resolver";
import {EntityDetailV2Component} from './entity-detail-v2/entity-detail-v2.component';
import {EntityDetailV2EntityDescriptionComponent} from './entity-detail-v2/entity-detail-v2-entity-description/entity-detail-v2-entity-description.component';
import {EntityDetailV2DividerComponent} from './entity-detail-v2/entity-detail-v2-divider/entity-detail-v2-divider.component';
import {EntityDetailV2EquipmentEnhancementComponent} from './entity-detail-v2/entity-detail-v2-equipment-enhancement/entity-detail-v2-equipment-enhancement.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    EntityDetailComponent,
    EntityListComponent,
    EntityListFilterComponent,
    EntityDetailMapComponent,
    EntityListV2Component,
    EntityListFilterV2Component,
    EntityListFilterV2EnumComponent,
    EntityListFilterV2NumberComponent,
    EntityListFilterV2RangeComponent,
    EntityDetailV2Component,
    EntityDetailV2EntityDescriptionComponent,
    EntityDetailV2DividerComponent,
    EntityDetailV2EquipmentEnhancementComponent,
  ],
  providers: [
    AttributeListConfigurationResolver,
    BookListConfigurationResolver,
    CardListConfigurationResolver,
    CollectionListConfigurationResolver,
    CubeListConfigurationResolver,
    EquipmentListConfigurationResolver,
    EquipmentSetListConfigurationResolver,
    GemListConfigurationResolver,
    ItemListConfigurationResolver,
    JobListConfigurationResolver,
    MapListConfigurationResolver,
    MonsterListConfigurationResolver,
    RecipeListConfigurationResolver,
    SkillListConfigurationResolver,
    TOSItemArmorResolver,
    TOSItemWeaponResolver,
  ]
})
export class DatabaseModule { }
