import {Injectable} from "@angular/core";
import {TOSItem} from "./tos-item.model";
import {CRUDResolver} from "../../../service/CRUD.resolver";
import {TOSRepositoryService} from "../tos-repository.service";

@Injectable()
export class TOSItemResolver extends CRUDResolver<TOSItem> {

  constructor() {
    super(
      TOSRepositoryService.findItems,
      TOSRepositoryService.findItemsById,
    );
  }

}
