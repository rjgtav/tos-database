import {TOSBook} from "./tos-book.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSBookRepository extends CRUDRepository<TOSBook> {

  constructor() {
    super(TOSDataSet.BOOKS, value => new TOSBook(value), [
      { key: TOSDomainService.BOOKS_BY_ID },
    ]);

    TOSDomainService.$repository[TOSDomainService.BOOKS] = this;
  }

}
