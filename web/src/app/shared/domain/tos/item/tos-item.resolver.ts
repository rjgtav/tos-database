import {Injectable} from "@angular/core";
import {TOSItem} from "./tos-item.model";
import {TOSItemService} from "./tos-item.service";
import {CRUDResolver} from "../../../service/CRUD.resolver";

@Injectable()
export class TOSItemResolver extends CRUDResolver<TOSItem> {

  constructor(service: TOSItemService) {
    super(service);
  }

}
