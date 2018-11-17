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
  TOSEquipmentMaterial,
  TOSEquipmentType,
  TOSStat
} from "../../tos-domain";
import {TOSDomainService} from "../../tos-domain.service";

export class TOSEquipment extends TOSItem implements ITOSEquipment {
  private readonly anvilATK: number[];
  private readonly anvilDEF: number[];
  private readonly anvilPrice: number[];
  private readonly requiredClass: string;
  private readonly transcendPrice: number[];

  private link_Set: ITOSEquipmentSet;

  readonly Bonus: TOSEquipmentBonus[];
  readonly Durability: number;
  readonly Grade: TOSEquipmentGrade;
  readonly Level: number;
  readonly Material: TOSEquipmentMaterial;
  readonly Potential: number;
  readonly RequiredLevel: number;
  readonly Sockets: number;
  readonly SocketsLimit: number;
  readonly Stars: number;
  readonly Stat_ATTACK_MAGICAL: number;
  readonly Stat_ATTACK_PHYSICAL_MAX: number;
  readonly Stat_ATTACK_PHYSICAL_MIN: number;
  readonly Stat_DEFENSE_MAGICAL: number;
  readonly Stat_DEFENSE_PHYSICAL: number;
  readonly TypeAttack: TOSAttackType;
  readonly TypeEquipment: TOSEquipmentType;
  readonly Unidentified: boolean;
  readonly UnidentifiedRandom: boolean;

  constructor(json: TOSEquipment) {
    super(TOSDataSet.EQUIPMENT, json);

    this.$comparators['Grade'] = TOSEquipmentGrade.comparator;

    this.anvilATK = json['AnvilATK']
      ? JSON.parse(json['AnvilATK'] + '')
      : null;
    this.anvilDEF = json['AnvilDEF']
      ? JSON.parse(json['AnvilDEF'] + '')
      : null;
    this.anvilPrice = json['AnvilPrice']
      ? JSON.parse(json['AnvilPrice'] + '')
      : null;
    this.Bonus = json.Bonus
      ? JSON
        .parse(json.Bonus + '')
        .map(json => new TOSEquipmentBonus(json))
        //.sort((a, b) => TOSStat.comparator(a.Stat, b.Stat))
      : null;
    this.Durability = +json.Durability;
    this.Grade = Object.values(TOSEquipmentGrade)[+json.Grade];
    this.Level = +json.Level;
    this.Material = Object.values(TOSEquipmentMaterial)[+json.Material];
    this.Potential = +json.Potential;
    this.requiredClass = json['RequiredClass'];
    this.RequiredLevel = +json.RequiredLevel;
    this.Sockets = +json.Sockets;
    this.SocketsLimit = +json.SocketsLimit;
    this.Stars = +json.Stars;
    this.Stat_ATTACK_MAGICAL = +json.Stat_ATTACK_MAGICAL;
    this.Stat_ATTACK_PHYSICAL_MAX = +json.Stat_ATTACK_PHYSICAL_MAX;
    this.Stat_ATTACK_PHYSICAL_MIN = +json.Stat_ATTACK_PHYSICAL_MIN;
    this.Stat_DEFENSE_MAGICAL = +json.Stat_DEFENSE_MAGICAL;
    this.Stat_DEFENSE_PHYSICAL = +json.Stat_DEFENSE_PHYSICAL;
    this.transcendPrice = json['TranscendPrice']
      ? JSON.parse(json['TranscendPrice'] + '')
      : null;
    this.TypeAttack = Object.values(TOSAttackType)[+json.TypeAttack];
    this.TypeEquipment = Object.values(TOSEquipmentType)[+json.TypeEquipment];
    this.Unidentified = (json.Unidentified + '') == 'True';
    this.UnidentifiedRandom = (json.UnidentifiedRandom + '') == 'True';
  }

  get Link_Set(): ITOSEquipmentSet {
    return this.link_Set = this.link_Set
      ? this.link_Set
      : (this.json as TOSEquipment).Link_Set
        ? TOSDomainService.equipmentSetsById[+(this.json as TOSEquipment).Link_Set]
        : null;
  }

  get IsAnvilAvailable(): boolean {
    return (this.AnvilATK(1) > 0 || this.AnvilDEF(1) > 0) && this.AnvilPrice(1) > 0;
  }
  get IsTranscendAvailable(): boolean {
    return this.TranscendPrice(1) > 0;
  }
  IsUsableBy(classTree: TOSClassTree): boolean {
    let index = Object.values(TOSClassTree).indexOf(classTree);
    return this.requiredClass[index] == '1';
  }

  AnvilATK(level: number) { return level > 0 && this.anvilATK ? this.anvilATK[level - 1] : 0 }
  AnvilDEF(level: number) { return level > 0 && this.anvilDEF ? this.anvilDEF[level - 1] : 0 }
  AnvilPrice(level: number) { return level > 0 && this.anvilPrice ? this.anvilPrice[level - 1] : 0 }
  AnvilPriceTotal(level: number) { return Array.from({length: level + 1}, (x, i) => this.AnvilPrice(i)).reduce((a, b) => a + b, 0) }

  TranscendATKRatio(level: number) { return level * 0.1; }
  TranscendMDEFRatio(level: number) { return level * 0.1; }
  TranscendPDEFRatio(level: number) { return level * 0.1; }
  TranscendPrice(level: number) { return level > 0 && this.transcendPrice ? this.transcendPrice[level - 1] : 0 }
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
  private readonly bonus2: string;
  private readonly bonus3: string;
  private readonly bonus4: string;
  private readonly bonus5: string;
  private readonly bonus6: string;
  private readonly bonus7: string;
  private link_Items: TOSItem[];

  constructor(private json: TOSEquipmentSet) {
    super(TOSDataSet.EQUIPMENT_SETS, json);

    this.bonus2 = json['Bonus2'];
    this.bonus3 = json['Bonus3'];
    this.bonus4 = json['Bonus4'];
    this.bonus5 = json['Bonus5'];
    this.bonus6 = json['Bonus6'];
    this.bonus7 = json['Bonus7'];
  }

  get Icon(): string { return this.Link_Items[0].Icon }
  get Url(): string { return this.Link_Items[0].Url; }

  get Link_Items(): ITOSItem[] {
    return this.link_Items = this.link_Items
      ? this.link_Items
      : (this.json as TOSEquipmentSet).Link_Items
        ? JSON
          .parse((this.json as TOSEquipmentSet).Link_Items + '')
          .map(value => TOSDomainService.itemsByIdLink(value))
          .filter(value => value != null)
        : null;
  }

  get Bonus(): { [key:number]: TOSEquipmentBonus[]} {
    return [this.bonus2, this.bonus3, this.bonus4, this.bonus5, this.bonus6, this.bonus7]
      .map(bonusGroup => (bonusGroup || '')
        .split('{nl}')
        .map(bonus => bonus ? new TOSEquipmentBonus([TOSStat.UNKNOWN.toString(), bonus]) : null)
        .filter(bonus => bonus))
      .reduce((result, bonusGroup, i) => {
        if (bonusGroup.length) result[i + 2] = bonusGroup;
        return result;
      }, {});
  }

}
