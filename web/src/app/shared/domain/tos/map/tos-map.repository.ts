import { Injectable } from '@angular/core';
import {TOSMap} from "./tos-map.model";
import {CRUDRepository} from "../../../service/CRUD.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSMapRepository extends CRUDRepository<TOSMap> {

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/maps.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSMap) => new TOSMap(row)
    });
  }

}
