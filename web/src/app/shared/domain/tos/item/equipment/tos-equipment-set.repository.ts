import {TOSEquipmentSet} from "./tos-equipment.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSEquipmentSetRepository extends CRUDRepository<TOSEquipmentSet> {

  constructor() {
    super(TOSDataSet.EQUIPMENT_SETS, value => new TOSEquipmentSet(value), [
      { key: TOSDomainService.EQUIPMENT_SETS_BY_ID },
    ]);

    TOSDomainService.$repository[TOSDomainService.EQUIPMENT_SETS] = this;
  }

}
