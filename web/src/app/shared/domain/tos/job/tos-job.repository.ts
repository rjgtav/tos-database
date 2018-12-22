import {TOSJob} from "./tos-job.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSDomainService} from "../tos-domain.service";
import {TOSDataSet} from "../tos-domain";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSJobRepository extends CRUDRepository<TOSJob> {

  constructor() {
    super(TOSDataSet.JOBS, (value) => new TOSJob(value), [
      { key: TOSDomainService.JOBS_BY_ID },
      { key: TOSDomainService.JOBS_BY_ID_NAME },
      { key: TOSDomainService.JOBS_BY_TREE, forceArray: true },
      { key: TOSDomainService.JOBS_BY_STARTER, forceArray: true, forceBoolean: true },
    ]);

    TOSDomainService.$repository[TOSDomainService.JOBS] = this;
  }

}
