import {Injectable} from "@angular/core";
import {ITOSEntityV2, ITOSItemEquipmentV2} from "../tos-domain";
import {HttpClient} from "@angular/common/http";
import {SearchService} from "../../../service/search.service";
import {TOSItemEquipmentV2} from "./v2-tos-item-equipment.model";
import {TOSItemRepositoryV2} from "./v2-tos-item.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSItemEquipmentRepositoryV2 extends TOSItemRepositoryV2<ITOSItemEquipmentV2> {

  constructor(
    http: HttpClient,
    search: SearchService,
  ) {
    super(http, search);
  }

  protected $factory(json: ITOSEntityV2) {
    return new TOSItemEquipmentV2(json);
  }

}
