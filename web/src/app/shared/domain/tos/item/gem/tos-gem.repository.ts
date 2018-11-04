import {TOSGem} from "./tos-gem.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";

export class TOSGemRepository extends CRUDRepository<TOSGem> {

  static readonly instance: TOSGemRepository = new TOSGemRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.GEMS,
      loadStep: (row: TOSGem) => new TOSGem(row)
    });
  }

}
