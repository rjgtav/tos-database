import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSSkill} from "./tos-skill.model";
import {TOSRepositoryService} from "../tos-repository.service";

@Injectable()
export class TOSSkillResolver extends CRUDResolver<TOSSkill> {

  constructor() {
    super(
      TOSRepositoryService.findSkills,
      TOSRepositoryService.findSkillsById,
    );
  }

}
