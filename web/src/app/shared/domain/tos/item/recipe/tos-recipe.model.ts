import {TOSItem} from "../tos-item.model";
import {TOSEntityLink} from "../../entity/tos-entity.model";

export class TOSRecipe extends TOSItem {

  Link_Materials: TOSRecipeMaterial[];
  Link_Target: TOSEntityLink;

  constructor(json: TOSRecipe) {
    super(json);

    this.Link_Materials = json.Link_Materials
      ? JSON
        .parse(json.Link_Materials + '')
        .map(json => json ? new TOSRecipeMaterial(json) : null)
        //.filter(link => link && link.Item)
      : null;

    this.Link_Target = json.Link_Target ? new TOSEntityLink(json.Link_Target) : null;
  }

  get TargetAsList(): TOSEntityLink[] {
    return this.Link_Target ? [this.Link_Target] : null;
  }

}

export class TOSRecipeMaterial {
  Item: TOSEntityLink;
  Quantity: number;

  constructor(json: TOSRecipeMaterial) {
    this.Item = new TOSEntityLink(json.Item);
    this.Quantity = +json.Quantity;
  }

}
