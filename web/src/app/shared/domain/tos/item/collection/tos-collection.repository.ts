import { Injectable } from '@angular/core';
import {TOSCollection} from "./tos-collection.model";
import {CRUDRepository} from "../../../../service/CRUD.repository";

@Injectable({
  providedIn: 'root'
})
export class TOSCollectionRepository extends CRUDRepository<TOSCollection> {

  constructor() {
    super({
      id: '$ID',
      path: '/assets/data/collections.csv',
      searchKeys: ['$ID_NAME', 'Name'],
      loadStep: (row: TOSCollection) => new TOSCollection(row)
    });
  }

}
