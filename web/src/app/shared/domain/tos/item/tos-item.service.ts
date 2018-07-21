import { Injectable } from '@angular/core';
import {TOSItem} from "./tos-item.model";
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {CRUDService} from "../../../service/CRUDService";

@Injectable({
  providedIn: 'root'
})
export class TOSItemService extends CRUDService<TOSItem> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, 'assets/data/items.csv');
  }
}
