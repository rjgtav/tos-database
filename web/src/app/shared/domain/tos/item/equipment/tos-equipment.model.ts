import {TOSEntity} from "../../tos-entity.model";
import {TOSItem} from "../tos-item.model";
import {
  ITOSEquipment,
  ITOSEquipmentBonus,
  ITOSEquipmentSet,
  ITOSItem,
  TOSAttackType,
  TOSClassTree,
  TOSDataSet,
  TOSEquipmentGrade,
  TOSEquipmentGradeService,
  TOSEquipmentMaterial,
  TOSEquipmentType,
  TOSStat,
  TOSStatService
} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export class TOSEquipment extends TOSItem implements ITOSEquipment {
  constructor(json: TOSEquipment) {
    super(TOSDataSet.EQUIPMENT, json);

    this.$comparators['Grade'] = TOSEquipmentGradeService.comparator;
  }

  get Bonus() { return this.$lazyPropertyJSONArray('Bonus', value => new TOSEquipmentBonus(value), (a, b) => TOSStatService.comparator(a.Stat, b.Stat)) }
  get Durability() { return this.$lazyPropertyNumber('Durability') }
  get Grade() { return this.$lazyPropertyEnum('Grade', TOSEquipmentGrade) }

  get IsAnvilAvailable(): boolean { return (this.AnvilATK(1) > 0 || this.AnvilDEF(1) > 0) && this.AnvilPrice(1) > 0; }
  get IsTranscendAvailable(): boolean { return this.TranscendPrice(1) > 0; }

  get Link_Set() { return this.$lazyPropertyLink('Link_Set', value => TOSDomainService.equipmentSetsById(value)) as Observable<ITOSEquipmentSet> }

  get Level() { return this.$lazyPropertyNumber('Level') }
  get Material() { return this.$lazyPropertyEnum('Material', TOSEquipmentMaterial) }
  get Potential() { return this.$lazyPropertyNumber('Potential') }
  get RequiredClass() { return this.$lazyPropertyString('RequiredClass') }
  get RequiredLevel() { return this.$lazyPropertyNumber('RequiredLevel') }
  get Sockets() { return this.$lazyPropertyNumber('Sockets') }
  get SocketsLimit() { return this.$lazyPropertyNumber('SocketsLimit') }
  get Stars() { return this.$lazyPropertyNumber('Stars') }
  get Stat_ATTACK_MAGICAL() { return this.$lazyPropertyNumber('Stat_ATTACK_MAGICAL') }
  get Stat_ATTACK_PHYSICAL_MAX() { return this.$lazyPropertyNumber('Stat_ATTACK_PHYSICAL_MAX') }
  get Stat_ATTACK_PHYSICAL_MIN() { return this.$lazyPropertyNumber('Stat_ATTACK_PHYSICAL_MIN') }
  get Stat_DEFENSE_MAGICAL() { return this.$lazyPropertyNumber('Stat_DEFENSE_MAGICAL') }
  get Stat_DEFENSE_PHYSICAL() { return this.$lazyPropertyNumber('Stat_DEFENSE_PHYSICAL') }
  get TypeAttack() { return this.$lazyPropertyEnum('TypeAttack', TOSAttackType) }
  get TypeEquipment() { return this.$lazyPropertyEnum('TypeEquipment', TOSEquipmentType) }
  get Unidentified() { return this.$lazyPropertyBoolean('Unidentified') }
  get UnidentifiedRandom() { return this.$lazyPropertyBoolean('UnidentifiedRandom') }

  IsUsableBy(classTree: TOSClassTree): boolean {
    let index = Object.values(TOSClassTree).indexOf(classTree);
    return this.RequiredClass[index] == '1';
  }

  AnvilATK(level: number) {
    let anvilATK = this.$lazyPropertyJSONArray('AnvilATK') as number[];
    return level > 0 && anvilATK && anvilATK[level - 1] || 0;
  }
  AnvilDEF(level: number) {
    let anvilDEF = this.$lazyPropertyJSONArray('AnvilDEF') as number[];
    return level > 0 && anvilDEF && anvilDEF[level - 1] || 0;
  }
  AnvilPrice(level: number) {
    let anvilPrice = this.$lazyPropertyJSONArray('AnvilPrice') as number[];
    return level > 0 && anvilPrice && anvilPrice[level - 1] || 0;
  }
  AnvilPriceTotal(level: number) {
    return Array.from({length: level + 1}, (x, i) => this.AnvilPrice(i)).reduce((a, b) => a + b, 0)
  }

  TranscendATKRatio(level: number) { return level * 0.1; }
  TranscendMDEFRatio(level: number) { return level * 0.1; }
  TranscendPDEFRatio(level: number) { return level * 0.1; }
  TranscendPrice(level: number) {
    let transcendPrice = this.$lazyPropertyJSONArray('TranscendPrice') as number[];
    return level > 0 && transcendPrice && transcendPrice[level - 1] || 0;
  }
  TranscendPriceTotal(level: number) {
    for (var sum = 0, i = 1; i <= level; i ++)
      sum += this.TranscendPrice(i);

    return sum;
  }

}

export class TOSEquipmentBonus implements ITOSEquipmentBonus {
  Stat: TOSStat;
  Value: number;
  ValueHTML: string;

  constructor(json: string[]) {
    this.Stat = Object.values(TOSStat)[+json[0]];
    this.Value = isNaN(+json[1]) ? null : +json[1];
    this.ValueHTML = isNaN(+json[1]) ? json[1] : null;

    // HotFix: add special bonus' arrows
    if (this.ValueHTML) {
      this.ValueHTML = this.ValueHTML.split('{img green_up_arrow 16 16}').join('<span class="text-success">▲</span> ');
      this.ValueHTML = this.ValueHTML.split('{img red_down_arrow 16 16}').join('<span class="text-danger">▼</span> ');
    }
  }
}

// Note: we can't put this one on a separate class otherwise it generates a circular dependency
export class TOSEquipmentSet extends TOSEntity implements ITOSEquipmentSet {

  constructor(private json: TOSEquipmentSet) {
    super(TOSDataSet.EQUIPMENT_SETS, json);
  }

  get Bonus(): { [key:number]: TOSEquipmentBonus[]} {
    return [this.Bonus2, this.Bonus3, this.Bonus4, this.Bonus5, this.Bonus6, this.Bonus7]
      .map(bonusGroup => (bonusGroup || '')
        .split('{nl}')
        .map(bonus => bonus ? new TOSEquipmentBonus([TOSStat.UNKNOWN.toString(), bonus]) : null)
        .filter(bonus => bonus))
      .reduce((result, bonusGroup, i) => {
        if (bonusGroup.length) result[i + 2] = bonusGroup;
        return result;
      }, {});
  }
  get Bonus2() { return this.$lazyPropertyString('Bonus2') }
  get Bonus3() { return this.$lazyPropertyString('Bonus3') }
  get Bonus4() { return this.$lazyPropertyString('Bonus4') }
  get Bonus5() { return this.$lazyPropertyString('Bonus5') }
  get Bonus6() { return this.$lazyPropertyString('Bonus6') }
  get Bonus7() { return this.$lazyPropertyString('Bonus7') }
  get Icon():string { throw new Error('Unsupported operation') }
  get Icon$() { return this.Link_Items.pipe(map(value => value && value[0].Icon)) }
  get Url(): string { throw new Error('Unsupported operation') }
  get Url$() { return this.Link_Items.pipe(map(value => value && value[0].Url)) }

  get Link_Items() { return this.$lazyPropertyLink('Link_Items', value => TOSDomainService.itemsByIdLink(value)) as Observable<ITOSItem[]> }

}
