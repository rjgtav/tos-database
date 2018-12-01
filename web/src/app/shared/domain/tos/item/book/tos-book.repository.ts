import {TOSBook} from "./tos-book.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {ArrayUtils} from "../../../../utils/array-utils";
import {TOSRegion} from "../../../tos-region";
import {Observable} from "rxjs";

export class TOSBookRepository extends CRUDRepository<TOSBook> {

  static readonly instance: TOSBookRepository = new TOSBookRepository();

  private constructor() {
    super(TOSDataSet.BOOKS);

    TOSDomainService.$loader[TOSDomainService.BOOKS] = () => this.Books;
    TOSDomainService.$loader[TOSDomainService.BOOKS_BY_ID] = () => this.BooksById;
  }

  get Books() { return this.$data.map(value => new TOSBook(value)) }
  get BooksById() { return ArrayUtils.reduce(TOSDomainService.books, '$ID') }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.BOOKS);
      TOSDomainService.clear(TOSDomainService.BOOKS_BY_ID);
    }

    return super.load(force, region);
  }

}
