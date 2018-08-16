import {Injectable} from "@angular/core";
import {TOSEquipment} from "./tos-equipment.model";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSEquipmentService} from "./tos-equipment.service";

@Injectable()
export class TOSEquipmentResolver extends CRUDResolver<TOSEquipment> {

  constructor(service: TOSEquipmentService) {
    super(service);
  }

}
