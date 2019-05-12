import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSCard} from "./tos-card.model";
import {TOSDataSet} from "../../tos-domain";

@Injectable()
export class TOSCardResolver extends CRUDResolver<TOSCard> {

  constructor() { super(TOSDataSet.CARDS); }

}
