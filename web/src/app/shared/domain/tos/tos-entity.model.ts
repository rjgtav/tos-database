import {TOSUrlService} from "../../service/tos-url.service";
import {ITOSEntity, TOSDataSet} from "./tos-domain";
import {forkJoin, isObservable, Observable, ReplaySubject} from "rxjs";

const COMPARATOR_ID = (a: number, b: number) => {
  let i = +a;
  let j = +b;

  return (i < j) ? -1 : (i > j) ? 1 : 0;
};

const STRING_INITIALIZED = '\u200B';

export abstract class Comparable {
  $comparators: { [key: string]: (a, b) => -1 | 0 | 1; } = {}
}

export abstract class TOSEntity extends Comparable implements ITOSEntity {

  private url: string;

  protected constructor(readonly Dataset: TOSDataSet, protected $json: TOSEntity) {
    super();

    this.$comparators['$ID'] = COMPARATOR_ID;
  }

  get $ID(): number { return this.$lazyPropertyNumber('$ID'); }
  get $ID_NAME(): string { return this.$lazyPropertyString('$ID_NAME'); }
  get Description(): string { return this.$lazyPropertyStringMultiline('Description'); }
  get Icon(): string {
    let icon = this.$lazyPropertyString('Icon');

    return icon
      ? TOSUrlService.Asset(null, 'assets/icons/' + icon + '.png')
      : null;
  }
  get Name(): string { return this.$lazyPropertyString('Name'); }
  get Url(): string {
    return this.url = this.url
      ? this.url
      : this.Dataset
        ? TOSUrlService.Route(null, '/database/' + TOSDataSet.toUrl(this.Dataset) + '/' + this.$ID)
        : null;
  }

  static trackBy(index: number, entity: TOSEntity) { return entity.$ID; }

  protected $lazyPropertyBoolean(prop: string): boolean {
    return this.$json[prop] = typeof this.$json[prop] == 'boolean'
      ? this.$json[prop]
      : this.$json[prop] == 'True';
  }

  protected $lazyPropertyEnum<T>(prop: string, enumeration: T): T[keyof T] {
    return this.$json[prop] = isNaN(+this.$json[prop])
      ? this.$json[prop]
      : this.$json[prop] != undefined
        ? Object.values(enumeration)[+this.$json[prop]]
        : null;
  }

  protected $lazyPropertyJSONArray<T>(prop: string, mapper?: (value: any) => T, sorter?: (a: T, b: T) => -1 | 0 | 1): T[] {
    if (Array.isArray(this.$json[prop]))
      return this.$json[prop];

    this.$json[prop] = this.$json[prop] && JSON.parse(this.$json[prop]);
    this.$json[prop] = this.$json[prop] && mapper && this.$json[prop].map(mapper) || this.$json[prop];
    this.$json[prop] = this.$json[prop] && sorter && this.$json[prop].sort(sorter) || this.$json[prop];
    this.$json[prop] = this.$json[prop] && this.$json[prop].filter(value => !!value);

    return this.$json[prop];
  }

  protected $lazyPropertyJSONObject<T>(prop: string, mapper?: (value: any) => T): { [key: number]: T } {
    if (typeof this.$json[prop] == 'object')
      return this.$json[prop];

    this.$json[prop] = this.$json[prop] && JSON.parse(this.$json[prop]);
    this.$json[prop] && Object
      .keys(this.$json[prop])
      .forEach((key) => this.$json[prop][key] = mapper && mapper(this.$json[prop][key]) || this.$json[prop][key]);

    return this.$json[prop];
  }

  protected $lazyPropertyLink<T>(prop: string, mapper: (value: any) => Observable<T>): Observable<T> | Observable<T[]> {
    if (isObservable(this.$json[prop]))
      return this.$json[prop] as Observable<T>;

    if (this.$json[prop]) {
      let subject = new ReplaySubject<T>(1);
      let observable = typeof this.$json[prop] == 'string' && JSON.parse(this.$json[prop]) || this.$json[prop];
          observable = this.$json[prop + '$original'] = observable;
          observable = Array.isArray(observable) && observable.map(mapper) || mapper(observable);
          observable = Array.isArray(observable) && forkJoin(observable) || observable;
          observable.subscribe(value => {
            subject.next(value);
            subject.complete();
          });

      return this.$json[prop] = subject.asObservable();
    }

    return null;
  }

  protected $lazyPropertyLinkOriginal(propOriginal: string) : number | number[] {
    let prop = propOriginal + '$original';

    if (this.$json[prop] && typeof this.$json[prop] != 'string')
      return this.$json[prop];

    this.$json[prop] = this.$json[prop] || this.$json[propOriginal];
    this.$json[prop] = typeof this.$json[prop] == 'string' && JSON.parse(this.$json[prop]) || this.$json[prop + '$original'];

    return this.$json[prop];
  }

  protected $lazyPropertyNumber(prop: string, mapper = (value) => value): number {
    return this.$json[prop] = typeof this.$json[prop] == 'number'
      ? this.$json[prop]
      : this.$json[prop] != undefined
        ? mapper(+this.$json[prop])
        : null;
  }

  protected $lazyPropertyString(prop: string): string {
    return this.$json[prop] = typeof this.$json[prop] == 'string'
      ? this.$json[prop]
      : this.$json[prop] + '';
  }
  protected $lazyPropertyStringMultiline(prop: string, mapper = (value) => value): string {
    return this.$json[prop] = this.$json[prop] && this.$json[prop][0] == STRING_INITIALIZED
      ? this.$json[prop]
      : this.$json[prop]
        ? STRING_INITIALIZED + mapper(this.$json[prop])
        .replace(/{nl}/g, '\n')
        .replace(/{b}?(.*){b}/g, '<b>$1</b>')
        .trim()
        : null;
  }

}
