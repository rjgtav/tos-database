import {TOSEquipmentGrade} from "../item/equipment/tos-equipment.model";

export class TOSDataItemGrade {
  AnvilRatio: number;
  AnvilRatioCost: number;
  TranscendRatioCost: number;

  private static values: { [key: number]: TOSDataItemGrade } = {
    // python-start
    2: { AnvilRatio: 1.00, AnvilRatioCost: 3.00, TranscendRatioCost: 1.00 },
    1: { AnvilRatio: 1.20, AnvilRatioCost: 4.00, TranscendRatioCost: 1.10 },
    3: { AnvilRatio: 1.50, AnvilRatioCost: 5.00, TranscendRatioCost: 1.15 },
    4: { AnvilRatio: 2.00, AnvilRatioCost: 6.00, TranscendRatioCost: 1.25 },
    0: { AnvilRatio: 2.50, AnvilRatioCost: 7.00, TranscendRatioCost: 1.40 },
    // python-end
  };

  static get(grade: TOSEquipmentGrade) {
    return this.values[Object.values(TOSEquipmentGrade).indexOf(grade)];
  }

}

