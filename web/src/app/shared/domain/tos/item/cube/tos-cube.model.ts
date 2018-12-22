import {TOSItem} from "../tos-item.model";
import {ITOSCube, ITOSItem, TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Observable} from "rxjs";

export class TOSCube extends TOSItem implements ITOSCube {
  constructor(json: TOSCube) {
    super(TOSDataSet.CUBES, json);
  }

  get Link_Items() { return this.$lazyPropertyLink('Link_Items', value => TOSDomainService.itemsByIdLink(value)) as Observable<ITOSItem[]> }

}
