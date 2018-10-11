import { Injectable } from '@angular/core';
import {TOSCard} from "./tos-card.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSCardRepository extends CRUDRepository<TOSCard> {

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/cards.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSCard) => new TOSCard(row)
    });
  }

}
