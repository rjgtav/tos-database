import {TOSItem} from "./tos-item.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSDataSet} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";
import {ArrayUtils} from "../../../utils/array-utils";
import {TOSRegion} from "../../tos-region";
import {Observable} from "rxjs";

export class TOSItemRepository extends CRUDRepository<TOSItem> {

  static readonly instance: TOSItemRepository = new TOSItemRepository();

  private constructor() {
    super(TOSDataSet.ITEMS);

    TOSDomainService.$loader[TOSDomainService.ITEMS] = () => this.Items;
    TOSDomainService.$loader[TOSDomainService.ITEMS_BY_ID] = () => this.ItemsById;
  }

  get Items() { return this.$data.map(value => new TOSItem(TOSDataSet.ITEMS, value)) }
  get ItemsById() { return ArrayUtils.reduce(TOSDomainService.items, '$ID') }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.ITEMS);
      TOSDomainService.clear(TOSDomainService.ITEMS_BY_ID);
    }

    return super.load(force, region);
  }

}
