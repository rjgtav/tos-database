import {Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {RouteService} from "../shared/service/route.service";
import {PatreonComponent} from "./patreon/patreon.component";

export const ROUTES_HOME: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        canActivate: [RouteService],
        canDeactivate: [RouteService],
        component: WelcomeComponent,
      },
      {
        path: 'patreon',
        canActivate: [RouteService],
        canDeactivate: [RouteService],
        component: PatreonComponent,
      },
    ]
  },
];

