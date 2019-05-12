import {TOSItem} from "../tos-item.model";
import {ITOSBook, TOSDataSet} from "../../tos-domain";

export class TOSBook extends TOSItem implements ITOSBook {
  constructor(json: TOSBook) {
    super(TOSDataSet.BOOKS, json);
  }

  get Pages() { return this.$lazyPropertyStringMultiline('Text') }

}
