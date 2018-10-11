import {TOSItem} from "../tos-item.model";
import {TOSRepositoryService} from "../../tos-repository.service";

export class TOSCube extends TOSItem {
  private link_Items: TOSItem[];

  constructor(json: TOSCube) {
    super(json, 'cubes');
  }

  get Link_Items(): TOSItem[] {
    return this.link_Items = this.link_Items
      ? this.link_Items
      : (this.json as TOSCube).Link_Items
        ? JSON
          .parse((this.json as TOSCube).Link_Items + '')
          .map(value => TOSRepositoryService.findItemsById(value))
        : null;
  }

}
