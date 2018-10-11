import { Injectable } from '@angular/core';
import {TOSMonster} from "./tos-monster.model";
import {CRUDRepository} from "../../../service/CRUD.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSMonsterRepository extends CRUDRepository<TOSMonster> {

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/monsters.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSMonster) => new TOSMonster(row)
    });
  }

}
