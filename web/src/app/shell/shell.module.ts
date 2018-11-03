import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ClickOutsideModule} from "ng-click-outside";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import { HeaderSearchComponent } from './header/header-search/header-search.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ClickOutsideModule,
    FontAwesomeModule,
    FormsModule,
    LoadingBarModule,
    NgbModule,
    RouterModule,
    SharedModule
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, HeaderSearchComponent],
  exports: [LayoutComponent]
})
export class ShellModule { }
