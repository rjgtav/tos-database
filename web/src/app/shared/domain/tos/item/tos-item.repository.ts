import { Injectable } from '@angular/core';
import {TOSItem} from "./tos-item.model";
import {CRUDRepository} from "../../../service/CRUD.repository";
import {TOSRepositoryService} from "../tos-repository.service";

@Injectable({
  providedIn: 'root'
})
export class TOSItemRepository extends CRUDRepository<TOSItem> {

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/items.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSItem) => new TOSItem(row, 'items')
    });
  }

  findById($ID: number): TOSItem {
    return super.findById($ID)
      || TOSRepositoryService.findBooksById($ID)
      || TOSRepositoryService.findCardsById($ID)
      || TOSRepositoryService.findCollectionsById($ID)
      || TOSRepositoryService.findCubesById($ID)
      || TOSRepositoryService.findEquipmentById($ID)
      || TOSRepositoryService.findGemsById($ID)
      || TOSRepositoryService.findRecipesById($ID)
  }

}
