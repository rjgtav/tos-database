import {TOSItem} from "../tos-item.model";
import {ITOSCollection, ITOSCollectionBonus, ITOSItem, TOSDataSet} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";

export class TOSCollection extends TOSItem implements ITOSCollection {
  private link_Items: ITOSItem[];

  readonly Bonus: TOSCollectionBonus[];

  constructor(json: TOSCollection) {
    super(TOSDataSet.COLLECTIONS, json);

    this.Bonus = json.Bonus
      ? JSON
        .parse(json.Bonus + '')
        .map(json => new TOSCollectionBonus(json))
        .sort()
      : null;
  }

  get Link_Items(): ITOSItem[] {
    return this.link_Items = this.link_Items
      ? this.link_Items
      : (this.json as TOSCollection).Link_Items
        ? JSON
          .parse((this.json as TOSCollection).Link_Items + '')
          .map(value => TOSDomainService.itemsByIdLink(value))
        : null;
  }

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
