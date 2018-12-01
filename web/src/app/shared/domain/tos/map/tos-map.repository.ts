import {TOSMap} from "./tos-map.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSDataSet} from "../tos-domain";
import {ArrayUtils} from "../../../utils/array-utils";
import {TOSDomainService} from "../tos-domain.service";
import {Observable} from "rxjs";
import {TOSRegion} from "../../tos-region";

export class TOSMapRepository extends CRUDRepository<TOSMap> {

  static readonly instance: TOSMapRepository = new TOSMapRepository();

  private constructor() {
    super(TOSDataSet.MAPS);

    TOSDomainService.$loader[TOSDomainService.MAPS] = () => this.Maps;
    TOSDomainService.$loader[TOSDomainService.MAPS_BY_ID] = () => this.MapsById;
  }

  get Maps() { return this.$data.map(value => new TOSMap(value)) }
  get MapsById() { return ArrayUtils.reduce(TOSDomainService.maps, '$ID') }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.MAPS);
      TOSDomainService.clear(TOSDomainService.MAPS_BY_ID);
    }

    return super.load(force, region);
  }

}
