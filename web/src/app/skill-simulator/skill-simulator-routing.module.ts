import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SkillBuilderComponent} from "./skill-builder/skill-builder.component";
import {RegionService} from "../shared/service/region.service";

const routes: Routes = [
  {
    path: '',
    canActivate: [RegionService],
    component: SkillBuilderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillSimulatorRoutingModule { }
