import {TOSMap} from "./tos-map.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSDataSet} from "../tos-domain";

export class TOSMapRepository extends CRUDRepository<TOSMap> {

  static readonly instance: TOSMapRepository = new TOSMapRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.MAPS,
      loadStep: (row: TOSMap) => new TOSMap(row)
    });
  }

}
