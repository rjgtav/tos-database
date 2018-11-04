export enum TOSRegion {
  iTOS = 'iTOS',
  jTOS = 'jTOS',
  kTEST = 'kTOS (Test)',
  kTOS = 'kTOS',
}

export namespace TOSRegion {

  export function toUrl(value: TOSRegion): string {
    switch (value) {
      case TOSRegion.iTOS:  return 'itos';
      case TOSRegion.jTOS:  return 'jtos';
      case TOSRegion.kTOS:  return 'ktos';
      case TOSRegion.kTEST:  return 'ktest';
    }
  }

  export function valueOf(param: string): TOSRegion {
    return Object
      .values(TOSRegion)
      .find(value => toUrl(value) == param.toLowerCase());
  }

}
