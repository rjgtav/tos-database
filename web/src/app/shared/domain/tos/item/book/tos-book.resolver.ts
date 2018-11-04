import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSBook} from "./tos-book.model";
import {TOSDataSet} from "../../tos-domain";

@Injectable()
export class TOSBookResolver extends CRUDResolver<TOSBook> {

  constructor() { super(TOSDataSet.BOOKS); }

}
