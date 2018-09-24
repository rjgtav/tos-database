import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {TOSMonster} from "./tos-monster.model";
import {CRUDService} from "../../../service/CRUD.service";

@Injectable({
  providedIn: 'root'
})
export class TOSMonsterService extends CRUDService<TOSMonster> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, {
      id: '$ID',
      path: 'assets/data/monsters.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      step: (row: TOSMonster) => new TOSMonster(row)
    });
  }

}
