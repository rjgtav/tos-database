import {TOSDataItemTranscend} from "./tos-item-transcend";

abstract class Equipment {

  static TranscendATKRatio(level: number): number { return level ? TOSDataItemTranscend.get(level).ATKRatio : 0; }
  static TranscendMDEFRatio(level: number): number { return level ? TOSDataItemTranscend.get(level).MDEFRatio : 0; }
  static TranscendPDEFRatio(level: number): number { return level ? TOSDataItemTranscend.get(level).PDEFRatio : 0; }

}

export abstract class TOSDataService {

  static Equipment = Equipment

}
