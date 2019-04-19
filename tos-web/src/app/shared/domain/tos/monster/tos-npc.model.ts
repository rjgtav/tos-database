import {TOSEntity} from "../tos-entity.model";
import {ITOSNPC, TOSDataSet, TOSNPCType} from "../tos-domain";

export class TOSNPC extends TOSEntity implements ITOSNPC {

  constructor(dataset: TOSDataSet, json: TOSNPC) {
    super(dataset, json);
  }

  get Type() { return this.$lazyPropertyEnum('Type', TOSNPCType) }

}
