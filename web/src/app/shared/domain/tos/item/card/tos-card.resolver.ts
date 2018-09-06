import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSCardService} from "./tos-card.service";
import {TOSCard} from "./tos-card.model";

@Injectable()
export class TOSCardResolver extends CRUDResolver<TOSCard> {

  constructor(service: TOSCardService) {
    super(service);
  }

}
