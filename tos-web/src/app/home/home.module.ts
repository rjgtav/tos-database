import {NgModule} from '@angular/core';
import {WelcomeComponent} from './welcome/welcome.component';
import {SharedModule} from "../shared/shared.module";
import {PatreonComponent} from './patreon/patreon.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    WelcomeComponent,
    PatreonComponent
  ],
})
export class HomeModule { }
