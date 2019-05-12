import {Routes} from '@angular/router';
import {SkillBuilderComponent} from "./skill-builder/skill-builder.component";
import {RouteService} from "../shared/service/route.service";

export const ROUTES_SKILL_SIMULATOR: Routes = [
  {
    path: '',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: SkillBuilderComponent,
  },
];
