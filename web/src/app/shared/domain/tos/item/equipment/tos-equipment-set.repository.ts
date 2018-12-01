import {TOSEquipmentSet} from "./tos-equipment.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {ArrayUtils} from "../../../../utils/array-utils";
import {TOSDomainService} from "../../tos-domain.service";
import {Observable} from "rxjs";
import {TOSRegion} from "../../../tos-region";

export class TOSEquipmentSetRepository extends CRUDRepository<TOSEquipmentSet> {

  static readonly instance: TOSEquipmentSetRepository = new TOSEquipmentSetRepository();

  private constructor() {
    super(TOSDataSet.EQUIPMENT_SETS);

    TOSDomainService.$loader[TOSDomainService.EQUIPMENT_SETS] = () => this.EquipmentSets;
    TOSDomainService.$loader[TOSDomainService.EQUIPMENT_SETS_BY_ID] = () => this.EquipmentSetsById;
  }

  get EquipmentSets() { return this.$data.map(value => new TOSEquipmentSet(value)) }
  get EquipmentSetsById() { return ArrayUtils.reduce(TOSDomainService.equipmentSets, '$ID') }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.EQUIPMENT_SETS);
      TOSDomainService.clear(TOSDomainService.EQUIPMENT_SETS_BY_ID);
    }

    return super.load(force, region);
  }

}
