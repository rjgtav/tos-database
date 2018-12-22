import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSAttribute} from "./tos-attribute.model";
import {TOSDomainService} from "../tos-domain.service";
import {TOSDataSet} from "../tos-domain";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSAttributeRepository extends CRUDRepository<TOSAttribute> {

  constructor() {
    super(TOSDataSet.ATTRIBUTES, value => new TOSAttribute(value), [
      { key: TOSDomainService.ATTRIBUTES_BY_ID },
      { key: TOSDomainService.ATTRIBUTES_BY_ID_NAME },
      { key: TOSDomainService.ATTRIBUTES_BY_JOB, forceArray: true },
      { key: TOSDomainService.ATTRIBUTES_BY_SKILL, forceArray: true },
    ]);

    TOSDomainService.$repository[TOSDomainService.ATTRIBUTES] = this;
  }

}
