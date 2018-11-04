import {TOSEntity} from "../tos-entity.model";
import {ITOSMap} from "../tos-domain";

export class TOSMap extends TOSEntity implements ITOSMap {

  constructor(json: TOSMap) {
    super(json, 'maps');
  }

}
