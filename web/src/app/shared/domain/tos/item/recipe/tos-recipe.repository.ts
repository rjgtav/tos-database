import {TOSRecipe} from "./tos-recipe.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";

export class TOSRecipeRepository extends CRUDRepository<TOSRecipe> {

  static readonly instance: TOSRecipeRepository = new TOSRecipeRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.RECIPES,
      loadStep: (row: TOSRecipe) => new TOSRecipe(row)
    });
  }

}
