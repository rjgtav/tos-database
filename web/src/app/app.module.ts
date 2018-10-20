import { NgModule }           from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';
import { BrowserModule }      from '@angular/platform-browser';
import { FontAwesomeModule }  from "@fortawesome/angular-fontawesome";
import { NgbModule }          from "@ng-bootstrap/ng-bootstrap";

import { AppComponent }       from './app.component';
import { AppRoutingModule }   from './app-routing.module';
import { SharedModule }       from './shared/shared.module';
import { ShellModule }        from './shell/shell.module';

// Load FontAwesome's icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {
  faBolt,
  faHeart,
  faMinusCircle,
  faPlusCircle,
  faSearch,
  faStar,
  faTimesCircle,
  faWeightHanging,
  faTrashAlt, faTint
} from "@fortawesome/free-solid-svg-icons";
import {LoadingBarModule} from "@ngx-loading-bar/core";

library.add(faBolt, faClock, faHeart, faMinusCircle, faPlusCircle, faTrashAlt, faSearch, faStar, faTimesCircle, faTint, faWeightHanging);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    FontAwesomeModule,
    NgbModule,
    LoadingBarModule.forRoot(),

    SharedModule,
    AppRoutingModule,
    ShellModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
