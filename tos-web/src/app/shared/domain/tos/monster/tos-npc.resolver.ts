import {TOSDataSet} from "../tos-domain";
import {Injectable} from "@angular/core";
import {TOSNPC} from "./tos-npc.model";
import {CRUDResolver} from "../../../service/CRUD.resolver";

@Injectable()
export class TOSNPCResolver extends CRUDResolver<TOSNPC> {

  constructor() { super(TOSDataSet.NPCS); }

}
