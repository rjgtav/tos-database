import { Injectable } from '@angular/core';
import {TOSEquipmentSet} from "./tos-equipment.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSEquipmentSetRepository extends CRUDRepository<TOSEquipmentSet> {

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/equipment_sets.csv',
      searchKeys: ['$ID', '$ID_NAME', 'Name'],
      loadStep: (row: TOSEquipmentSet) => new TOSEquipmentSet(row)
    });
  }

}
