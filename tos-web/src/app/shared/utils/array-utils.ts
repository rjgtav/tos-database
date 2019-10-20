export abstract class ArrayUtils {

  public static flatten<T>(array: T[][]): T[] {
    return  [].concat.apply([], array);
  }

  public static get sort() {
    return (a, b) => a < b ? -1 : a > b ? 1 : 0;
  }

  public static reduce(data, key: number | string, array: boolean = false) {
    let keys = typeof key == 'string' ? key.split('.') : [key];
    let keyParent = keys[0];
    let keyChild = keys[Math.min(1, keys.length - 1)];

    let populate = (accumulator, key, value) => {
      if (key == null || value == null)
        return;

      if (typeof key == 'object')
        key = key[keyChild];

      if (array) {
        accumulator[key] = accumulator[key] || [];
        accumulator[key].push(value);
      } else {
        accumulator[key] = value;
      }
    };

    return data.reduce((accumulator, entry) => {

      if (Array.isArray(entry[keyParent]))  entry[keyParent].map(key => populate(accumulator, key, entry));
      else                                  populate(accumulator, entry[keyParent], entry);

      return accumulator;
    }, {})
  }

}
