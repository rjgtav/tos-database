import { Injectable } from '@angular/core';
import {TOSGem} from "./tos-gem.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSGemRepository extends CRUDRepository<TOSGem> {

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/gems.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSGem) => new TOSGem(row)
    });
  }

}
