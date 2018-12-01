import {TOSCollection} from "./tos-collection.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {ArrayUtils} from "../../../../utils/array-utils";
import {TOSRegion} from "../../../tos-region";
import {Observable} from "rxjs";

export class TOSCollectionRepository extends CRUDRepository<TOSCollection> {

  static readonly instance: TOSCollectionRepository = new TOSCollectionRepository();

  private constructor() {
    super(TOSDataSet.COLLECTIONS);

    TOSDomainService.$loader[TOSDomainService.COLLECTIONS] = () => this.Collections;
    TOSDomainService.$loader[TOSDomainService.COLLECTIONS_BY_ID] = () => this.CollectionsById;
  }

  get Collections() { return this.$data.map(value => new TOSCollection(value)) }
  get CollectionsById() { return ArrayUtils.reduce(TOSDomainService.collections, '$ID') }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.COLLECTIONS);
      TOSDomainService.clear(TOSDomainService.COLLECTIONS_BY_ID);
    }

    return super.load(force, region);
  }

}
