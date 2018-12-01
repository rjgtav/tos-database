import {TOSGem} from "./tos-gem.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {ArrayUtils} from "../../../../utils/array-utils";
import {TOSRegion} from "../../../tos-region";
import {Observable} from "rxjs";

export class TOSGemRepository extends CRUDRepository<TOSGem> {

  static readonly instance: TOSGemRepository = new TOSGemRepository();

  private constructor() {
    super(TOSDataSet.GEMS);

    TOSDomainService.$loader[TOSDomainService.GEMS] = () => this.Gems;
    TOSDomainService.$loader[TOSDomainService.GEMS_BY_ID] = () => this.GemsById;
  }

  get Gems() { return this.$data.map(value => new TOSGem(value)) }
  get GemsById() { return ArrayUtils.reduce(TOSDomainService.gems, '$ID') }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.GEMS);
      TOSDomainService.clear(TOSDomainService.GEMS_BY_ID);
    }

    return super.load(force, region);
  }

}
