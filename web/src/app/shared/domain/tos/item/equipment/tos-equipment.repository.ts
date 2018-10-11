import { Injectable } from '@angular/core';
import {TOSEquipment} from "./tos-equipment.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSEquipmentRepository extends CRUDRepository<TOSEquipment> {

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/equipment.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSEquipment) => new TOSEquipment(row)
    });
  }

}
