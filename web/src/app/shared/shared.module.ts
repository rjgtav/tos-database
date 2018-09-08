import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TOSSortDirective, TOSSortGroupDirective} from './directives/sort.directive';
import {TOSFilterDirective, TOSFilterGroupDirective} from "./directives/filter.directive";
import {TOSTimePipe} from './directives/time.pipe';
import {TOSItemResolver} from "./domain/tos/item/tos-item.resolver";
import {TOSEquipmentResolver} from "./domain/tos/item/equipment/tos-equipment.resolver";
import {TOSBookResolver} from "./domain/tos/item/book/tos-book.resolver";
import {TOSCollectionResolver} from "./domain/tos/item/collection/tos-collection.resolver";
import {TOSMonsterResolver} from "./domain/tos/monster/tos-monster.resolver";
import {TOSRecipeResolver} from "./domain/tos/item/recipe/tos-recipe.resolver";
import {TOSCubeResolver} from "./domain/tos/item/cube/tos-cube-resolver.service";
import {TOSEquipmentSetResolver} from "./domain/tos/item/equipment/tos-equipment-set.resolver";
import {TOSCardResolver} from "./domain/tos/item/card/tos-card.resolver";
import {TOSGemResolver} from "./domain/tos/item/gem/tos-gem.resolver";
import { TOSInputNumberComponent } from './components/input-number/input-number.component';
import {ClickOutsideModule} from "ng-click-outside";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ClickOutsideModule,
    FormsModule,
  ],
  exports: [
    TOSFilterDirective, TOSFilterGroupDirective,
    TOSSortDirective, TOSSortGroupDirective,
    TOSTimePipe,
    TOSInputNumberComponent,
  ],
  declarations: [
    TOSFilterDirective, TOSFilterGroupDirective,
    TOSSortDirective, TOSSortGroupDirective,
    TOSTimePipe,
    TOSInputNumberComponent,
  ],
  providers: [
    TOSBookResolver,
    TOSCardResolver,
    TOSCollectionResolver,
    TOSCubeResolver,
    TOSEquipmentResolver,
    TOSEquipmentSetResolver,
    TOSGemResolver,
    TOSItemResolver,
    TOSMonsterResolver,
    TOSRecipeResolver,
  ]
})
export class SharedModule { }
