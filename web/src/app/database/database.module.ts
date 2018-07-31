import { NgModule } from '@angular/core';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';

import { DatabaseRoutingModule } from './database-routing.module';
import { SharedModule } from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemTooltipComponent } from "./item-tooltip/item-tooltip.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,

    DatabaseRoutingModule,
    SharedModule
  ],
  declarations: [ItemDetailComponent, ItemListComponent, ItemTooltipComponent]
})
export class DatabaseModule { }
