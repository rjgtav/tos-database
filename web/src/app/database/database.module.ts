import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseRoutingModule } from './database-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,

    DatabaseRoutingModule,
  ],
  declarations: [ItemListComponent]
})
export class DatabaseModule { }
