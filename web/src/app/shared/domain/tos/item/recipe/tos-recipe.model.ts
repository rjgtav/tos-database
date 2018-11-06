import {TOSItem} from "../tos-item.model";
import {ITOSItem, ITOSRecipe, ITOSRecipeMaterial, TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";

export class TOSRecipe extends TOSItem implements ITOSRecipe {
  private link_Materials: TOSRecipeMaterial[];
  private link_Target: ITOSItem;

  constructor(json: TOSRecipe) {
    super(TOSDataSet.RECIPES, json);
  }

  get Link_Materials(): TOSRecipeMaterial[] {
    return this.link_Materials = this.link_Materials
      ? this.link_Materials
      : (this.json as TOSRecipe).Link_Materials
        ? JSON
          .parse((this.json as TOSRecipe).Link_Materials + '')
          .map(value => new TOSRecipeMaterial(value))
        : null;
  }

  get Link_Target(): ITOSItem {
    return this.link_Target = this.link_Target
      ? this.link_Target
      : (this.json as TOSRecipe).Link_Target
        ? TOSDomainService.itemsByIdLink(+(this.json as TOSRecipe).Link_Target)
        : null;
  }

}

export class TOSRecipeMaterial implements ITOSRecipeMaterial {
  Item: ITOSItem;
  Quantity: number;

  constructor(json: TOSRecipeMaterial) {
    this.Item = TOSDomainService.itemsByIdLink(+json.Item);
    this.Quantity = +json.Quantity;
  }

}
