import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {CRUDService} from "../../../../service/CRUD.service";
import {TOSEquipmentSet} from "./tos-equipment.model";

@Injectable({
  providedIn: 'root'
})
export class TOSEquipmentSetService extends CRUDService<TOSEquipmentSet> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, {
      id: '$ID',
      path: 'assets/data/equipment_sets.csv',
      searchKeys: ['$ID', '$ID_NAME', 'Name'],
      step: (row: TOSEquipmentSet) => new TOSEquipmentSet(row)
    });
  }

}
