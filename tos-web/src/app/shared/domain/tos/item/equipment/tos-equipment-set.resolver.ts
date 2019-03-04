import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSEquipmentSet} from "./tos-equipment.model";
import {TOSDataSet} from "../../tos-domain";

@Injectable()
export class TOSEquipmentSetResolver extends CRUDResolver<TOSEquipmentSet> {

  constructor() { super(TOSDataSet.EQUIPMENT_SETS); }

}
