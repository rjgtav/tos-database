import {TOSItem} from "../tos-item.model";
import {TOSEntityLink} from "../../entity/tos-entity.model";

export class TOSCollection extends TOSItem {
  Bonus: TOSCollectionBonus[];

  Link_Items: TOSEntityLink[];

  constructor(json: TOSCollection) {
    super(json);

    this.Bonus = json.Bonus
      ? JSON
        .parse(json.Bonus + '')
        .map(json => new TOSCollectionBonus(json))
        .sort()
      : null;

    this.Link_Items = json.Link_Items
      ? JSON
        .parse(json.Link_Items + '')
        .map(json => json != null ? new TOSEntityLink(json) : json)
        //.filter(link => link != null)
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
