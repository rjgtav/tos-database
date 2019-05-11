import {TOSEntity} from "../tos-entity.model";
import {ITOSNPC, TOSDataSet, TOSNPCType} from "../tos-domain";

export class TOSNPC extends TOSEntity implements ITOSNPC {

  constructor(dataset: TOSDataSet, json: TOSNPC) {
    super(dataset, json);

    this.Selected = this.Type != TOSNPCType.MONSTER;
  }

  get Type() { return this.$lazyPropertyEnum('Type', TOSNPCType) }
  get Url(): string { return null }

}
