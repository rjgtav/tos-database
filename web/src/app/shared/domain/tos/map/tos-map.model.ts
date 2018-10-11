import {TOSEntity} from "../entity/tos-entity.model";

export class TOSMap extends TOSEntity {

  constructor(json: TOSMap) {
    super(json, 'maps');
  }

}
