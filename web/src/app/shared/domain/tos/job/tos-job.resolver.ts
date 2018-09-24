import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSJobService} from "./tos-job.service";
import {TOSJob} from "./tos-job.model";

@Injectable()
export class TOSJobResolver extends CRUDResolver<TOSJob> {

  constructor(service: TOSJobService) {
    super(service);
  }

}
