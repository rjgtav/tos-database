import {TOSMonster} from "./tos-monster.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSDataSet} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TOSMonsterRepository extends CRUDRepository<TOSMonster> {

  constructor() {
    super(TOSDataSet.MONSTERS, value => new TOSMonster(value), [
      { key: TOSDomainService.MONSTERS_BY_ID },
    ]);

    TOSDomainService.$repository[TOSDomainService.MONSTERS] = this;
  }

}
