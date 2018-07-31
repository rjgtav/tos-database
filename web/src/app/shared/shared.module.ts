import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TOSSortDirective, TOSSortGroupDirective} from './directives/sort.directive';
import {TOSFilterDirective, TOSFilterGroupDirective} from "./directives/filter.directive";
import {TOSTimePipe} from './directives/time.pipe';
import {TOSItemResolver} from "./domain/tos/item/tos-item.resolver";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TOSFilterDirective, TOSFilterGroupDirective,
    TOSSortDirective, TOSSortGroupDirective,
    TOSTimePipe
  ],
  declarations: [
    TOSFilterDirective, TOSFilterGroupDirective,
    TOSSortDirective, TOSSortGroupDirective,
    TOSTimePipe
  ],
  providers: [
    TOSItemResolver
  ]
})
export class SharedModule { }
