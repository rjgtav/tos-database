import {TOSItem} from "../tos-item.model";
import {TOSRepositoryService} from "../../tos-repository.service";

export class TOSRecipe extends TOSItem {
  private link_Materials: TOSRecipeMaterial[];
  private link_Target: TOSItem;

  constructor(json: TOSRecipe) {
    super(json, 'recipes');
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

  get Link_Target(): TOSItem {
    return this.link_Target = this.link_Target
      ? this.link_Target
      : (this.json as TOSRecipe).Link_Target
        ? TOSRepositoryService.findItemsById(+(this.json as TOSRecipe).Link_Target)
        : null;
  }

  get TargetAsList(): TOSItem[] {
    return this.Link_Target ? [this.Link_Target] : null;
  }

}

export class TOSRecipeMaterial {
  Item: TOSItem;
  Quantity: number;

  constructor(json: TOSRecipeMaterial) {
    this.Item = TOSRepositoryService.findItemsById(+json.Item);
    this.Quantity = +json.Quantity;
  }

}
