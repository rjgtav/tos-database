import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TOSRegionService} from "../shared/service/tos-region.service";
import {WelcomeComponent} from "./welcome/welcome.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [TOSRegionService],
    canDeactivate: [TOSRegionService],
    component: WelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
