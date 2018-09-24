import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PapaParseService} from "ngx-papaparse";
import {CRUDService} from "../../../../service/CRUD.service";
import {TOSCard} from "./tos-card.model";

@Injectable({
  providedIn: 'root'
})
export class TOSCardService extends CRUDService<TOSCard> {

  constructor(http: HttpClient, papa: PapaParseService) {
    super(http, papa, {
      id: '$ID',
      path: 'assets/data/cards.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      step: (row: TOSCard) => new TOSCard(row)
    });
  }

}
