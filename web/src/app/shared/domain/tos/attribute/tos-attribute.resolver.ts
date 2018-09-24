import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSAttributeService} from "./tos-attribute.service";
import {TOSAttribute} from "./tos-attribute.model";

@Injectable()
export class TOSAttributeResolver extends CRUDResolver<TOSAttribute> {

  constructor(service: TOSAttributeService) {
    super(service);
  }

}
