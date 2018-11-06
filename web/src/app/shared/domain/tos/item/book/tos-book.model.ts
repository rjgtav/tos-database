import {TOSItem} from "../tos-item.model";
import {ITOSBook, TOSDataSet} from "../../tos-domain";

export class TOSBook extends TOSItem implements ITOSBook{
  readonly Pages: string[];

  constructor(json: TOSBook) {
    super(TOSDataSet.BOOKS, json);

    this.Pages = json['Text']
      ? (json['Text'] as string)
        .replace(/{nl}/g, '\n\n') // Remove endlines at the end of pages
        .split('{np}')
      : null;
  }

}
