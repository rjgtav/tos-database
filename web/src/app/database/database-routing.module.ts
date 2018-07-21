import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemListComponent} from "./item-list/item-list.component";

const routes: Routes = [
  {
    path: 'items',
    component: ItemListComponent
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
