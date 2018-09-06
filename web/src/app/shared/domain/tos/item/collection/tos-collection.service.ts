import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {CRUDService} from "../../../../service/CRUD.service";
import {TOSCollection} from "./tos-collection.model";

@Injectable({
  providedIn: 'root'
})
export class TOSCollectionService extends CRUDService<TOSCollection> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, {
      id: '$ID',
      path: 'assets/data/collections.csv',
      searchKeys: ['$ID', '$ID_NAME', 'Name'],
      step: (row: TOSCollection) => new TOSCollection(row)
    });
  }

}
