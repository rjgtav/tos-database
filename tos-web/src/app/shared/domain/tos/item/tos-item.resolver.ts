import {Injectable} from "@angular/core";
import {TOSItem} from "./tos-item.model";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSDataSet} from "../tos-domain";

@Injectable()
export class TOSItemResolver extends CRUDResolver<TOSItem> {

  constructor() { super(TOSDataSet.ITEMS); }

}
