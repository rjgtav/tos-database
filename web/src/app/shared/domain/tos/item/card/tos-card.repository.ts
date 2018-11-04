import {TOSCard} from "./tos-card.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";

export class TOSCardRepository extends CRUDRepository<TOSCard> {

  static readonly instance: TOSCardRepository = new TOSCardRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.CARDS,
      loadStep: (row: TOSCard) => new TOSCard(row)
    });
  }

}
