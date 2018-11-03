import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSCard} from "./tos-card.model";
import {TOSRepositoryService} from "../../tos-repository.service";

@Injectable()
export class TOSCardResolver extends CRUDResolver<TOSCard> {

  constructor() {
    super(
      TOSRepositoryService.findCards,
      TOSRepositoryService.findCardsById,
    );
  }

}
