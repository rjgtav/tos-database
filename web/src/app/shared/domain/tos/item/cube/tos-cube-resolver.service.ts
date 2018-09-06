import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSCubeService} from "./tos-cube.service";
import {TOSCube} from "./tos-cube.model";

@Injectable()
export class TOSCubeResolver extends CRUDResolver<TOSCube> {

  constructor(service: TOSCubeService) {
    super(service);
  }

}
