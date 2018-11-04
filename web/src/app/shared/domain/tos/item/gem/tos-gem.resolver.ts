import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSGem} from "./tos-gem.model";
import {TOSDataSet} from "../../tos-domain";

@Injectable()
export class TOSGemResolver extends CRUDResolver<TOSGem> {

  constructor() { super(TOSDataSet.GEMS); }

}
