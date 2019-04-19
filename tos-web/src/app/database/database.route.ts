import {Routes} from '@angular/router';
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
import {RouteService} from "../shared/service/route.service";
import {MapListConfigurationResolver} from "./resolvers/map-list-configuration.resolver";
import {TOSMapResolver} from "../shared/domain/tos/map/tos-map.resolver";
import {EntityDetailMapComponent} from "./entity-detail-v2/entity-detail-map/entity-detail-map.component";

export const ROUTES_DATABASE: Routes = [
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  },
  {
    path: 'attributes',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: AttributeListConfigurationResolver,
      response: TOSAttributeResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'attributes/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSAttributeResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'books',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: BookListConfigurationResolver,
      response: TOSBookResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'books/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSBookResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'cards',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: CardListConfigurationResolver,
      response: TOSCardResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'cards/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSCardResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'classes',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: JobListConfigurationResolver,
      response: TOSJobResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'classes/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSJobResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'collections',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: CollectionListConfigurationResolver,
      response: TOSCollectionResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'collections/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSCollectionResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'cubes',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: CubeListConfigurationResolver,
      response: TOSCubeResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'cubes/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSCubeResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'equipment',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: EquipmentListConfigurationResolver,
      response: TOSEquipmentResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'equipment/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSEquipmentResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'equipment-sets',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: EquipmentSetListConfigurationResolver,
      response: TOSEquipmentSetResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'equipment-sets/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSEquipmentSetResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'gems',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: GemListConfigurationResolver,
      response: TOSGemResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'gems/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSGemResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'items',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: ItemListConfigurationResolver,
      response: TOSItemResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'items/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSItemResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'maps',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: MapListConfigurationResolver,
      response: TOSMapResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'maps/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailMapComponent,
    resolve: { response: TOSMapResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'monsters',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: MonsterListConfigurationResolver,
      response: TOSMonsterResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'monsters/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSMonsterResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'recipes',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: RecipeListConfigurationResolver,
      response: TOSRecipeResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'recipes/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSRecipeResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'skills',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityListComponent,
    resolve: {
      configuration: SkillListConfigurationResolver,
      response: TOSSkillResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'skills/:id',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: EntityDetailComponent,
    resolve: { response: TOSSkillResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
];
