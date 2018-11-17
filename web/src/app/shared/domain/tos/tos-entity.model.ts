import {TOSUrlService} from "../../service/tos-url.service";
import {ITOSEntity, TOSDataSet} from "./tos-domain";

export abstract class Comparable {
  $comparators: { [key: string]: (a, b) => -1 | 0 | 1; } = {}
}

export abstract class TOSEntity extends Comparable implements ITOSEntity {
  private readonly description$: string;
  private readonly icon: string;
  private readonly url: string;

  readonly $ID: number;
  readonly $ID_NAME: string;
  readonly Dataset: TOSDataSet;
  readonly Name: string;

  protected constructor(dataset: TOSDataSet, json: TOSEntity) {
    super();

    this.$comparators['$ID'] = (a: number, b: number) => {
      let i = +a;
      let j = +b;

      return (i < j) ? -1 : (i > j) ? 1 : 0;
    };

    this.$ID = +json.$ID;
    this.$ID_NAME = json.$ID_NAME;
    this.Dataset = dataset;
    this.description$ = json['Description'] ? json['Description'].replace(/{nl}/g, '\n') : null;
    this.icon = json['Icon']
      ? TOSUrlService.Asset(null, 'assets/icons/' + json['Icon'] + '.png')
      : null;
    this.Name = json.Name;
    this.url = '/database/' + TOSDataSet.toUrl(dataset) + '/' + this.$ID;
  }

  get Description(): string { return this.description$; }
  get Icon(): string { return this.icon; }
  get Url(): string { return TOSUrlService.Route(null, this.url); }

}
