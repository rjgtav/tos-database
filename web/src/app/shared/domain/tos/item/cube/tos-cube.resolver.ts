import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSCube} from "./tos-cube.model";
import {TOSDataSet} from "../../tos-domain";

@Injectable()
export class TOSCubeResolver extends CRUDResolver<TOSCube> {

  constructor() { super(TOSDataSet.CUBES); }

}
