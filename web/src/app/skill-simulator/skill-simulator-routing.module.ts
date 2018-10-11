import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SkillBuilderComponent} from "./skill-builder/skill-builder.component";

const routes: Routes = [
  {
    path: '',
    component: SkillBuilderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillSimulatorRoutingModule { }
