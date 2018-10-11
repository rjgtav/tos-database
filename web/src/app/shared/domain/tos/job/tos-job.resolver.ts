import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSJob} from "./tos-job.model";
import {TOSRepositoryService} from "../tos-repository.service";

@Injectable()
export class TOSJobResolver extends CRUDResolver<TOSJob> {

  constructor() {
    super(
      TOSRepositoryService.findJobs,
      TOSRepositoryService.findJobsById,
      TOSRepositoryService.searchJobs,
    );
  }

}
