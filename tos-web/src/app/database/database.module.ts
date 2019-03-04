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

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    EntityDetailComponent,
    EntityListComponent,
    EntityListFilterComponent,
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
    MonsterListConfigurationResolver,
    RecipeListConfigurationResolver,
    SkillListConfigurationResolver,
  ]
})
export class DatabaseModule { }
