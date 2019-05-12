import {TOSItem} from "../tos-item.model";
import {ITOSItem, ITOSRecipe, ITOSRecipeLinkItem, TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {TOSEntityLink} from "../../tos-entity.model";

export class TOSRecipe extends TOSItem implements ITOSRecipe {

  constructor(json: TOSRecipe) {
    super(TOSDataSet.RECIPES, json);
  }

  get Link_Materials() { return this.$lazyPropertyLink('Link_Materials', value => this.TOSRecipeLinkItem(value)) as Observable<TOSRecipeMaterial[]> }
  get Link_Target() { return this.$lazyPropertyLink('Link_Target', value => TOSDomainService.itemsByIdLink(value)) as Observable<ITOSItem> }

  private TOSRecipeLinkItem(value: TOSRecipeMaterial): Observable<TOSRecipeMaterial> {
    return fromPromise((async () => {
      let object = new TOSRecipeMaterial(value);
          object.Item = await TOSDomainService.itemsByIdLink(+object.Item).toPromise();

      return object;
    })());
  }

}

export class TOSRecipeMaterial extends TOSEntityLink<ITOSItem> implements ITOSRecipeLinkItem {
  Item: ITOSItem;
  Quantity: number;

  constructor(json: TOSRecipeMaterial) {
    super();

    this.Item = json.Item;
    this.Quantity = +json.Quantity;
  }

  get Link() { return this.Item }

}
