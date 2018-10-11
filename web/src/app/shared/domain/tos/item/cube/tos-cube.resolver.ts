import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSCubeRepository} from "./tos-cube.repository";
import {TOSCube} from "./tos-cube.model";
import {TOSRepositoryService} from "../../tos-repository.service";

@Injectable()
export class TOSCubeResolver extends CRUDResolver<TOSCube> {

  constructor() {
    super(
      TOSRepositoryService.findCubes,
      TOSRepositoryService.findCubesById,
      TOSRepositoryService.searchCubes,
    );
  }

}
