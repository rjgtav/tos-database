import {ITOSItemV2} from "../tos-domain";
import {TOSEntityV2} from "../v2-tos-entity";

export abstract class TOSItemV2 extends TOSEntityV2 implements ITOSItemV2 {

  Icon: string;

}
