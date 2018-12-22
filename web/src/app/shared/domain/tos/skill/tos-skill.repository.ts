import {TOSSkill} from "./tos-skill.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSDomainService} from "../tos-domain.service";
import {TOSDataSet} from "../tos-domain";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSSkillRepository extends CRUDRepository<TOSSkill> {

  constructor() {
    super(TOSDataSet.SKILLS, value => new TOSSkill(value), [
      { key: TOSDomainService.SKILLS_BY_ID },
      { key: TOSDomainService.SKILLS_BY_ID_NAME },
      { key: TOSDomainService.SKILLS_BY_JOB, forceArray: true },
    ]);

    TOSDomainService.$repository[TOSDomainService.SKILLS] = this;
  }

}
