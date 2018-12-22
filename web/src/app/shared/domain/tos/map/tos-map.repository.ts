import {TOSMap} from "./tos-map.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSDataSet} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSMapRepository extends CRUDRepository<TOSMap> {

  constructor() {
    super(TOSDataSet.MAPS, value => new TOSMap(value), [
      { key: TOSDomainService.MAPS_BY_ID },
    ]);

    TOSDomainService.$repository[TOSDomainService.MAPS] = this;
  }

}
