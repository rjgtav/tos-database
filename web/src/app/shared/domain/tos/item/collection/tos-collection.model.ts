import {TOSItem} from "../tos-item.model";
import {TOSRepositoryService} from "../../tos-repository.service";

export class TOSCollection extends TOSItem {
  private link_Items: TOSItem[];

  readonly Bonus: TOSCollectionBonus[];

  constructor(json: TOSCollection) {
    super(json, 'collections');

    this.Bonus = json.Bonus
      ? JSON
        .parse(json.Bonus + '')
        .map(json => new TOSCollectionBonus(json))
        .sort()
      : null;
  }

  get Link_Items(): TOSItem[] {
    return this.link_Items = this.link_Items
      ? this.link_Items
      : (this.json as TOSCollection).Link_Items
        ? JSON
          .parse((this.json as TOSCollection).Link_Items + '')
          .map(value => TOSRepositoryService.findItemsById(value))
        : null;
  }

}

export class TOSCollectionBonus {
  Stat: String;
  Value: number;

  constructor(json: string[]) {
    this.Stat = json[0];
    this.Value = +json[1];
  }

  toString(): string {
    return this.Stat + ' ' + (this.Value > 0 ? '+' : '') + this.Value;
  }

}
