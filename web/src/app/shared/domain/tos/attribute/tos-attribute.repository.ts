import { Injectable } from '@angular/core';
import {TOSAttribute} from "./tos-attribute.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TOSAttributeRepository extends CRUDRepository<TOSAttribute> {

  private attributesByIdName: {[key: string]: TOSAttribute};
  private attributesByJob: {[key: number]: TOSAttribute[]};
  private attributesBySkill: {[key: number]: TOSAttribute[]};

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/attributes.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSAttribute) => this.step(row)
    });

    this.findByIdName = this.findByIdName.bind(this);
    this.findByJob = this.findByJob.bind(this);
    this.findBySkill = this.findBySkill.bind(this);
  }

  findByIdName($ID_NAME: string): TOSAttribute { return this.attributesByIdName[$ID_NAME]; }
  findByJob(job$ID: number): TOSAttribute[] { return this.attributesByJob[job$ID]; }
  findBySkill(skill$ID: number): TOSAttribute[] { return this.attributesBySkill[skill$ID]; }

  load(force: boolean = false): Observable<TOSAttribute[]> {
    this.attributesByIdName = force ? {} : this.attributesByIdName || {};
    this.attributesByJob = force ? {} : this.attributesByJob || {};
    this.attributesBySkill = force ? {} : this.attributesBySkill || {};

    return super.load(force);
  }

  private step(row: TOSAttribute): TOSAttribute {
    let entity = new TOSAttribute(row);
    let groupByIdName = entity.$ID_NAME;
    let groupBySkill = +row.Link_Skill;
    let groupByJobs = JSON.parse((row.Link_Jobs || []) + '');

    this.attributesByIdName[groupByIdName] = entity;

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
