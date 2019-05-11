import {TOSEntity, TOSEntityLink} from "../tos-entity.model";
import {
  ITOSCollection,
  ITOSItem,
  ITOSMap,
  ITOSMapLinkItem,
  ITOSMapLinkNPC,
  ITOSNPC,
  TOSDataSet,
  TOSMapType
} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {TOSUrlService} from "../../../service/tos-url.service";

export class TOSMap extends TOSEntity implements ITOSMap {

  constructor(json: TOSMap) {
    super(TOSDataSet.MAPS, json);
  }

  get HasChallengeMode() { return this.$lazyPropertyBoolean('HasChallengeMode') }
  get HasWarp() { return this.$lazyPropertyBoolean('HasWarp') }
  get Layout(): string { return TOSUrlService.Asset('assets/images/maps/' + this.$ID_NAME.toLowerCase() + '.png') }
  get Level() { return this.$lazyPropertyNumber('Level') }
  get Prop_EliteMonsterCapacity() { return this.$lazyPropertyNumber('Prop_EliteMonsterCapacity') }
  get Prop_MaxHateCount() { return this.$lazyPropertyNumber('Prop_MaxHateCount') }
  get Prop_RewardEXPBM() { return this.$lazyPropertyNumber('Prop_RewardEXPBM') }
  get Stars() { return this.$lazyPropertyNumber('Stars') }
  get Type() { return this.$lazyPropertyEnum('Type', TOSMapType) }
  get Warp() { return this.$lazyPropertyNumber('Warp') }
  get WorldMap() { return this.$lazyPropertyJSONArray('WorldMap', value => +value) }

  get Link_Collections() { return this.$lazyPropertyLink('Link_Collections', value => TOSDomainService.collectionsById(value)) as Observable<ITOSCollection[]> }
  get Link_Items() { return this.$lazyPropertyLink('Link_Items', value => this.TOSMapLinkItem(value)) as Observable<TOSMapLinkItem[]> }
  get Link_Items_Exploration() { return this.$lazyPropertyLink('Link_Items_Exploration', value => this.TOSMapLinkItem(value)) as Observable<TOSMapLinkItem[]> }
  get Link_Maps() { return this.$lazyPropertyLink('Link_Maps', value => TOSDomainService.mapsById(value)) as Observable<ITOSMap[]> }
  get Link_Maps_Floors() { return this.$lazyPropertyLink('Link_Maps_Floors', value => TOSDomainService.mapsById(value)) as Observable<ITOSMap[]> }
  get Link_NPCs() { return this.$lazyPropertyLink('Link_NPCs', value => this.TOSMapLinkNPC(value)) as Observable<TOSMapLinkNPC[]> }

  private TOSMapLinkItem(value: TOSMapLinkItem): Observable<TOSMapLinkItem> {
    return fromPromise((async () => {
      let object = new TOSMapLinkItem(value);
          object.Item = await (object.Item && TOSDomainService.itemsByIdLink(+object.Item).toPromise());

      return object;
    })());
  }
  private TOSMapLinkNPC(value: TOSMapLinkNPC): Observable<TOSMapLinkNPC> {
    return fromPromise((async () => {
      let object = new TOSMapLinkNPC(value);
          object.Item = await (object.Item && TOSDomainService.itemsByIdLink(+object.Item).toPromise());
          object.NPC = await (object.NPC && TOSDomainService.npcsByIdLink(+object.NPC).toPromise());

      return object;
    })());
  }

}

export class TOSMapLinkItem extends TOSEntityLink<ITOSItem> implements ITOSMapLinkItem {
  Chance: number;
  Item: ITOSItem;
  Quantity_MAX: number;
  Quantity_MIN: number;

  constructor(json: TOSMapLinkItem) {
    super();

    this.Chance = +json.Chance;
    this.Item = json.Item;
    this.Quantity_MAX = +json.Quantity_MAX;
    this.Quantity_MIN = +json.Quantity_MIN;
  }

  get Link() { return this.Item }

}

export class TOSMapLinkNPC extends TOSEntityLink<ITOSItem | ITOSNPC> implements ITOSMapLinkNPC {
  Item: ITOSItem;
  NPC: ITOSNPC;
  Population: number;
  Positions: number[][];
  TimeRespawn: number;

  constructor(json: TOSMapLinkNPC) {
    super();

    this.Item = json.Item;
    this.NPC = json.NPC;
    this.Population = +json.Population;
    this.Positions = json.Positions;
    this.TimeRespawn = +json.TimeRespawn;
  }

  get Link() { return this.Item || this.NPC }

}
