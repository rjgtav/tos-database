import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSEquipmentSet} from "./tos-equipment.model";
import {TOSRepositoryService} from "../../tos-repository.service";

@Injectable()
export class TOSEquipmentSetResolver extends CRUDResolver<TOSEquipmentSet> {

  constructor() {
    super(
      TOSRepositoryService.findEquipmentSets,
      TOSRepositoryService.findEquipmentSetsById,
      TOSRepositoryService.searchEquipmentSets,
    );
  }

}
