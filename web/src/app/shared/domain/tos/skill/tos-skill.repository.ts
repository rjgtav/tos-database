import {TOSSkill} from "./tos-skill.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {Observable} from "rxjs";
import {TOSDomainService} from "../tos-domain.service";
import {TOSDataSet} from "../tos-domain";
import {TOSRegion} from "../../tos-region";

export class TOSSkillRepository extends CRUDRepository<TOSSkill> {

  static readonly instance: TOSSkillRepository = new TOSSkillRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.SKILLS,
      loadComplete: (data: TOSSkill[]) => data.filter(value => value.Link_Job),
      loadStep: (row: TOSSkill) => this.step(row)
    });
  }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    TOSDomainService.skillsByIdName = force ? {} : TOSDomainService.skillsByIdName || {};
    TOSDomainService.skillsByJob = force ? {} : TOSDomainService.skillsByJob || {};

    return super.load(force, region);
  }

  private step(row: TOSSkill): TOSSkill {
    let entity = new TOSSkill(row);
    let groupByIdName = entity.$ID_NAME;
    let groupByJob = +row.Link_Job;

    TOSDomainService.skillsByIdName[groupByIdName] = entity;

    if (groupByJob) {
      let skills = TOSDomainService.skillsByJob[groupByJob] = TOSDomainService.skillsByJob[groupByJob] || [];
          skills.push(entity);
    }

    return entity;
  }

}
