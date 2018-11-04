import {TOSBook} from "./tos-book.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";

export class TOSBookRepository extends CRUDRepository<TOSBook> {

  static readonly instance: TOSBookRepository = new TOSBookRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.BOOKS,
      loadStep: (row: TOSBook) => new TOSBook(row)
    });
  }

}
