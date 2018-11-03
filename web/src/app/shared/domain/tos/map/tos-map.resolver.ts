import {Injectable} from "@angular/core";
import {TOSMap} from "./tos-map.model";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSRepositoryService} from "../tos-repository.service";

@Injectable()
export class TOSMapResolver extends CRUDResolver<TOSMap> {

  constructor() {
    super(
      TOSRepositoryService.findMaps,
      TOSRepositoryService.findMapsById,
    );
  }

}
