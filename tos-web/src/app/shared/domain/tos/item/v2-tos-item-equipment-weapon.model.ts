import {ITOSEntityV2, ITOSItemEquipmentWeaponV2} from "../tos-domain";
import {TOSItemEquipmentV2} from "./v2-tos-item-equipment.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TOSUrlService} from "../../../service/tos-url.service";
import {map} from "rxjs/operators";

export class TOSItemEquipmentWeaponV2 extends TOSItemEquipmentV2 implements ITOSItemEquipmentWeaponV2 {

  constructor(json: ITOSEntityV2) {
    super(json);
  }

  $Model(http: HttpClient): Observable<string> {
    return http
      .get<{ FileName: string }>(TOSUrlService.ApiData(this.ModelType, 'modellist_pc'))
      .pipe(map(value => `${ value.FileName }_${ this.FileName }`));
  }

}

