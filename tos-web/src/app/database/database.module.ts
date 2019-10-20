import {NgModule} from '@angular/core';

import {SharedModule} from "../shared/shared.module";
import {EntityListFilterComponent} from './entity-filter/entity-list-filter.component';
import {EntityDetailComponent} from "./entity-detail/entity-detail.component";
import {EntityListComponent} from "./entity-list/entity-list.component";
import {AttributeListConfigurationResolver} from "./resolvers/attribute-list-configuration.resolver";
import {BookListConfigurationResolver} from "./resolvers/book-list-configuration.resolver";
import {CardListConfigurationResolver} from "./resolvers/card-list-configuration.resolver";
import {CollectionListConfigurationResolver} from "./resolvers/collection-list-configuration.resolver";
import {CubeListConfigurationResolver} from "./resolvers/cube-list-configuration.resolver";
import {EquipmentListConfigurationResolver} from "./resolvers/equipment-list-configuration-resolver.service";
import {EquipmentSetListConfigurationResolver} from "./resolvers/equipment-set-list-configuration.resolver";
import {GemListConfigurationResolver} from "./resolvers/gem-list-configuration.resolver";
import {ItemListConfigurationResolver} from "./resolvers/item-list-configuration.resolver";
import {JobListConfigurationResolver} from "./resolvers/job-list-configuration.resolver";
import {MonsterListConfigurationResolver} from "./resolvers/monster-list-configuration.resolver";
import {RecipeListConfigurationResolver} from "./resolvers/recipe-list-configuration.resolver";
import {SkillListConfigurationResolver} from "./resolvers/skill-list-configuration.resolver";
import {MapListConfigurationResolver} from "./resolvers/map-list-configuration.resolver";
import {EntityDetailMapComponent} from './entity-detail-v2/entity-detail-map/entity-detail-map.component';
import {EntityListV2Component} from './entity-list-v2/entity-list-v2.component';
import {EntityListFilterV2Component} from './entity-list-filter-v2/entity-list-filter-v2.component';
import {EntityListFilterV2EnumComponent} from './entity-list-filter-v2/entity-list-filter-v2-enum/entity-list-filter-v2-enum.component';
import {EntityListFilterV2NumberComponent} from './entity-list-filter-v2/entity-list-filter-v2-number/entity-list-filter-v2-number.component';
import {EntityListFilterV2RangeComponent} from './entity-list-filter-v2/entity-list-filter-v2-range/entity-list-filter-v2-range.component';
import {TOSArmorEquipmentListResolver} from "./resolvers/items/tos-armor-equipment-list.resolver";

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
    TOSArmorEquipmentListResolver,
  ]
})
export class DatabaseModule { }
