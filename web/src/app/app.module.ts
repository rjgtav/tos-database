import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {ShellModule} from './shell/shell.module';
// Load FontAwesome's icons
import {library} from '@fortawesome/fontawesome-svg-core';
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {
  faBolt,
  faHeart,
  faMinusCircle,
  faPlusCircle,
  faSearch,
  faStar,
  faTimesCircle,
  faTint,
  faTrashAlt,
  faWeightHanging
} from "@fortawesome/free-solid-svg-icons";
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LoadingComponent} from "./shell/loading/loading.component";

library.add(faBolt, faClock, faHeart, faMinusCircle, faPlusCircle, faTrashAlt, faSearch, faStar, faTimesCircle, faTint, faWeightHanging);

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    FontAwesomeModule,
    NgbModule,

    SharedModule.forRoot(),
    AppRoutingModule,
    ShellModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
