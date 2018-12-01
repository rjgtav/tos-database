import {TOSJob} from "./tos-job.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {Observable} from "rxjs";
import {TOSDomainService} from "../tos-domain.service";
import {TOSDataSet} from "../tos-domain";
import {TOSRegion} from "../../tos-region";
import {ArrayUtils} from "../../../utils/array-utils";

export class TOSJobRepository extends CRUDRepository<TOSJob> {

  static readonly instance = new TOSJobRepository();

  private constructor() {
    super(TOSDataSet.JOBS);

    TOSDomainService.$loader[TOSDomainService.JOBS] = () => this.Jobs;
    TOSDomainService.$loader[TOSDomainService.JOBS_BY_ID] = () => this.JobsById;
    TOSDomainService.$loader[TOSDomainService.JOBS_BY_ID_NAME] = () => this.JobsByIdName;
    TOSDomainService.$loader[TOSDomainService.JOBS_BY_TREE] = () => this.JobsByTree;
  }

  get Jobs() { return this.$data.map(value => new TOSJob(value)); }
  get JobsById() { return ArrayUtils.reduce(this.Jobs, '$ID'); }
  get JobsByIdName() { return ArrayUtils.reduce(this.Jobs, '$ID_NAME'); }
  get JobsByTree() { return ArrayUtils.reduce(this.Jobs, 'JobTree', true); }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.JOBS);
      TOSDomainService.clear(TOSDomainService.JOBS_BY_ID);
      TOSDomainService.clear(TOSDomainService.JOBS_BY_ID_NAME);
      TOSDomainService.clear(TOSDomainService.JOBS_BY_TREE);
    }

    return super.load(force, region);
  }

}
