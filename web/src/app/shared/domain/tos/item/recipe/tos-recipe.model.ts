import {TOSItem} from "../tos-item.model";
import {ITOSItem, ITOSRecipe, ITOSRecipeMaterial, TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";

export class TOSRecipe extends TOSItem implements ITOSRecipe {

  constructor(json: TOSRecipe) {
    super(TOSDataSet.RECIPES, json);
  }

  get Link_Materials() { return this.$lazyPropertyJSONArray('Link_Materials', value => new TOSRecipeMaterial(value)) }
  get Link_Target() { return this.$lazyPropertyLink('Link_Target', value => TOSDomainService.itemsByIdLink(value)) }

}

export class TOSRecipeMaterial implements ITOSRecipeMaterial {
  Item: ITOSItem;
  Quantity: number;

  constructor(json: TOSRecipeMaterial) {
    this.Item = TOSDomainService.itemsByIdLink(+json.Item);
    this.Quantity = +json.Quantity;
  }

}
