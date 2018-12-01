import {TOSItem} from "../tos-item.model";
import {ITOSCube, ITOSItem, TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";

export class TOSCube extends TOSItem implements ITOSCube {
  constructor(json: TOSCube) {
    super(TOSDataSet.CUBES, json);
  }

  get Link_Items() { return this.$lazyPropertyJSONArray('Link_Items', value => TOSDomainService.itemsByIdLink(value)) }

}
