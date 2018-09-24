import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SkillBuilderComponent} from "./skill-builder/skill-builder.component";
import {SkillSimulatorResolver} from "./skill-simulator.resolver";

const routes: Routes = [
  {
    path: '',
    component: SkillBuilderComponent,
    resolve: {
      data: SkillSimulatorResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    SkillSimulatorResolver,
  ]
})
export class SkillSimulatorRoutingModule { }
