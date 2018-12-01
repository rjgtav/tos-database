import {TOSEquipment} from "./tos-equipment.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {ArrayUtils} from "../../../../utils/array-utils";
import {TOSDomainService} from "../../tos-domain.service";
import {TOSRegion} from "../../../tos-region";
import {Observable} from "rxjs";

export class TOSEquipmentRepository extends CRUDRepository<TOSEquipment> {

  static readonly instance: TOSEquipmentRepository = new TOSEquipmentRepository();

  private constructor() {
    super(TOSDataSet.EQUIPMENT);

    TOSDomainService.$loader[TOSDomainService.EQUIPMENT] = () => this.Equipment;
    TOSDomainService.$loader[TOSDomainService.EQUIPMENT_BY_ID] = () => this.EquipmentById;
  }

  get Equipment() { return this.$data.map(value => new TOSEquipment(value)) }
  get EquipmentById() { return ArrayUtils.reduce(TOSDomainService.equipment, '$ID') }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.EQUIPMENT);
      TOSDomainService.clear(TOSDomainService.EQUIPMENT_BY_ID);
    }

    return super.load(force, region);
  }

}
