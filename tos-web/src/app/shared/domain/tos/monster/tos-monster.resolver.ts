import {Injectable} from "@angular/core";
import {TOSMonster} from "./tos-monster.model";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSDataSet} from "../tos-domain";

@Injectable()
export class TOSMonsterResolver extends CRUDResolver<TOSMonster> {

  constructor() { super(TOSDataSet.MONSTERS); }

}
