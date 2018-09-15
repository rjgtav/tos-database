import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ClickOutsideModule} from "ng-click-outside";

@NgModule({
  imports: [
    CommonModule,
    ClickOutsideModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  exports: [LayoutComponent]
})
export class ShellModule { }
