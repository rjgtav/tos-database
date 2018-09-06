import {Injectable} from "@angular/core";
import {TOSMonster} from "./tos-monster.model";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSMonsterService} from "./tos-monster.service";

@Injectable()
export class TOSMonsterResolver extends CRUDResolver<TOSMonster> {

  constructor(service: TOSMonsterService) {
    super(service);
  }

}
