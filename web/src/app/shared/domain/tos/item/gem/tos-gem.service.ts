import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {CRUDService} from "../../../../service/CRUD.service";
import {TOSGem} from "./tos-gem.model";

@Injectable({
  providedIn: 'root'
})
export class TOSGemService extends CRUDService<TOSGem> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, {
      id: '$ID',
      path: 'assets/data/gems.csv',
      searchKeys: ['$ID', '$ID_NAME', 'Name'],
      step: (row: TOSGem) => new TOSGem(row)
    });
  }

}
