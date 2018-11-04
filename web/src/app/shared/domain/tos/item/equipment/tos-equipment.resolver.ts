import {Injectable} from "@angular/core";
import {TOSEquipment} from "./tos-equipment.model";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSDataSet} from "../../tos-domain";

@Injectable()
export class TOSEquipmentResolver extends CRUDResolver<TOSEquipment> {

  constructor() { super(TOSDataSet.EQUIPMENT); }

}
