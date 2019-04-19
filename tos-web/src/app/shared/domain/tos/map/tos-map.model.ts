import {TOSEntity} from "../tos-entity.model";
import {ITOSCollection, ITOSItem, ITOSMap, ITOSMapSpawn, ITOSNPC, TOSDataSet, TOSMapType} from "../tos-domain";
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
  get Link_Items() { return this.$lazyPropertyLink('Link_Items', value => TOSDomainService.itemsByIdLink(value)) as Observable<ITOSItem[]> }
  get Link_Items_Exploration() { return this.$lazyPropertyLink('Link_Items_Exploration', value => TOSDomainService.itemsByIdLink(value)) as Observable<ITOSItem[]> }
  get Link_Maps() { return this.$lazyPropertyLink('Link_Maps', value => TOSDomainService.mapsById(value)) as Observable<ITOSMap[]> }
  get Link_Maps_Floors() { return this.$lazyPropertyLink('Link_Maps_Floors', value => TOSDomainService.mapsById(value)) as Observable<ITOSMap[]> }
  get Link_NPCs() { return this.$lazyPropertyLink('Link_NPCs', value => this.TOSMapSpawnFactory(value)) as Observable<TOSMapSpawn[]> }


  private TOSMapSpawnFactory(value: TOSMapSpawn): Observable<TOSMapSpawn> {
    return fromPromise((async () => {
      let object = new TOSMapSpawn(value);
          object.NPC = await TOSDomainService.npcsByIdLink(+object.NPC).toPromise();

      return object;
    })());
  }

}

export class TOSMapSpawn implements ITOSMapSpawn {
  NPC: ITOSNPC;
  Population: number;
  Positions: number[][];
  TimeRespawn: number;

  constructor(json: TOSMapSpawn) {
    this.NPC = json.NPC;
    this.Population = +json.Population;
    this.Positions = json.Positions;
    this.TimeRespawn = +json.TimeRespawn;
  }

}
