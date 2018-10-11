import { Injectable } from '@angular/core';
import {TOSJob, TOSJobTree} from "./tos-job.model";
import {CRUDRepository} from "../../../service/CRUD.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSJobRepository extends CRUDRepository<TOSJob> {

  private jobsByClassName: {[key: string]: TOSJob} = {};
  private jobsByTree: {[key: string]: TOSJob[]} = {};

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

  findByIdName($ID_NAME: string) { return this.jobsByClassName[$ID_NAME]; }
  findByTree(tree: TOSJobTree) { return this.jobsByTree[tree]; }

  private step(row: TOSJob): TOSJob {
    let entity = new TOSJob(row);
    let groupByIdName = entity.$ID_NAME;
    let groupByTree = entity.JobTree;

    this.jobsByClassName[groupByIdName] = entity;

    let jobs = this.jobsByTree[groupByTree] = this.jobsByTree[groupByTree] || [];
        jobs.push(entity);

    return entity;
  }

}
