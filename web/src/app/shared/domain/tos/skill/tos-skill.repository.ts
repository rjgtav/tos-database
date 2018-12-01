import {TOSSkill} from "./tos-skill.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {Observable} from "rxjs";
import {TOSDomainService} from "../tos-domain.service";
import {TOSDataSet} from "../tos-domain";
import {TOSRegion} from "../../tos-region";
import {ArrayUtils} from "../../../utils/array-utils";

export class TOSSkillRepository extends CRUDRepository<TOSSkill> {

  static readonly instance: TOSSkillRepository = new TOSSkillRepository();

  private constructor() {
    super(TOSDataSet.SKILLS);

    TOSDomainService.$loader[TOSDomainService.SKILLS] = () => this.Skills;
    TOSDomainService.$loader[TOSDomainService.SKILLS_BY_ID] = () => this.SkillsById;
    TOSDomainService.$loader[TOSDomainService.SKILLS_BY_ID_NAME] = () => this.SkillsByIdName;
    TOSDomainService.$loader[TOSDomainService.SKILLS_BY_JOB] = () => this.SkillsByJob;
  }

  get Skills() { return this.$data.map(value => new TOSSkill(value)); }
  get SkillsById() { return ArrayUtils.reduce(TOSDomainService.skills, '$ID'); }
  get SkillsByIdName() { return ArrayUtils.reduce(TOSDomainService.skills, '$ID_NAME'); }
  get SkillsByJob() { return ArrayUtils.reduce(TOSDomainService.skills, 'Link_Job.$ID', true); }

  load(force: boolean, region: TOSRegion): Observable<boolean> {

    if (force) {
      TOSDomainService.clear(TOSDomainService.SKILLS);
      TOSDomainService.clear(TOSDomainService.SKILLS_BY_ID);
      TOSDomainService.clear(TOSDomainService.SKILLS_BY_ID_NAME);
      TOSDomainService.clear(TOSDomainService.SKILLS_BY_JOB);
    }

    return super.load(force, region);
  }

}
