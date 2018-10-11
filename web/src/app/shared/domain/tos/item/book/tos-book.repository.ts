import {TOSBook} from "./tos-book.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";

export class TOSBookRepository extends CRUDRepository<TOSBook> {

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/books.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSBook) => new TOSBook(row)
    });
  }

}
