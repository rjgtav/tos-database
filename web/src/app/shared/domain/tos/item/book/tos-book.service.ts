import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {CRUDService} from "../../../../service/CRUD.service";
import {TOSBook} from "./tos-book.model";

@Injectable({
  providedIn: 'root'
})
export class TOSBookService extends CRUDService<TOSBook> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, {
      id: '$ID',
      path: 'assets/data/books.csv',
      searchKeys: ['$ID', '$ID_NAME', 'Name'],
      step: (row: TOSBook) => new TOSBook(row)
    });
  }

}
