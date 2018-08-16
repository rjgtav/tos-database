import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TOSSortDirective, TOSSortGroupDirective} from './directives/sort.directive';
import {TOSFilterDirective, TOSFilterGroupDirective} from "./directives/filter.directive";
import {TOSTimePipe} from './directives/time.pipe';
import {TOSItemResolver} from "./domain/tos/item/tos-item.resolver";
import {TOSEquipmentResolver} from "./domain/tos/item/equipment/tos-equipment.resolver";
import {TOSBookResolver} from "./domain/tos/item/book/tos-book.resolver";

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    TOSFilterDirective, TOSFilterGroupDirective,
    TOSSortDirective, TOSSortGroupDirective,
    TOSTimePipe,
  ],
  declarations: [
    TOSFilterDirective, TOSFilterGroupDirective,
    TOSSortDirective, TOSSortGroupDirective,
    TOSTimePipe
  ],
  providers: [
    TOSBookResolver, TOSEquipmentResolver, TOSItemResolver
  ]
})
export class SharedModule { }
