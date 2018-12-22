import {TOSRecipe} from "./tos-recipe.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSRecipeRepository extends CRUDRepository<TOSRecipe> {

  constructor() {
    super(TOSDataSet.RECIPES, value => new TOSRecipe(value), [
      { key: TOSDomainService.RECIPES_BY_ID },
    ]);

    TOSDomainService.$repository[TOSDomainService.RECIPES] = this;
  }

}
