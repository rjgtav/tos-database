import {TOSItem} from "./tos-item.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSDataSet} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSItemRepository extends CRUDRepository<TOSItem> {

  constructor() {
    super(TOSDataSet.ITEMS, value => new TOSItem(TOSDataSet.ITEMS, value), [
      { key: TOSDomainService.ITEMS_BY_ID },
    ]);

    TOSDomainService.$repository[TOSDomainService.ITEMS] = this;
  }

}
