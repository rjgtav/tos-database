import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TOSRegionService} from "./shared/service/tos-region.service";

const routes: Routes = [
  {
    path: 'database',
    loadChildren: './database/database.module#DatabaseModule'
  },
  {
    path: 'simulator',
    loadChildren: './skill-simulator/skill-simulator.module#SkillSimulatorModule'
  },
];

const routesRegion: Routes = [
  {
    path: '',
    redirectTo: 'itos',
    pathMatch: 'full'
  },
  {
    path: 'itos',
    canActivate: [TOSRegionService],
    canDeactivate: [TOSRegionService],
    children: routes,
  },
  {
    path: 'jtos',
    canActivate: [TOSRegionService],
    canDeactivate: [TOSRegionService],
    children: routes,
  },
  {
    path: 'ktest',
    children: routes,
    canActivate: [TOSRegionService],
    canDeactivate: [TOSRegionService],
  },
  {
    path: 'ktos',
    children: routes,
    canActivate: [TOSRegionService],
    canDeactivate: [TOSRegionService],
  },
  {
    matcher: TOSRegionService.UrlMatcher,
    redirectTo: 'itos/:redirect',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routesRegion, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'ignore',
    scrollPositionRestoration: 'disabled' // Note: as of angular 6.1, when 'enabled', we can't disable it for specific routes (e.g. the simulator)
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
