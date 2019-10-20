import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {ShellModule} from './shell/shell.module';
import {LoadingComponent} from "./shell/loading/loading.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot(),

    AppRoutingModule,
    SharedModule.forRoot(),
    ShellModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
