import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItemDetailComponent} from "./item-detail/item-detail.component";
import {TOSItemResolver} from "../shared/domain/tos/item/tos-item.resolver";
import {ItemListConfigurationResolver} from "./resolvers/item-list-configuration.resolver";
import {EquipmentWeaponListConfigurationResolver} from "./resolvers/equipment-weapon-list-configuration-resolver.service";
import {TOSEquipmentResolver} from "../shared/domain/tos/item/equipment/tos-equipment.resolver";
import {EquipmentArmorListConfigurationResolver} from "./resolvers/equipment-armor-list-configuration.resolver";
import {ItemListComponent} from "./item-list/item-list.component";
import {BookListConfigurationResolver} from "./resolvers/book-list-configuration.resolver";
import {TOSBookResolver} from "../shared/domain/tos/item/book/tos-book.resolver";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  },
  {
    path: 'books',
    component: ItemListComponent,
    resolve: {
      configuration: BookListConfigurationResolver,
      response: TOSBookResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'books/:id',
    component: ItemDetailComponent,
    resolve: { response: TOSBookResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'equipment/armor',
    component: ItemListComponent,
    resolve: {
      configuration: EquipmentArmorListConfigurationResolver,
      response: TOSEquipmentResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'equipment/armor/:id',
    component: ItemDetailComponent,
    resolve: { response: TOSEquipmentResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'equipment/weapons',
    component: ItemListComponent,
    resolve: {
      configuration: EquipmentWeaponListConfigurationResolver,
      response: TOSEquipmentResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'equipment/weapons/:id',
    component: ItemDetailComponent,
    resolve: { response: TOSEquipmentResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'items',
    component: ItemListComponent,
    resolve: {
      configuration: ItemListConfigurationResolver,
      response: TOSItemResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'items/:id',
    component: ItemDetailComponent,
    resolve: { response: TOSItemResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    BookListConfigurationResolver, EquipmentArmorListConfigurationResolver, EquipmentWeaponListConfigurationResolver, ItemListConfigurationResolver
  ]
})
export class DatabaseRoutingModule { }
