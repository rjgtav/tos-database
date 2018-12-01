import {TOSCube} from "./tos-cube.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";
import {ArrayUtils} from "../../../../utils/array-utils";
import {TOSDomainService} from "../../tos-domain.service";
import {Observable} from "rxjs";
import {TOSRegion} from "../../../tos-region";

export class TOSCubeRepository extends CRUDRepository<TOSCube> {

  static readonly instance: TOSCubeRepository = new TOSCubeRepository();

  private constructor() {
    super(TOSDataSet.CUBES);

    TOSDomainService.$loader[TOSDomainService.CUBES] = () => this.Cubes;
    TOSDomainService.$loader[TOSDomainService.CUBES_BY_ID] = () => this.CubesById;
  }

  get Cubes() { return this.$data.map(value => new TOSCube(value)) }
  get CubesById() { return ArrayUtils.reduce(TOSDomainService.cubes, '$ID') }

  load(force: boolean, region: TOSRegion): Observable<boolean> {
    if (force) {
      TOSDomainService.clear(TOSDomainService.CUBES);
      TOSDomainService.clear(TOSDomainService.CUBES_BY_ID);
    }

    return super.load(force, region);
  }

}
