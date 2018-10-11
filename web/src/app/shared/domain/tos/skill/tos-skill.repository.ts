import { Injectable } from '@angular/core';
import {TOSSkill} from "./tos-skill.model";
import {CRUDRepository} from "../../../service/CRUD.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSSkillRepository extends CRUDRepository<TOSSkill> {

  private readonly skillsByJob: {[key: number]: TOSSkill[]} = {};

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/skills.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSSkill) => this.step(row)
    });

    this.findByJob = this.findByJob.bind(this);
  }

  findByJob(job$ID: number): TOSSkill[] { return this.skillsByJob[job$ID]; }

  private step(row: TOSSkill): TOSSkill {
    let entity = new TOSSkill(row);
    let groupByJob = +row.Link_Job;

    if (groupByJob) {
      let skills = this.skillsByJob[groupByJob] = this.skillsByJob[groupByJob] || [];
          skills.push(entity);
    }

    return entity;
  }

}
