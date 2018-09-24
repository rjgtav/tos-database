import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {CRUDService} from "../../../../service/CRUD.service";
import {TOSRecipe} from "./tos-recipe.model";

@Injectable({
  providedIn: 'root'
})
export class TOSRecipeService extends CRUDService<TOSRecipe> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, {
      id: '$ID',
      path: 'assets/data/recipes.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      step: (row: TOSRecipe) => new TOSRecipe(row)
    });
  }

}
