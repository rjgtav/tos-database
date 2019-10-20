import {Injectable} from '@angular/core';
import {V2TOSEntityRepository} from "../v2-tos-entity.repository";
import {ITOSItemV2} from "../tos-domain";
import {HttpClient} from "@angular/common/http";
import {SearchService} from "../../../service/search.service";
import {V2TOSDataSet} from "../../tos-dataset";

@Injectable({
  providedIn: 'root'
})
export abstract class TOSItemRepositoryV2<ENTITY extends ITOSItemV2> extends V2TOSEntityRepository<ENTITY> {

  protected constructor(
    http: HttpClient,
    search: SearchService,
  ) {
    super(V2TOSDataSet.ITEMS, http, search)
  }

}
