import {TOSEquipmentSet} from "./tos-equipment.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";

export class TOSEquipmentSetRepository extends CRUDRepository<TOSEquipmentSet> {

  static readonly instance: TOSEquipmentSetRepository = new TOSEquipmentSetRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.EQUIPMENT_SETS,
      loadStep: (row: TOSEquipmentSet) => new TOSEquipmentSet(row)
    });
  }

}
