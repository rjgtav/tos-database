import { Injectable } from '@angular/core';
import {TOSRecipe} from "./tos-recipe.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSRecipeRepository extends CRUDRepository<TOSRecipe> {

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/recipes.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSRecipe) => new TOSRecipe(row)
    });
  }

}
