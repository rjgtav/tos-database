import {TOSRecipe} from "./tos-recipe.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {ArrayUtils} from "../../../../utils/array-utils";
import {TOSDomainService} from "../../tos-domain.service";
import {TOSRegion} from "../../../tos-region";
import {Observable} from "rxjs";

export class TOSRecipeRepository extends CRUDRepository<TOSRecipe> {

  static readonly instance: TOSRecipeRepository = new TOSRecipeRepository();

  private constructor() {
    super(TOSDataSet.RECIPES);

    TOSDomainService.$loader[TOSDomainService.RECIPES] = () => this.Recipes;
    TOSDomainService.$loader[TOSDomainService.RECIPES_BY_ID] = () => this.RecipesById;
  }

  get Recipes() { return this.$data.map(value => new TOSRecipe(value)) }
  get RecipesById() { return ArrayUtils.reduce(TOSDomainService.recipes, '$ID') }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.RECIPES);
      TOSDomainService.clear(TOSDomainService.RECIPES_BY_ID);
    }

    return super.load(force, region);
  }

}
