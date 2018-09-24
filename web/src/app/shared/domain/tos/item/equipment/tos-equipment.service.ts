import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {TOSEquipment} from "./tos-equipment.model";
import {CRUDService} from "../../../../service/CRUD.service";

@Injectable({
  providedIn: 'root'
})
export class TOSEquipmentService extends CRUDService<TOSEquipment> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, {
      id: '$ID',
      path: 'assets/data/equipment.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      step: (row: TOSEquipment) => new TOSEquipment(row)
    });
  }

}
