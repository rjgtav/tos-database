import {TOSUrlService} from "../../service/tos-url.service";
import {ITOSEntity} from "./tos-domain";

export abstract class Comparable {
  $comparators: { [key: string]: (a, b) => -1 | 0 | 1; } = {}
}

export abstract class TOSEntity extends Comparable implements ITOSEntity {
  private readonly description$: string;
  private readonly icon: string;
  private readonly url: string;

  readonly $ID: number;
  readonly $ID_NAME: string;
  readonly Dataset: string;
  readonly Name: string;

  protected constructor(json: TOSEntity, url: string) {
    super();

    this.$comparators['$ID'] = (a: number, b: number) => {
      let i = +a;
      let j = +b;

      return (i < j) ? -1 : (i > j) ? 1 : 0;
    };

    this.$ID = +json.$ID;
    this.$ID_NAME = json.$ID_NAME;
    this.Dataset = url ? url.split('-').map(value => value[0].toUpperCase() + value.slice(1)).join(' ') : '';
    this.description$ = json['Description'] ? json['Description'].replace(/{nl}/g, '\n') : null;
    this.icon = json['Icon'] ? 'assets/icons/' + json['Icon'].toLowerCase() + '.png' : null;
    this.Name = json.Name;
    this.url = '/database/' + url + '/' + this.$ID;
  }

  get Description(): string { return this.description$; }
  get Icon(): string { return this.icon; }
  get Url(): string { return TOSUrlService.Route(null, this.url); }

}
