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
import {EntityDetailChildComponent} from "./entity-detail/entity-detail-child.component";
import {EntityDetailAttackDefenseComponent} from "./entity-detail/entity-detail-AttackDefense/entity-detail-AttackDefense.component";
import {EntityDetailClassIconGradeComponent} from "./entity-detail/entity-detail-ClassIconGrade/entity-detail-ClassIconGrade.component";
import {EntityDetailDurabilityPotentialSocketsComponent} from "./entity-detail/entity-detail-DurabilityPotentialSockets/entity-detail-DurabilityPotentialSockets.component";
import {EntityDetailInformationComponent} from "./entity-detail/entity-detail-Information/entity-detail-Information.component";
import {EntityDetailMaterialNameTypeComponent} from "./entity-detail/entity-detail-MaterialNameType/entity-detail-MaterialNameType.component";
import {EntityDetailBonusStatsUnidentifiedComponent} from "./entity-detail/entity-detail-BonusStatsUnidentified/entity-detail-BonusStatsUnidentified.component";
import {EntityListComponent} from "./entity-list/entity-list.component";
import {EntityTooltipComponent} from "./entity-tooltip/entity-tooltip.component";
import {EntityDetailStatsComponent} from "./entity-detail/entity-detail-Stats/entity-detail-Stats.component";
import { EntityDetailTableComponent } from './entity-detail/entity-detail-Table/entity-detail-Table.component';
import { EntityDetailCardComponent } from './entity-detail/entity-detail-Card/entity-detail-Card.component';
import { EntityDetailDescriptionComponent } from './entity-detail/entity-detail-Description/entity-detail-Description.component';
import { EntityDetailGemComponent } from './entity-detail/entity-detail-Gem/entity-detail-Gem.component';
import { EntityDetailBookComponent } from './entity-detail/entity-detail-Book/entity-detail-Book.component';

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
    EntityDetailComponent, EntityDetailChildComponent,
    EntityDetailAttackDefenseComponent,
    EntityDetailClassIconGradeComponent,
    EntityDetailDurabilityPotentialSocketsComponent,
    EntityDetailInformationComponent,
    EntityDetailMaterialNameTypeComponent,
    EntityDetailBonusStatsUnidentifiedComponent,
    EntityDetailStatsComponent,
    EntityDetailTableComponent,
    EntityListComponent,
    EntityTooltipComponent,
    EntityListFilterComponent,
    EntityDetailCardComponent,
    EntityDetailDescriptionComponent,
    EntityDetailGemComponent,
    EntityDetailBookComponent,
  ]
})
export class DatabaseModule { }
