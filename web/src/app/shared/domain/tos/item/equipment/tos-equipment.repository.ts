import {TOSEquipment} from "./tos-equipment.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";

export class TOSEquipmentRepository extends CRUDRepository<TOSEquipment> {

  static readonly instance: TOSEquipmentRepository = new TOSEquipmentRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.EQUIPMENT,
      loadStep: (row: TOSEquipment) => new TOSEquipment(row)
    });
  }

}
