import {Injectable} from "@angular/core";
import {TOSEquipment} from "./tos-equipment.model";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSRepositoryService} from "../../tos-repository.service";

@Injectable()
export class TOSEquipmentResolver extends CRUDResolver<TOSEquipment> {

  constructor() {
    super(
      TOSRepositoryService.findEquipment,
      TOSRepositoryService.findEquipmentById,
    );
  }

}
