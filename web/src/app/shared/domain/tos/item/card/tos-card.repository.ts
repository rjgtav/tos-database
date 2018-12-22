import {TOSCard} from "./tos-card.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSCardRepository extends CRUDRepository<TOSCard> {

  constructor() {
    super(TOSDataSet.CARDS, value => new TOSCard(value), [
      { key: TOSDomainService.CARDS_BY_ID },
    ]);

    TOSDomainService.$repository[TOSDomainService.CARDS] = this;
  }

}
