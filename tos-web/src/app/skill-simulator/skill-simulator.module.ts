import {NgModule} from '@angular/core';
import {SkillBuilderComponent} from "./skill-builder/skill-builder.component";
import {SharedModule} from "../shared/shared.module";
import {SkillBuilderJobComponent} from "./skill-builder/skill-builder-job/skill-builder-job.component";
import {SkillBuilderSkillComponent} from './skill-builder/skill-builder-skill/skill-builder-skill.component';
import {SkillBuilderJobSelectorComponent} from "./skill-builder/skill-builder-job-selector/skill-builder-job-selector.component";
import {SkillBuilderJobRankComponent} from "./skill-builder/skill-builder-job-rank/skill-builder-job-rank.component";
import {SkillBuilderJobRankListComponent} from "./skill-builder/skill-builder-job-rank-list/skill-builder-job-rank-list.component";
import {SkillBuilderStatSelectorComponent} from './skill-builder/skill-builder-stat-selector/skill-builder-stat-selector.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    SkillBuilderComponent,
    SkillBuilderJobComponent,
    SkillBuilderJobSelectorComponent,
    SkillBuilderJobRankComponent,
    SkillBuilderSkillComponent,
    SkillBuilderJobRankListComponent,
    SkillBuilderStatSelectorComponent
  ]
})
export class SkillSimulatorModule { }
