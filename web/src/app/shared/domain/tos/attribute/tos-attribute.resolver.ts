import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSAttribute} from "./tos-attribute.model";
import {TOSDataSet} from "../tos-domain";

@Injectable()
export class TOSAttributeResolver extends CRUDResolver<TOSAttribute> {

  constructor() { super(TOSDataSet.ATTRIBUTES); }

}
