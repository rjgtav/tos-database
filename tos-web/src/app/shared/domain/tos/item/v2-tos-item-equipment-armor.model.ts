import {ITOSEntityV2, ITOSItemEquipmentArmorV2} from "../tos-domain";
import {FlexSearchEnum, FlexSearchEnum$Id} from "../../../../../../../tos-search/src/domain/flexsearch-enum";
import {TOSItemEquipmentV2} from "./v2-tos-item-equipment.model";

export class TOSItemEquipmentArmorV2 extends TOSItemEquipmentV2 implements ITOSItemEquipmentArmorV2 {

  Material: string;

  constructor(json: ITOSEntityV2) {
    super(json);
  }

  get Material$Label(): string { let value = FlexSearchEnum.value(FlexSearchEnum$Id.Equipment$Material, this.Material); return value && value.translation }

}
