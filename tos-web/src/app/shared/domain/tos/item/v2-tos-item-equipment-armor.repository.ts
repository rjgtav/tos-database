import {Injectable} from "@angular/core";
import {ITOSEntityV2, ITOSItemEquipmentArmorV2} from "../tos-domain";
import {HttpClient} from "@angular/common/http";
import {SearchService} from "../../../service/search.service";
import {TOSItemRepositoryV2} from "./v2-tos-item.repository";
import {TOSItemEquipmentArmorV2} from "./v2-tos-item-equipment-armor.model";

@Injectable({
  providedIn: 'root'
})
export class TOSItemEquipmentArmorRepositoryV2 extends TOSItemRepositoryV2<ITOSItemEquipmentArmorV2> {

  constructor(
    http: HttpClient,
    search: SearchService,
  ) {
    super(http, search);
  }

  protected $factory(json: ITOSEntityV2) {
    return new TOSItemEquipmentArmorV2(json);
  }

}
