import {ITOSNPC, TOSDataSet} from "../tos-domain";
import {TOSMonster} from "./tos-monster.model";

export class TOSNPC extends TOSMonster implements ITOSNPC {

  constructor(json: TOSNPC) {
    super(TOSDataSet.NPCS, json);
  }

  get Url(): string { return null }

}
