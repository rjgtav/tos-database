import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSBook} from "./tos-book.model";
import {TOSBookService} from "./tos-book.service";

@Injectable()
export class TOSBookResolver extends CRUDResolver<TOSBook> {

  constructor(service: TOSBookService) {
    super(service);
  }

}
