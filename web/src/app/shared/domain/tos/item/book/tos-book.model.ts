import {TOSItem} from "../tos-item.model";

export class TOSBook extends TOSItem {
  Text: string;

  constructor(json: TOSBook) {
    super(json);

    this.Text = json.Text
      .split('{nl}{np}').join('{np}') // Remove endlines at the end of pages
      .split('{nl}{np}').join('{np}') // Remove endlines at the end of pages
      .split('{nl}').join('\n\n');
  }

  getPages(): string[] {
    return this.Text
      ? this.Text.split('{np}')
      : null
  }

}
