import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSCollection} from "./tos-collection.model";
import {TOSDataSet} from "../../tos-domain";

@Injectable()
export class TOSCollectionResolver extends CRUDResolver<TOSCollection> {

  constructor() { super(TOSDataSet.COLLECTIONS); }

}
