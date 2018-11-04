import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSSkill} from "./tos-skill.model";
import {TOSDataSet} from "../tos-domain";

@Injectable()
export class TOSSkillResolver extends CRUDResolver<TOSSkill> {

  constructor() { super(TOSDataSet.SKILLS); }

}
