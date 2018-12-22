import {TOSEquipment} from "./tos-equipment.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSEquipmentRepository extends CRUDRepository<TOSEquipment> {

  constructor() {
    super(TOSDataSet.EQUIPMENT, value => new TOSEquipment(value), [
      { key: TOSDomainService.EQUIPMENT_BY_ID },
    ]);

    TOSDomainService.$repository[TOSDomainService.EQUIPMENT] = this;
  }

}
