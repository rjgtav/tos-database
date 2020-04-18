import {Injectable} from "@angular/core";
import {ITOSEntityV2, ITOSItemEquipmentWeaponV2} from "../tos-domain";
import {HttpClient} from "@angular/common/http";
import {SearchService} from "../../../service/search.service";
import {TOSItemRepositoryV2} from "./v2-tos-item.repository";
import {TOSItemEquipmentWeaponV2} from "./v2-tos-item-equipment-weapon.model";

@Injectable({
  providedIn: 'root'
})
export class TOSItemEquipmentWeaponRepositoryV2 extends TOSItemRepositoryV2<ITOSItemEquipmentWeaponV2> {

  constructor(
    http: HttpClient,
    search: SearchService,
  ) {
    super(http, search);
  }

  protected $factory(json: ITOSEntityV2) {
    return new TOSItemEquipmentWeaponV2(json);
  }

}
