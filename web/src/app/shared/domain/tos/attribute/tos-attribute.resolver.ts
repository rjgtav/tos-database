import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSAttribute} from "./tos-attribute.model";
import {TOSRepositoryService} from "../tos-repository.service";

@Injectable()
export class TOSAttributeResolver extends CRUDResolver<TOSAttribute> {

  constructor() {
    super(
      TOSRepositoryService.findAttributes,
      TOSRepositoryService.findAttributesById,
    );
  }

}
