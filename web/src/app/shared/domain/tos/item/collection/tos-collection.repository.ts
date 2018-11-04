import {TOSCollection} from "./tos-collection.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";

export class TOSCollectionRepository extends CRUDRepository<TOSCollection> {

  static readonly instance: TOSCollectionRepository = new TOSCollectionRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.COLLECTIONS,
      loadStep: (row: TOSCollection) => new TOSCollection(row)
    });
  }

}
