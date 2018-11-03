import { Injectable } from '@angular/core';
import {TOSJob, TOSJobTree} from "./tos-job.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TOSJobRepository extends CRUDRepository<TOSJob> {

  private jobsByIdName: {[key: string]: TOSJob};
  private jobsByTree: {[key: string]: TOSJob[]};

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/jobs.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSJob) => this.step(row)
    });

    this.findByIdName = this.findByIdName.bind(this);
    this.findByTree = this.findByTree.bind(this);
  }

  findByIdName($ID_NAME: string): TOSJob { return this.jobsByIdName[$ID_NAME]; }
  findByTree(tree: TOSJobTree): TOSJob[] { return this.jobsByTree[tree]; }

  load(force: boolean = false): Observable<TOSJob[]> {
    this.jobsByIdName = force ? {} : this.jobsByIdName || {};
    this.jobsByTree = force ? {} : this.jobsByTree || {};

    return super.load(force);
  }

  private step(row: TOSJob): TOSJob {
    let entity = new TOSJob(row);
    let groupByIdName = entity.$ID_NAME;
    let groupByTree = entity.JobTree;

    this.jobsByIdName[groupByIdName] = entity;

    let jobs = this.jobsByTree[groupByTree] = this.jobsByTree[groupByTree] || [];
        jobs.push(entity);

    return entity;
  }

}
