import {ITOSEntityV2} from "./tos-domain";
import {isObservable, Observable} from "rxjs";

export abstract class TOSEntityV2 implements ITOSEntityV2 {

  ClassID: number;
  ClassName: string;
  Name: string;

  __Entry_Created: Date;
  __Entry_Updated: Date;

  protected constructor(json: ITOSEntityV2) {
    json && Object
      .keys(json)
      .forEach(key => this[key] = json[key]);
  }

  abstract get Url(): Observable<string>;

  toJSON() {
    let json = {};

    Object
      .keys(this)
      .filter(value => !value.startsWith('$'))
      .filter(value => !isObservable(value))
      .forEach(value => json[value] = this[value]);

    return json;
  }

}
