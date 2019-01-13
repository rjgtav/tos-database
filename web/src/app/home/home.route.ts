import {Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {RouteService} from "../shared/service/route.service";

export const ROUTES_HOME: Routes = [
  {
    path: '',
    canActivate: [RouteService],
    canDeactivate: [RouteService],
    component: WelcomeComponent,
  },
];

