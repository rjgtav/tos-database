import {Injectable} from "@angular/core";
import {TOSMap} from "./tos-map.model";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSDataSet} from "../tos-domain";

@Injectable()
export class TOSMapResolver extends CRUDResolver<TOSMap> {

  constructor() { super(TOSDataSet.MAPS); }

}
