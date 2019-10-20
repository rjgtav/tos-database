import {ITOSEntityV2} from "../../../domain/tos/tos-domain";

export abstract class EntityTableV2Cell<ENTITY extends ITOSEntityV2> {

  protected constructor(
    public key: keyof ENTITY,
    public proxy: boolean,
  ) {}

  get image(): boolean { return false }

}
