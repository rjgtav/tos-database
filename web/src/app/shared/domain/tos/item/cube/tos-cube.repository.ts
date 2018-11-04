import {TOSCube} from "./tos-cube.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";
import {TOSDataSet} from "../../tos-domain";

export class TOSCubeRepository extends CRUDRepository<TOSCube> {

  static readonly instance: TOSCubeRepository = new TOSCubeRepository();

  private constructor() {
    super({
      dataset: TOSDataSet.CUBES,
      loadStep: (row: TOSCube) => new TOSCube(row)
    });
  }

}
