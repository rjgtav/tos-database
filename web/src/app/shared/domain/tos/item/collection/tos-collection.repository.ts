import {TOSCollection} from "./tos-collection.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSCollectionRepository extends CRUDRepository<TOSCollection> {

  constructor() {
    super(TOSDataSet.COLLECTIONS, value => new TOSCollection(value), [
      { key: TOSDomainService.COLLECTIONS_BY_ID },
    ]);

    TOSDomainService.$repository[TOSDomainService.COLLECTIONS] = this;
  }

}
