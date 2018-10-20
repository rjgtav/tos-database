import { Injectable } from '@angular/core';
import {TOSSkill} from "./tos-skill.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TOSSkillRepository extends CRUDRepository<TOSSkill> {

  private skillsByIdName: {[key: string]: TOSSkill};
  private skillsByJob: {[key: number]: TOSSkill[]};

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/skills.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadComplete: (data: TOSSkill[]) => data.filter(value => value.Link_Job),
      loadStep: (row: TOSSkill) => this.step(row)
    });

    this.findByJob = this.findByJob.bind(this);
    this.findByIdName = this.findByIdName.bind(this);
  }

  findByIdName($ID_NAME: string): TOSSkill { return this.skillsByIdName[$ID_NAME]; }
  findByJob(job$ID: number): TOSSkill[] { return this.skillsByJob[job$ID]; }

  load(): Observable<TOSSkill[]> {
    this.skillsByIdName = {};
    this.skillsByJob = {};

    return super.load();
  }

  private step(row: TOSSkill): TOSSkill {
    let entity = new TOSSkill(row);
    let groupByIdName = entity.$ID_NAME;
    let groupByJob = +row.Link_Job;

    this.skillsByIdName[groupByIdName] = entity;

    if (groupByJob) {
      let skills = this.skillsByJob[groupByJob] = this.skillsByJob[groupByJob] || [];
          skills.push(entity);
    }

    return entity;
  }

}
