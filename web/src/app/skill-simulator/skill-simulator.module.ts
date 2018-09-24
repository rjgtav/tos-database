import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkillBuilderComponent} from "./skill-builder/skill-builder.component";
import {SkillSimulatorRoutingModule} from "./skill-simulator-routing.module";
import {ClickOutsideModule} from "ng-click-outside";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared/shared.module";
import { SkillBuilderRankIndicatorComponent } from './skill-builder/skill-builder-rank-indicator/skill-builder-rank-indicator.component';
import {SkillBuilderJobComponent} from "./skill-builder/skill-builder-job/skill-builder-job.component";
import {SkillBuilderJobChooseComponent} from "./skill-builder/skill-builder-job-choose/skill-builder-job-choose.component";
import { SkillBuilderSkillComponent } from './skill-builder/skill-builder-skill/skill-builder-skill.component';

@NgModule({
  imports: [
    CommonModule,
    ClickOutsideModule,
    FontAwesomeModule,
    SharedModule,
    SkillSimulatorRoutingModule,
  ],
  declarations: [SkillBuilderComponent, SkillBuilderJobComponent, SkillBuilderJobChooseComponent, SkillBuilderRankIndicatorComponent, SkillBuilderSkillComponent]
})
export class SkillSimulatorModule { }
