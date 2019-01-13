import {NgModule} from '@angular/core';
import {WelcomeComponent} from './welcome/welcome.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    WelcomeComponent
  ],
})
export class HomeModule { }
