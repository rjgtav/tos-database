import { Injectable } from '@angular/core';
import {TOSAttribute} from "./tos-attribute.model";
import {CRUDRepository} from "../../../service/CRUD.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSAttributeRepository extends CRUDRepository<TOSAttribute> {

  private readonly attributesByJob: {[key: number]: TOSAttribute[]} = {};
  private readonly attributesBySkill: {[key: number]: TOSAttribute[]} = {};

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/attributes.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSAttribute) => this.step(row)
    });

    this.findByJob = this.findByJob.bind(this);
    this.findBySkill = this.findBySkill.bind(this);
  }

  findByJob(job$ID: number): TOSAttribute[] { return this.attributesByJob[job$ID]; }
  findBySkill(skill$ID: number): TOSAttribute[] { return this.attributesBySkill[skill$ID]; }

  private step(row: TOSAttribute): TOSAttribute {
    let entity = new TOSAttribute(row);
    let groupBySkill = +row.Link_Skill;
    let groupByJobs = JSON.parse((row.Link_Jobs || []) + '');

    if (groupBySkill) {
      // Skill attribute
      let skills = this.attributesBySkill[groupBySkill] = this.attributesBySkill[groupBySkill] || [];
          skills.push(entity);
    } else if (groupByJobs) {
      // Job attribute
      groupByJobs.forEach(job => {
        let attributes = this.attributesByJob[job] = this.attributesByJob[job] || [];
            attributes.push(entity);
      });
    }

    return entity;
  }

}
