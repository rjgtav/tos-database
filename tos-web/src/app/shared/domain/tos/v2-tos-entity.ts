import {ITOSEntityV2} from "./tos-domain";

export abstract class TOSEntityV2 implements ITOSEntityV2{

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

}
