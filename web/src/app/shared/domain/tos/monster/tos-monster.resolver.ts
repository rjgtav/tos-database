import {Injectable} from "@angular/core";
import {TOSMonster} from "./tos-monster.model";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSRepositoryService} from "../tos-repository.service";

@Injectable()
export class TOSMonsterResolver extends CRUDResolver<TOSMonster> {

  constructor() {
    super(
      TOSRepositoryService.findMonsters,
      TOSRepositoryService.findMonstersById,
      TOSRepositoryService.searchMonsters,
    );
  }

}
