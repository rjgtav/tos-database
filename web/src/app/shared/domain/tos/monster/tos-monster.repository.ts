import {TOSMonster} from "./tos-monster.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSDataSet} from "../tos-domain";
import {ArrayUtils} from "../../../utils/array-utils";
import {TOSDomainService} from "../tos-domain.service";
import {Observable} from "rxjs";
import {TOSRegion} from "../../tos-region";

export class TOSMonsterRepository extends CRUDRepository<TOSMonster> {

  static readonly instance: TOSMonsterRepository = new TOSMonsterRepository();

  private constructor() {
    super(TOSDataSet.MONSTERS);

    TOSDomainService.$loader[TOSDomainService.MONSTERS] = () => this.Monsters;
    TOSDomainService.$loader[TOSDomainService.MONSTERS_BY_ID] = () => this.MonstersById;
  }

  get Monsters() { return this.$data.map(value => new TOSMonster(value)) }
  get MonstersById() { return ArrayUtils.reduce(TOSDomainService.monsters, '$ID') }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.MONSTERS);
      TOSDomainService.clear(TOSDomainService.MONSTERS_BY_ID);
    }

    return super.load(force, region);
  }

}
