import {TOSEntity} from "../tos-entity.model";
import {ITOSAttribute, ITOSAttributeUnlockArg, ITOSBuild, ITOSJob, ITOSSkill, TOSDataSet} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";
import {LUAService} from "../../../service/lua.service";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

export class TOSAttribute extends TOSEntity implements ITOSAttribute {

  constructor(json: TOSAttribute) {
    super(TOSDataSet.ATTRIBUTES, json);
  }

  get DescriptionRequired() { return this.$lazyPropertyStringMultiline('DescriptionRequired', value => '<br/>' + value) }
  get IsToggleable() { return this.$lazyPropertyBoolean('IsToggleable') }
  get LevelMax() { return this.$lazyPropertyNumber('LevelMax') }
  get Unlock() { return this.$lazyPropertyJSONArray('Unlock') as string[] }
  get UnlockArgs() { return this.$lazyPropertyJSONObject('UnlockArgs', value => new TOSAttributeUnlockArg(value)) }
  get UpgradePrice() { return this.$lazyPropertyJSONArray('UpgradePrice') as number[] }

  get Link_Jobs() { return this.$lazyPropertyLink('Link_Jobs', (value) => TOSDomainService.jobsById(value)) as Observable<ITOSJob[]> }
  get Link_Skills() { return this.$lazyPropertyLink('Link_Skills', (value) => TOSDomainService.skillsById(value)) as Observable<ITOSSkill[]> }

  public Price(level: number) { return level > 0 && this.UpgradePrice ? this.UpgradePrice[level - 1] : 0 }
  public PriceTotal(level: number) { return Array.from({length: level + 1}, (x,i) => this.Price(i)).reduce((a, b) => a + b, 0) }

  unlockAvailable(build: ITOSBuild) {
    return fromPromise((async () => {
      if (!this.Unlock)  return true;

      for (let unlockArg of Object.values(this.UnlockArgs)) {
        let source = this.Unlock;
        let context = {
          'abilIES': null,
          'abilName': "'" + unlockArg.UnlockArgStr + "'",
          'jobName': "'" + unlockArg.UnlockArgStr + "'",
          'jobClassName': "'" + unlockArg.UnlockArgStr + "'",
          'sklName': "'" + unlockArg.UnlockArgStr + "'",
          'levelFix': unlockArg.UnlockArgNum,
          'limitLevel': unlockArg.UnlockArgNum,
          'limitRank': unlockArg.UnlockArgNum,
          'player': {
            'JobName': "'" + unlockArg.UnlockArgStr + "'",
          }
        };

        let unlock = (await LUAService.eval(build, source, context).toPromise());
        if (unlock === 'UNLOCK')
          return true;
      }

      return false;
    })());
  }
  unlockAvailableCheck(args: string[]): boolean {
    if (this.UnlockArgs != null)
      for (let attributeUnlock of Object.values(this.UnlockArgs))
        for (let value of args)
          if (value == attributeUnlock.UnlockArgStr)
            return true;

    return false;
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
