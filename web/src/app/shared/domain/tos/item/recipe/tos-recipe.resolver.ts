import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSRecipeService} from "./tos-recipe.service";
import {TOSRecipe} from "./tos-recipe.model";

@Injectable()
export class TOSRecipeResolver extends CRUDResolver<TOSRecipe> {

  constructor(service: TOSRecipeService) {
    super(service);
  }

}
