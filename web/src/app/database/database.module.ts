import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseRoutingModule } from './database-routing.module';
import { SharedModule } from "../shared/shared.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { EntityListFilterComponent } from './entity-filter/entity-list-filter.component';
import {ClickOutsideModule} from "ng-click-outside";
import {EntityDetailComponent} from "./entity-detail/entity-detail.component";
import {EntityListComponent} from "./entity-list/entity-list.component";

@NgModule({
  imports: [
    CommonModule,
    ClickOutsideModule,
    DatabaseRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    EntityDetailComponent,
    EntityListComponent,
    EntityListFilterComponent,
  ]
})
export class DatabaseModule { }
