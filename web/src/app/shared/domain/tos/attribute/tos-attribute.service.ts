import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {CRUDService} from "../../../service/CRUD.service";
import {TOSAttribute} from "./tos-attribute.model";

@Injectable({
  providedIn: 'root'
})
export class TOSAttributeService extends CRUDService<TOSAttribute> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, {
      id: '$ID',
      path: 'assets/data/attributes.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      step: (row: TOSAttribute) => new TOSAttribute(row)
    });
  }

}
