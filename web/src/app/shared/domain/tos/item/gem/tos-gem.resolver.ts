import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSGemService} from "./tos-gem.service";
import {TOSGem} from "./tos-gem.model";

@Injectable()
export class TOSGemResolver extends CRUDResolver<TOSGem> {

  constructor(service: TOSGemService) {
    super(service);
  }

}
