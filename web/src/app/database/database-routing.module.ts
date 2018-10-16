import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TOSItemResolver} from "../shared/domain/tos/item/tos-item.resolver";
import {ItemListConfigurationResolver} from "./resolvers/item-list-configuration.resolver";
import {EquipmentListConfigurationResolver} from "./resolvers/equipment-list-configuration-resolver.service";
import {TOSEquipmentResolver} from "../shared/domain/tos/item/equipment/tos-equipment.resolver";
import {BookListConfigurationResolver} from "./resolvers/book-list-configuration.resolver";
import {TOSBookResolver} from "../shared/domain/tos/item/book/tos-book.resolver";
import {CollectionListConfigurationResolver} from "./resolvers/collection-list-configuration.resolver";
import {TOSCollectionResolver} from "../shared/domain/tos/item/collection/tos-collection.resolver";
import {MonsterListConfigurationResolver} from "./resolvers/monster-list-configuration.resolver";
import {TOSMonsterResolver} from "../shared/domain/tos/monster/tos-monster.resolver";
import {EntityDetailComponent} from "./entity-detail/entity-detail.component";
import {EntityListComponent} from "./entity-list/entity-list.component";
import {TOSRecipeResolver} from "../shared/domain/tos/item/recipe/tos-recipe.resolver";
import {RecipeListConfigurationResolver} from "./resolvers/recipe-list-configuration.resolver";
import {EquipmentSetListConfigurationResolver} from "./resolvers/equipment-set-list-configuration.resolver";
import {CubeListConfigurationResolver} from "./resolvers/cube-list-configuration.resolver";
import {TOSCubeResolver} from "../shared/domain/tos/item/cube/tos-cube.resolver";
import {TOSEquipmentSetResolver} from "../shared/domain/tos/item/equipment/tos-equipment-set.resolver";
import {CardListConfigurationResolver} from "./resolvers/card-list-configuration.resolver";
import {TOSCardResolver} from "../shared/domain/tos/item/card/tos-card.resolver";
import {GemListConfigurationResolver} from "./resolvers/gem-list-configuration.resolver";
import {TOSGemResolver} from "../shared/domain/tos/item/gem/tos-gem.resolver";
import {TOSAttributeResolver} from "../shared/domain/tos/attribute/tos-attribute.resolver";
import {AttributeListConfigurationResolver} from "./resolvers/attribute-list-configuration.resolver";
import {SkillListConfigurationResolver} from "./resolvers/skill-list-configuration.resolver";
import {TOSSkillResolver} from "../shared/domain/tos/skill/tos-skill.resolver";
import {JobListConfigurationResolver} from "./resolvers/job-list-configuration.resolver";
import {TOSJobResolver} from "../shared/domain/tos/job/tos-job.resolver";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  },
  {
    path: 'attributes',
    component: EntityListComponent,
    resolve: {
      configuration: AttributeListConfigurationResolver,
      response: TOSAttributeResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'attributes/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSAttributeResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'books',
    component: EntityListComponent,
    resolve: {
      configuration: BookListConfigurationResolver,
      response: TOSBookResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'books/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSBookResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'cards',
    component: EntityListComponent,
    resolve: {
      configuration: CardListConfigurationResolver,
      response: TOSCardResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'cards/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSCardResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'classes',
    component: EntityListComponent,
    resolve: {
      configuration: JobListConfigurationResolver,
      response: TOSJobResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'classes/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSJobResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'collections',
    component: EntityListComponent,
    resolve: {
      configuration: CollectionListConfigurationResolver,
      response: TOSCollectionResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'collections/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSCollectionResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'cubes',
    component: EntityListComponent,
    resolve: {
      configuration: CubeListConfigurationResolver,
      response: TOSCubeResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'cubes/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSCubeResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'equipment',
    component: EntityListComponent,
    resolve: {
      configuration: EquipmentListConfigurationResolver,
      response: TOSEquipmentResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'equipment/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSEquipmentResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'equipment-sets',
    component: EntityListComponent,
    resolve: {
      configuration: EquipmentSetListConfigurationResolver,
      response: TOSEquipmentSetResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'equipment-sets/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSEquipmentSetResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'gems',
    component: EntityListComponent,
    resolve: {
      configuration: GemListConfigurationResolver,
      response: TOSGemResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'gems/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSGemResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'items',
    component: EntityListComponent,
    resolve: {
      configuration: ItemListConfigurationResolver,
      response: TOSItemResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'items/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSItemResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'monsters',
    component: EntityListComponent,
    resolve: {
      configuration: MonsterListConfigurationResolver,
      response: TOSMonsterResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'monsters/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSMonsterResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'recipes',
    component: EntityListComponent,
    resolve: {
      configuration: RecipeListConfigurationResolver,
      response: TOSRecipeResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'recipes/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSRecipeResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'skills',
    component: EntityListComponent,
    resolve: {
      configuration: SkillListConfigurationResolver,
      response: TOSSkillResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'skills/:id',
    component: EntityDetailComponent,
    resolve: { response: TOSSkillResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
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
export class DatabaseRoutingModule { }
