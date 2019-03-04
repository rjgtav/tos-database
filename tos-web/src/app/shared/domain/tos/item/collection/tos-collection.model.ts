import {TOSItem} from "../tos-item.model";
import {ITOSCollection, ITOSCollectionBonus, ITOSItem, TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {ArrayUtils} from "../../../../utils/array-utils";
import {Observable} from "rxjs";

export class TOSCollection extends TOSItem implements ITOSCollection {

  constructor(json: TOSCollection) {
    super(TOSDataSet.COLLECTIONS, json);
  }

  get Bonus() { return this.$lazyPropertyJSONArray('Bonus', value => new TOSCollectionBonus(value), ArrayUtils.sort) }
  get Link_Items() { return this.$lazyPropertyLink('Link_Items', value => TOSDomainService.itemsByIdLink(value)) as Observable<ITOSItem[]> }

}

export class TOSCollectionBonus implements ITOSCollectionBonus {
  Stat: string;
  Value: number;

  constructor(json: string[]) {
    this.Stat = json[0];
    this.Value = +json[1];
  }

  toString(): string {
    return this.Stat + ' ' + (this.Value > 0 ? '+' : '') + this.Value;
  }

}
