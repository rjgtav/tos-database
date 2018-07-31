import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemListComponent} from "./item-list/item-list.component";
import {ItemDetailComponent} from "./item-detail/item-detail.component";
import {TOSItemResolver} from "../shared/domain/tos/item/tos-item.resolver";

const routes: Routes = [
  {
    path: 'items/:id',
    component: ItemDetailComponent,
    resolve: { response: TOSItemResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'items',
    component: ItemListComponent,
    resolve: { response: TOSItemResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatabaseRoutingModule { }
