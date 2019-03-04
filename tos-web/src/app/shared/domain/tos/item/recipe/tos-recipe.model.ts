import {TOSItem} from "../tos-item.model";
import {ITOSItem, ITOSRecipe, ITOSRecipeMaterial, TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

export class TOSRecipe extends TOSItem implements ITOSRecipe {

  constructor(json: TOSRecipe) {
    super(TOSDataSet.RECIPES, json);
  }

  get Link_Materials() { return this.$lazyPropertyLink('Link_Materials', value => this.TOSRecipeMaterialFactory(value)) as Observable<TOSRecipeMaterial[]> }
  get Link_Target() { return this.$lazyPropertyLink('Link_Target', value => TOSDomainService.itemsByIdLink(value)) as Observable<ITOSItem> }

  private TOSRecipeMaterialFactory(value: TOSRecipeMaterial): Observable<TOSRecipeMaterial> {
    return fromPromise((async () => {
      let object = new TOSRecipeMaterial(value);
          object.Item = await TOSDomainService.itemsByIdLink(+object.Item).toPromise();

      return object;
    })());
  }

}

export class TOSRecipeMaterial implements ITOSRecipeMaterial {
  Item: ITOSItem;
  Quantity: number;

  constructor(json: TOSRecipeMaterial) {
    this.Item = json.Item;
    this.Quantity = +json.Quantity;
  }

  get Url() { return this.Item.Url }

}
