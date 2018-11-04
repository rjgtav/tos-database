import {TOSMonster} from "./tos-monster.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSDataSet} from "../tos-domain";

export class TOSMonsterRepository extends CRUDRepository<TOSMonster> {

  static readonly instance: TOSMonsterRepository = new TOSMonsterRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.MONSTERS,
      loadStep: (row: TOSMonster) => new TOSMonster(row)
    });
  }

}
