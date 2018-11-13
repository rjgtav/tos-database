import {CRUDRepository} from "../../../service/CRUD.repository";
import {Observable} from "rxjs";
import {TOSAttribute} from "./tos-attribute.model";
import {TOSDomainService} from "../tos-domain.service";
import {TOSDataSet} from "../tos-domain";
import {TOSRegion} from "../../tos-region";

export class TOSAttributeRepository extends CRUDRepository<TOSAttribute> {

  static readonly instance = new TOSAttributeRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.ATTRIBUTES,
      loadStep: (row: TOSAttribute) => this.step(row)
    });
  }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    TOSDomainService.attributesByIdName = force ? {} : TOSDomainService.attributesByIdName || {};
    TOSDomainService.attributesByJob = force ? {} : TOSDomainService.attributesByJob || {};
    TOSDomainService.attributesBySkill = force ? {} : TOSDomainService.attributesBySkill || {};

    return super.load(force, region);
  }

  private step(row: TOSAttribute): TOSAttribute {
    let entity = new TOSAttribute(row);
    let groupByIdName = entity.$ID_NAME;
    let groupBySkill = +row.Link_Skill;
    let groupByJobs = row.Link_Jobs
      ? JSON.parse((row.Link_Jobs || []) + '')
      : null;

    TOSDomainService.attributesByIdName[groupByIdName] = entity;

    if (groupBySkill) {
      // Skill attribute
      let skills = TOSDomainService.attributesBySkill[groupBySkill] = TOSDomainService.attributesBySkill[groupBySkill] || [];
          skills.push(entity);
    } else if (groupByJobs) {
      // Job attribute
      groupByJobs.forEach(job => {
        let attributes = TOSDomainService.attributesByJob[job] = TOSDomainService.attributesByJob[job] || [];
            attributes.push(entity);
      });
    }

    return entity;
  }

}
