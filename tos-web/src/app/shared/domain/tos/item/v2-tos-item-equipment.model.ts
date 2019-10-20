import {TOSItemV2} from "./v2-tos-item.model";
import {ITOSEntityV2, ITOSItemEquipmentV2} from "../tos-domain";
import {LUAService} from "../../../service/lua.service";
import {Observable} from "rxjs";
import {FlexSearchEnum, FlexSearchEnum$Id} from "../../../../../../../tos-search/src/domain/flexsearch-enum";

export class TOSItemEquipmentV2 extends TOSItemV2 implements ITOSItemEquipmentV2 {

  ItemGrade: number;
  Material: string;
  UseLv: number;

  constructor(json: ITOSEntityV2) {
    super(json);
  }

  get ItemGrade$Image(): Observable<string> { return LUAService.INSTANCE.call('GET_ITEM_BG_PICTURE_BY_GRADE', [this.ItemGrade, 0, 0]) }
  get Material$Label(): string { let value = FlexSearchEnum.value(FlexSearchEnum$Id.Equipment$Material, this.Material); return value && value.translation }

}
