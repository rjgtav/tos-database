import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSSkillService} from "./tos-skill.service";
import {TOSSkill} from "./tos-skill.model";

@Injectable()
export class TOSSkillResolver extends CRUDResolver<TOSSkill> {

  constructor(service: TOSSkillService) {
    super(service);
  }

}
