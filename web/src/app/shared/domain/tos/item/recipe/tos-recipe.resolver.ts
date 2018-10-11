import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSRecipe} from "./tos-recipe.model";
import {TOSRepositoryService} from "../../tos-repository.service";

@Injectable()
export class TOSRecipeResolver extends CRUDResolver<TOSRecipe> {

  constructor() {
    super(
      TOSRepositoryService.findRecipes,
      TOSRepositoryService.findRecipesById,
      TOSRepositoryService.searchRecipes,
    );
  }

}
