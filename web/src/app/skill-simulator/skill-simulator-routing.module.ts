import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SkillBuilderComponent} from "./skill-builder/skill-builder.component";
import {TOSRegionService} from "../shared/service/tos-region.service";

const routes: Routes = [
  {
    path: '',
    canActivate: [TOSRegionService],
    canDeactivate: [TOSRegionService],
    component: SkillBuilderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillSimulatorRoutingModule { }
