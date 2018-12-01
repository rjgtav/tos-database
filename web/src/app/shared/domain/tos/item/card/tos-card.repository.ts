import {TOSCard} from "./tos-card.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {ArrayUtils} from "../../../../utils/array-utils";
import {TOSDomainService} from "../../tos-domain.service";
import {TOSRegion} from "../../../tos-region";
import {Observable} from "rxjs";

export class TOSCardRepository extends CRUDRepository<TOSCard> {

  static readonly instance: TOSCardRepository = new TOSCardRepository();

  private constructor() {
    super(TOSDataSet.CARDS);

    TOSDomainService.$loader[TOSDomainService.CARDS] = () => this.Cards;
    TOSDomainService.$loader[TOSDomainService.CARDS_BY_ID] = () => this.CardsById;

  }

  get Cards() { return this.$data.map(value => new TOSCard(value)) }
  get CardsById() { return ArrayUtils.reduce(TOSDomainService.cards, '$ID') }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.CARDS);
      TOSDomainService.clear(TOSDomainService.CARDS_BY_ID);
    }

    return super.load(force, region);
  }

}
