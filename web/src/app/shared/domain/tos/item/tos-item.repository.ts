import {TOSItem} from "./tos-item.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSDataSet} from "../tos-domain";

export class TOSItemRepository extends CRUDRepository<TOSItem> {

  static readonly instance: TOSItemRepository = new TOSItemRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.ITEMS,
      loadStep: (row: TOSItem) => new TOSItem(row, 'items')
    });
  }

}
