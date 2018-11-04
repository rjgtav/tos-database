import {TOSJob} from "./tos-job.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {Observable} from "rxjs";
import {TOSDomainService} from "../tos-domain.service";
import {TOSDataSet} from "../tos-domain";
import {TOSRegion} from "../../tos-region";

export class TOSJobRepository extends CRUDRepository<TOSJob> {

  static readonly instance = new TOSJobRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.JOBS,
      loadStep: (row: TOSJob) => this.step(row)
    });
  }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    TOSDomainService.jobsByIdName = force ? {} : TOSDomainService.jobsByIdName || {};
    TOSDomainService.jobsByTree = force ? {} : TOSDomainService.jobsByTree || {};

    return super.load(force, region);
  }

  private step(row: TOSJob): TOSJob {
    let entity = new TOSJob(row);
    let groupByIdName = entity.$ID_NAME;
    let groupByTree = entity.JobTree;

    TOSDomainService.jobsByIdName[groupByIdName] = entity;

    let jobs = TOSDomainService.jobsByTree[groupByTree] = TOSDomainService.jobsByTree[groupByTree] || [];
        jobs.push(entity);

    return entity;
  }

}
