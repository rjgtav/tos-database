import {TOSDataItemTranscend} from "./tos-item-transcend";
import {TOSItemType} from "../item/tos-item.model";
import {TOSEquipment, TOSEquipmentType} from "../item/equipment/tos-equipment.model";
import {TOSDataItemGrade} from "./tos-item-grade";

abstract class Equipment {

  // shared.ipf/script/item_calculate.lua :: GET_REINFORCE_ADD_VALUE_ATK
  static AnvilATK(equipment: TOSEquipment, level: number): number {
    if (level == 0)
      return 0;

    let lv = equipment.Level;
    let grade = TOSDataItemGrade.get(equipment.Grade);

    let reinforceValue = level;
    let reinforceRatio = equipment.ReinforceRatio;

    let value = Math.floor((reinforceValue + (lv * (reinforceValue * (0.08 + (Math.floor((Math.min(21,reinforceValue)-1)/5) * 0.015 )))))) * grade.AnvilRatio;

    return Math.floor(value * reinforceRatio)
  }

  // shared.ipf/script/item_calculate.lua :: GET_REINFORCE_ADD_VALUE
  static AnvilDEF(equipment: TOSEquipment, level: number): number {
    if (level == 0)
      return 0;

    let lv = equipment.Level;
    let grade = TOSDataItemGrade.get(equipment.Grade);

    let reinforceValue = level;
    let reinforceRatio = equipment.ReinforceRatio;

    let typeRatio = 0;

    if ([TOSEquipmentType.TOP, TOSEquipmentType.BOTTOM, TOSEquipmentType.SHIELD].indexOf(equipment.TypeEquipment) > -1)
      typeRatio = 3.5;
    else if ([TOSEquipmentType.GLOVES, TOSEquipmentType.SHOES].indexOf(equipment.TypeEquipment) > -1)
      typeRatio = 4.5;
    else if (TOSEquipmentType.NECKLACE == equipment.TypeEquipment)
      typeRatio = 5.5;
    else if (TOSEquipmentType.BRACELET == equipment.TypeEquipment)
      typeRatio = 11;
    else
      return 0;

    let value = [TOSEquipmentType.NECKLACE, TOSEquipmentType.BRACELET].indexOf(equipment.TypeEquipment) > -1
      ? Math.floor((reinforceValue + (lv * (reinforceValue * (0.08 + (Math.floor((Math.min(21,reinforceValue)-1)/5) * 0.015 )))) / typeRatio)) * grade.AnvilRatio
      : Math.floor((reinforceValue + (lv * (reinforceValue * (0.12 + (Math.floor((Math.min(21,reinforceValue)-1)/5) * 0.0225 )))) / typeRatio)) *1.25* grade.AnvilRatio;

    return Math.floor(value * reinforceRatio)
  }

  // shared.ipf/script/lib_reinforce_131014.lua :: GET_REINFORCE_PRICE
  static AnvilSilver(equipment: TOSEquipment, level: number): number {
    if (level == 0)
      return 0;

    let lv = equipment.Level;
    let grade = TOSDataItemGrade.get(equipment.Grade);

    let reinforceCount = level - 1;
    let priceRatio = 1;

    if (TOSItemType.SUBWEAPON == equipment.Type) {
      priceRatio = 0.8;
    } else if (TOSEquipmentType.SHIELD == equipment.TypeEquipment) {
      priceRatio = 0.66;
    } else if (TOSEquipmentType.NECKLACE == equipment.TypeEquipment || TOSEquipmentType.BRACELET == equipment.TypeEquipment) {
      priceRatio = 0.5;
    } else if (TOSItemType.WEAPON == equipment.Type) {
      priceRatio = equipment.isType2HWeapon() ? 1.2 : 1;
    } else if (TOSItemType.ARMOR == equipment.Type) {
      priceRatio = 0.75;
    } else {
      return 0;
    }


    return Math.floor(Math.floor((500 + (Math.pow(lv, 1.1) * (5 + (reinforceCount * 2.5)))) * (2 + (Math.max(0, reinforceCount - 9) * 0.5))) * priceRatio * grade.AnvilRatioCost);
  }

  static TranscendATKRatio(level: number): number { return level ? TOSDataItemTranscend.get(level).ATKRatio : 0; }
  static TranscendMDEFRatio(level: number): number { return level ? TOSDataItemTranscend.get(level).MDEFRatio : 0; }
  static TranscendPDEFRatio(level: number): number { return level ? TOSDataItemTranscend.get(level).PDEFRatio : 0; }

  // shared.ipf/script/item_transcend_shared.lua :: GET_TRANSCEND_MATERIAL_COUNT
  static TranscendMaterial(equipment: TOSEquipment, level: number): number {
    if (level == 0)
      return 0;

    let lv = equipment.Level;
    let grade = TOSDataItemGrade.get(equipment.Grade);
    let equipTypeRatio = 0;
    let transcendCount = level - 1; // current transcendence level

    if (equipment.isTypeFashion())
      return 0;

    if (equipment.isType1HWeapon())
      equipTypeRatio = 0.8;
    else if (equipment.isType2HWeapon())
      equipTypeRatio = 1;
    else if (TOSItemType.SUBWEAPON == equipment.Type)
      equipTypeRatio = 0.6;
    else if (TOSItemType.ARMOR == equipment.Type || TOSEquipmentType.SHIELD == equipment.TypeEquipment)
      equipTypeRatio = 0.33;
    else
      return 0;

    return Math.floor(((1 + (transcendCount + Math.pow(lv, (0.2 + ((Math.floor(transcendCount / 3) * 0.03)) + (transcendCount * 0.05)))) * equipTypeRatio) * grade.TranscendRatioCost)* 0.5);
  }

}

export abstract class TOSDataService {

  static Equipment = Equipment

}
