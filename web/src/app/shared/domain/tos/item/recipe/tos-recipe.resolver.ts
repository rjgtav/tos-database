import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSRecipe} from "./tos-recipe.model";
import {TOSDataSet} from "../../tos-domain";

@Injectable()
export class TOSRecipeResolver extends CRUDResolver<TOSRecipe> {

  constructor() { super(TOSDataSet.RECIPES); }

}
