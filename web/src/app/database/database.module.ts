import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseRoutingModule } from './database-routing.module';
import { SharedModule } from "../shared/shared.module";
import { ItemDetailComponent } from './item-detail/item-detail.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ItemListComponent} from "./item-list/item-list.component";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ItemTooltipComponent} from "./item-tooltip/item-tooltip.component";
import {ItemDetailMaterialNameTypeComponent} from "./item-detail/item-detail-MaterialNameType/item-detail-MaterialNameType.component";
import {ItemDetailChildComponent} from "./item-detail/item-detail-child.component";
import {ItemDetailClassIconGradeComponent} from "./item-detail/item-detail-ClassIconGrade/item-detail-ClassIconGrade.component";
import {ItemDetailInformationComponent} from "./item-detail/item-detail-Information/item-detail-Information.component";
import {ItemDetailStatsUnidentifiedComponent} from "./item-detail/item-detail-StatsUnidentified/item-detail-StatsUnidentified.component";
import {ItemDetailDurabilityPotentialSocketsComponent} from "./item-detail/item-detail-DurabilityPotentialSockets/item-detail-DurabilityPotentialSockets.component";
import {ItemDetailAttackDefenseComponent} from "./item-detail/item-detail-AttackDefense/item-detail-AttackDefense.component";

@NgModule({
  imports: [
    CommonModule,
    DatabaseRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    ItemDetailComponent, ItemDetailChildComponent,
    ItemDetailAttackDefenseComponent,
    ItemDetailClassIconGradeComponent,
    ItemDetailDurabilityPotentialSocketsComponent,
    ItemDetailInformationComponent,
    ItemDetailMaterialNameTypeComponent,
    ItemDetailStatsUnidentifiedComponent,
    ItemListComponent,
    ItemTooltipComponent,
  ]
})
export class DatabaseModule { }
