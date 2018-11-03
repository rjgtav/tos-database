import {Injectable} from "@angular/core";
import {CRUDResolver} from "../../../../service/CRUD.resolver";
import {TOSBook} from "./tos-book.model";
import {TOSBookRepository} from "./tos-book.repository";
import {TOSRepositoryService} from "../../tos-repository.service";

@Injectable()
export class TOSBookResolver extends CRUDResolver<TOSBook> {

  constructor() {
    super(
      TOSRepositoryService.findBooks,
      TOSRepositoryService.findBooksById,
    );
  }

}
