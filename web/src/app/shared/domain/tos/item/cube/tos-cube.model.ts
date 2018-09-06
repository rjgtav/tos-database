import {TOSItem} from "../tos-item.model";
import {TOSEntityLink} from "../../entity/tos-entity.model";

export class TOSCube extends TOSItem {

  Link_Items: TOSEntityLink[];

  constructor(json: TOSCube) {
    super(json);

    this.Link_Items = json.Link_Items
      ? JSON
        .parse(json.Link_Items + '')
        .map(json => json != null ? new TOSEntityLink(json) : json)
        //.filter(link => link != null)
      : null;

  }

}
