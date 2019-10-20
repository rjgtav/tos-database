import {isObservable, of} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

export abstract class ObservableUtils {

  public static of(value: any) {
    if (value instanceof Promise)
      return fromPromise(value);
    if (isObservable(value))
      return value;

    return of(value);
  }

}
