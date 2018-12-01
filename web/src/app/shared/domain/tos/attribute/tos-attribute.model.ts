import {TOSEntity} from "../tos-entity.model";
import {ITOSAttribute, ITOSAttributeUnlockArg, ITOSBuild, TOSDataSet} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";
import {LUAService} from "../../../service/lua.service";

export class TOSAttribute extends TOSEntity implements ITOSAttribute {

  constructor(json: TOSAttribute) {
    super(TOSDataSet.ATTRIBUTES, json);

    this.unlockAvailable = this.unlockAvailable.bind(this);
  }

  get DescriptionRequired() { return this.$lazyPropertyStringMultiline('DescriptionRequired', value => '<br/>' + value) }
  get IsToggleable() { return this.$lazyPropertyBoolean('IsToggleable') }
  get LevelMax() { return this.$lazyPropertyNumber('LevelMax') }
  get Unlock() { return this.$lazyPropertyJSONArray('Unlock') as string[] }
  get UnlockArgs() { return this.$lazyPropertyJSONObject('UnlockArgs', value => new TOSAttributeUnlockArg(value)) }
  get UpgradePrice() { return this.$lazyPropertyJSONArray('UpgradePrice') as number[] }

  get Link_Jobs() {
    return this.$lazyPropertyJSONArray('Link_Jobs', (value) => TOSDomainService.jobsById[value]);
  }
  get Link_Skill() {
    return this.$lazyPropertyLink('Link_Skill', (value) => TOSDomainService.skillsById[value]);
  }

  public Price(level: number) { return level > 0 && this.UpgradePrice ? this.UpgradePrice[level - 1] : 0 }
  public PriceTotal(level: number) { return Array.from({length: level + 1}, (x,i) => this.Price(i)).reduce((a, b) => a + b, 0) }

  unlockAvailable(build: ITOSBuild) {
    if (!this.Unlock)  return true;

    return !!Object
      .values(this.UnlockArgs)
      .find(unlockArg => {
        let source = this.Unlock;
        let context = {
          'abilIES': null,
          'jobName': "'" + unlockArg.UnlockArgStr + "'",
          'sklName': "'" + unlockArg.UnlockArgStr + "'",
          'levelFix': unlockArg.UnlockArgNum,
          'limitLevel': unlockArg.UnlockArgNum,
          'limitRank': unlockArg.UnlockArgNum,
        };

        return LUAService.eval(build, source, context) == 'UNLOCK';
      });
  }

}

export class TOSAttributeUnlockArg implements ITOSAttributeUnlockArg {
  readonly UnlockArgStr: string;
  readonly UnlockArgNum: number;

  constructor(json: TOSAttributeUnlockArg) {
    this.UnlockArgStr = json.UnlockArgStr;
    this.UnlockArgNum = +json.UnlockArgNum;
  }

}
