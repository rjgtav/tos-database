import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSJob} from "./tos-job.model";
import {TOSDataSet} from "../tos-domain";

@Injectable()
export class TOSJobResolver extends CRUDResolver<TOSJob> {

  constructor() { super(TOSDataSet.JOBS); }

}
