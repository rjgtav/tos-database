import {TOSEntity} from "../tos-entity.model";
import {ITOSAttribute, ITOSAttributeUnlockArg, ITOSBuild, ITOSJob, ITOSSkill, TOSDataSet} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";
import {LUAService} from "../../../service/lua.service";

export class TOSAttribute extends TOSEntity implements ITOSAttribute {
  private description: string;
  private descriptionRequired: string;
  private link_Jobs: ITOSJob[];
  private link_Skill: ITOSSkill;

  readonly IsToggleable: boolean;
  readonly LevelMax: number;
  readonly Unlock: string[];
  readonly UnlockArgs: { [key: number]: TOSAttributeUnlockArg };
  readonly UpgradePrice: number[];

  constructor(private json: TOSAttribute) {
    super(TOSDataSet.ATTRIBUTES, json);

    this.IsToggleable = (json.IsToggleable + '') == 'True';
    this.LevelMax = +json.LevelMax;
    this.Unlock = json.Unlock
      ? JSON.parse(json.Unlock + '')
      : null;
    this.UnlockArgs = json.UnlockArgs
      ? Object.entries(JSON.parse(json.UnlockArgs + ''))
        .reduce((accumulator, value) => {
          accumulator[value[0]] = value[1];
          return accumulator;
        }, {})
      : null;
    this.UpgradePrice = json.UpgradePrice
      ? JSON
        .parse(json.UpgradePrice + '')
        .map(value => +value)
      : null;

    this.unlockAvailable = this.unlockAvailable.bind(this);
  }

  get Description(): string {
    return this.description = this.description
      ? this.description
      : this.json.Description.replace(/{nl}/g, '\n');
  }
  get DescriptionRequired(): string {
    return this.descriptionRequired = this.descriptionRequired
      ? this.descriptionRequired
      : this.json.DescriptionRequired.replace(/{nl}/g, '\n').replace(/{b}?(.*){b}/g, '<b>$1</b>');
  }

  get Link_Jobs(): ITOSJob[] {
    return this.link_Jobs = this.link_Jobs
      ? this.link_Jobs
      : this.json.Link_Jobs
        ? JSON
          .parse(this.json.Link_Jobs + '')
          .map(value => TOSDomainService.jobsById[value])
        : null;
  }

  get Link_Skill(): ITOSSkill {
    return this.link_Skill = this.link_Skill
      ? this.link_Skill
      : this.json.Link_Skill
          ? TOSDomainService.skillsById[+this.json.Link_Skill]
          : null;
  }

  public Price(level: number) { return level > 0 ? this.UpgradePrice[level - 1] : 0; }
  public PriceTotal(level: number) { return Array.from({length: level + 1}, (x,i) => this.Price(i)).reduce((a, b) => a + b, 0) }

  unlockAvailable(build: ITOSBuild): boolean {
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
