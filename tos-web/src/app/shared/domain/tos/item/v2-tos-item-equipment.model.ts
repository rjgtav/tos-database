import {TOSItemV2} from "./v2-tos-item.model";
import {
  ITOSEntityV2,
  ITOSItemEquipmentV2,
  ITOSItemEquipmentV2$BasicTooltipProp,
  ITOSItemEquipmentV2$BasicTooltipProp$Transcended,
  ITOSItemEquipmentV2$Prop$Tooltip,
  ITOSItemEquipmentV2$UseJob
} from "../tos-domain";
import {Observable, of, ReplaySubject} from "rxjs";
import {LUAService} from "../../../service/lua.service";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

export abstract class TOSItemEquipmentV2 extends TOSItemV2 implements ITOSItemEquipmentV2 {

  BasicTooltipProp: string;
  ClassType: string;
  Desc: string;
  FileName: string;
  ItemGrade: number;
  MATK: number;
  MAXATK: number;
  MAXATK_AC: number = 0;
  MaxDur: number;
  MaxPR: number;
  MaxSocket_COUNT: number;
  MINATK: number;
  MINATK_AC: number = 0;
  ModelType: string;
  NeedAppraisal: number;
  NeedRandomOption: number;
  Reinforce_2: number;
  Transcend: number;
  UseJob: string;
  UseLv: number;
  Weight: number;
  $Stats: string[];

  private $Reinforce_2$Subject: ReplaySubject<number> = new ReplaySubject<number>(1);
  private $Transcend$Subject: ReplaySubject<number> = new ReplaySubject<number>(1);

  protected constructor(json: ITOSEntityV2) {
    super(json);

    this.$Reinforce_2$Update(0);
    this.$Transcend$Update(0);
  }

  get BasicTooltipProp$(): string[] { return this.BasicTooltipProp.split(';') }
  get BasicTooltipProp$List(): Observable<ITOSItemEquipmentV2$BasicTooltipProp[]> {
    // ui.ipf/uiscp/equip_tooltip.lua > DRAW_EQUIP_ATK_N_DEF
    return (this.RefreshScp ? LUAService.INSTANCE.call(this.RefreshScp, [this, 0, 0, 0]) : of(true))
      .pipe(map(() => this.BasicTooltipProp$.map((prop: 'ATK' | 'MATK' | string) => {
        switch (prop) {
          case "ATK": return {
            icon: 'test_sword_icon',
            label: 'Melee_Atk',
            value_min: this.MINATK,
            value_max: this.MAXATK,
          };

          case 'MATK': return {
            icon: 'test_sword_icon',
            label: 'Magic_Atk',
            value_max: this.MATK,
            value_min: this.MATK,
          };

          default: return {
            icon: 'test_shield_icon',
            label: prop,
            value_max: this[prop],
            value_min: this[prop],
          }
        }
    })));
  }

  get Icon$Tooltip(): Observable<string> { return LUAService.INSTANCE.call('GET_EQUIP_ITEM_IMAGE_NAME', [this, 'TooltipImage']) }

  get ItemGrade$Background(): Observable<string> { return this.ItemGrade$BackgroundSmall.pipe(map((value: string) => value.slice(0, -1))) }
  get ItemGrade$BackgroundSmall(): Observable<string> { return LUAService.INSTANCE.call('GET_ITEM_BG_PICTURE_BY_GRADE', [this.ItemGrade, 0, 0]) }
  get ItemGrade$Icon(): string {
    let invenslot;

    switch (this.ItemGrade) {
      case 2: invenslot = 'invenslot_pic_magic'; break;
      case 3: invenslot = 'invenslot_pic_rare'; break;
      case 4: invenslot = 'invenslot_pic_unique'; break;
      case 5: invenslot = 'invenslot_pic_legend'; break;
      default: invenslot = 'invenslot_nomal'; break;
    }

    return `${ invenslot }/slot`;
  }

  get NeedAppraisal$Icon(): string {
    return this.NeedAppraisal == 1 || this.NeedRandomOption == 1
      ? 'itemslot_unconceded_icon'
      : null;
  }

  get Reinforce_2$(): Observable<number> { return this.$Reinforce_2$Subject.asObservable() /* TODO: debounce */ }
  get Transcend$(): Observable<number> { return this.$Transcend$Subject.asObservable() /* TODO: debounce */ }

  get UseJob$Tooltip(): Observable<ITOSItemEquipmentV2$UseJob[]> {
    return LUAService.INSTANCE.call('GET_USEJOB_TOOLTIP_SMALL_IMG', [{ UseJob: this.UseJob }])
      .pipe(map((value: (0 | 1)[]) => ['Warrior', 'Wizard', 'Archer', 'Cleric', 'Scout'].map((job, i) => ({
        icon: `${ value[i] == 1 ? 'open' : 'close' }_${ job.toLowerCase() }`,
        label: job,
      }))));
  }

  get $Props$Tooltip(): Observable<ITOSItemEquipmentV2$Prop$Tooltip[]> {
    // ui.ipf/uiscp/equip_tooltip.lua > DRAW_EQUIP_PROPERTY
    return LUAService.INSTANCE.call('GET_EQUIP_TOOLTIP_PROP_LIST', [this])
      .pipe(map((value: string[]) => value
        .filter(prop => this.BasicTooltipProp$.indexOf(prop) == -1) // Filter out BasicTooltipProps
        .filter(prop => this[prop]) // Filter out props with no value
        .filter(prop => {
          if (this.GroupName == 'Weapon') return prop != 'MINATK' && prop != 'MAXATK';
          if (this.GroupName == 'Armor' && this.ClassType == 'Gloves') return prop != 'HR';
          if (this.GroupName == 'Armor' && this.ClassType == 'Boots') return prop != 'DR';
          if (this.GroupName == 'Armor' /* else */) return prop != 'DEF';
          return true
        })
        // ui.ipf/uiscp/lib_itemtooltip.lua > ABILITY_DESC_NO_PLUS
        .map(prop => ({
          arrow: this[prop] < 0 ? 'PropDown' : 'PropUp',
          label: prop,
          value: this[prop],
        }))
      ));
  }

  $BasicTooltipProp$Reinforced(value?: number): Observable<number> {
    if (value == 0) return of(0);

    let reinforce = value != undefined ? value : this.Reinforce_2;
    let item = Object.assign(this.toJSON(), { Reinforce_2: reinforce });

    // ui.ipf/uiscp/lib_itemtooltip.lua > SET_REINFORCE_TEXT
    if (this.GroupName == 'Armor') return LUAService.INSTANCE.call('GET_REINFORCE_ADD_VALUE', [this.BasicTooltipProp, item, 0, 0]);
    if (this.GroupName == 'Weapon') return LUAService.INSTANCE.call('GET_REINFORCE_ADD_VALUE_ATK', [item, 0, 0, this.BasicTooltipProp]);
    if (this.GroupName == 'SubWeapon') return LUAService.INSTANCE.call('GET_REINFORCE_ADD_VALUE_ATK', [item, 0, 0, this.BasicTooltipProp]);
  }
  $BasicTooltipProp$ReinforcedCost(value?: number): Observable<number> {
    if (value == 0) return of(0);

    let reinforce = value != undefined ? value : this.Reinforce_2;
    let fromItem = Object.assign(this.toJSON(), { Reinforce_2: reinforce - 1 });
    let moruItem = {};

    return LUAService.INSTANCE.call('GET_REINFORCE_PRICE', [fromItem, moruItem]);
  }
  $BasicTooltipProp$Transcended(value?: number): Observable<ITOSItemEquipmentV2$BasicTooltipProp$Transcended[]> {
    let transcend = value != undefined ? value : this.Transcend;
    let item = Object.assign(this.toJSON(), { Transcend: transcend });

    // ui.ipf/uiscp/lib_itemtooltip.lua > SET_TRANSCEND_TEXT
    return LUAService.INSTANCE.call('GET_ITEM_TRANSCENDED_PROPERTY', [item])
      .pipe(map(value => {
        let propNames = value[0] as string[];
        let propValues = value[1] as number[];
        let result = [];

        for (let i = 0; i < propNames.length; i ++) {
          let propName = propNames[i];
          let propValue = propValues[i];

          result.push({
            label: `${ propName }TranscendBy{Count}`,
            value: `${ propValue }%`,
          })
        }

        return result;
      }));
  }
  $BasicTooltipProp$TranscendedCost(value?: number): Observable<number> {
    if (value == 0) return of(0);

    let transcend = value != undefined ? value : this.Transcend;
    let item = Object.assign(this.toJSON(), { Transcend: transcend - 1 });

    // addon.ipf/itemtranscend/itemtranscend.lua > GET_TRANSCEND_MAXCOUNT
    return LUAService.INSTANCE.call('GET_TRANSCEND_MATERIAL_COUNT', [item]);
  }

  $Model(http: HttpClient): Observable<string> { return };

  $Reinforce_2$Update(value: number) { this.$Reinforce_2$Subject.next(this.Reinforce_2 = value) }
  $Transcend$Update(value: number) { this.$Transcend$Subject.next(this.Transcend = value) }

}
