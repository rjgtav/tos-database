import {TOSGem} from "./tos-gem.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSGemRepository extends CRUDRepository<TOSGem> {

  constructor() {
    super(TOSDataSet.GEMS, value => new TOSGem(value), [
      { key: TOSDomainService.GEMS_BY_ID },
    ]);

    TOSDomainService.$repository[TOSDomainService.GEMS] = this;
  }

}
