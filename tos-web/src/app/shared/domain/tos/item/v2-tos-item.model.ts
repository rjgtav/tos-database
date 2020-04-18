import {ITOSItemV2} from "../tos-domain";
import {TOSEntityV2} from "../v2-tos-entity";
import {of} from "rxjs";
import {TOSUrlService} from "../../../service/tos-url.service";

export abstract class TOSItemV2 extends TOSEntityV2 implements ITOSItemV2 {

  GroupName: string;
  Icon: string;
  LifeTime: number;
  MarketCategory: string;
  MarketTrade: 'YES' | 'NO';
  RefreshScp: string;
  ReqToolTip: string;
  ShopTrade: 'YES' | 'NO';
  TeamTrade: 'YES' | 'NO';
  UserTrade: 'YES' | 'NO';

  get Url() {
    return of(TOSUrlService.RouteDatabase(`items/${ this.MarketCategory.split('_')[0] }/${ this.ClassID }`.toLowerCase()));
  }

}
