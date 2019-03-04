import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ClickOutsideModule} from "ng-click-outside";
import {HeaderSearchComponent} from './header/header-search/header-search.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ShellComponent} from "./shell/shell.component";

@NgModule({
  imports: [
    CommonModule,
    ClickOutsideModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    RouterModule,
    SharedModule
  ],
  declarations: [ShellComponent, HeaderComponent, FooterComponent, HeaderSearchComponent],
  exports: [ShellComponent]
})
export class ShellModule { }
