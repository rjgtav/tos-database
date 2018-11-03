import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSCollection} from "./tos-collection.model";
import {TOSRepositoryService} from "../../tos-repository.service";

@Injectable()
export class TOSCollectionResolver extends CRUDResolver<TOSCollection> {

  constructor() {
    super(
      TOSRepositoryService.findCollections,
      TOSRepositoryService.findCollectionsById,
    );
  }

}
