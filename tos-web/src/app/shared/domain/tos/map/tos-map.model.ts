import {TOSEntity} from "../tos-entity.model";
import {ITOSMap, TOSDataSet} from "../tos-domain";

export class TOSMap extends TOSEntity implements ITOSMap {

  constructor(json: TOSMap) {
    super(TOSDataSet.MAPS, json);
  }

}
