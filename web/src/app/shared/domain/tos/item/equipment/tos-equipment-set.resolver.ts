import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSEquipmentSetService} from "./tos-equipment-set.service";
import {TOSEquipmentSet} from "./tos-equipment.model";

@Injectable()
export class TOSEquipmentSetResolver extends CRUDResolver<TOSEquipmentSet> {

  constructor(service: TOSEquipmentSetService) {
    super(service);
  }

}
