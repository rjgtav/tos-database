import {TOSItem} from "../tos-item.model";
import {ITOSCube, ITOSItem} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";

export class TOSCube extends TOSItem implements ITOSCube {
  private link_Items: TOSItem[];

  constructor(json: TOSCube) {
    super(json, 'cubes');
  }

  get Link_Items(): ITOSItem[] {
    return this.link_Items = this.link_Items
      ? this.link_Items
      : (this.json as TOSCube).Link_Items
        ? JSON
          .parse((this.json as TOSCube).Link_Items + '')
          .map(value => TOSDomainService.itemsByIdLink(value))
        : null;
  }

}
