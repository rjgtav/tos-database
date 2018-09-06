import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSCollectionService} from "./tos-collection.service";
import {TOSCollection} from "./tos-collection.model";

@Injectable()
export class TOSCollectionResolver extends CRUDResolver<TOSCollection> {

  constructor(service: TOSCollectionService) {
    super(service);
  }

}
