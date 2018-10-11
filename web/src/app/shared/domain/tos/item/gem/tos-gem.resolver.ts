import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSGem} from "./tos-gem.model";
import {TOSRepositoryService} from "../../tos-repository.service";

@Injectable()
export class TOSGemResolver extends CRUDResolver<TOSGem> {

  constructor() {
    super(
      TOSRepositoryService.findGems,
      TOSRepositoryService.findGemsById,
      TOSRepositoryService.searchGems,
    );
  }

}
