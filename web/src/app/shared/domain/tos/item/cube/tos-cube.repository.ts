import { Injectable } from '@angular/core';
import {TOSCube} from "./tos-cube.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSCubeRepository extends CRUDRepository<TOSCube> {

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/cubes.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSCube) => new TOSCube(row)
    });
  }

}
