import {TOSEntity} from "../entity/tos-entity.model";
import {TOSBuild} from "../tos-build";
import {TOSJob} from "../job/tos-job.model";
import {TOSSkill} from "../skill/tos-skill.model";
import {TOSRepositoryService} from "../tos-repository.service";

export class TOSAttribute extends TOSEntity {
  private link_Jobs: TOSJob[];
  private link_Skill: TOSSkill;

  readonly DescriptionRequiredHTML: string;
  readonly DescriptionHTML: string;
  readonly IsToggleable: boolean;
  readonly LevelMax: number;
  readonly Unlock: string[];
  readonly UnlockArgs: { [key: number]: TOSAttributeUnlockArg };
  readonly UpgradePrice: number[];

  constructor(private json: TOSAttribute) {
    super(json, 'attributes');

    this.DescriptionHTML = this.Description.replace(/{nl}/g, '\n');
    this.DescriptionRequiredHTML = json['DescriptionRequired'] || '';
    this.DescriptionRequiredHTML = this.DescriptionRequiredHTML.replace(/{nl}/g, '\n');
    this.DescriptionRequiredHTML = this.DescriptionRequiredHTML.replace(/{b}(.+){b}/g, '<b>$1</b>');
    this.Description = null;

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

  get Link_Jobs(): TOSJob[] {
    return this.link_Jobs = this.link_Jobs
      ? this.link_Jobs
      : this.json.Link_Jobs
        ? JSON
          .parse(this.json.Link_Jobs + '')
          .map(value => TOSRepositoryService.findJobsById(value))
        : null;
  }

  get Link_Skill(): TOSSkill {
    return this.link_Skill = this.link_Skill
      ? this.link_Skill
      : this.json.Link_Skill
          ? TOSRepositoryService.findSkillsById(+this.json.Link_Skill)
          : null;
  }

  public Price(level: number) { return this.UpgradePrice[level]; }
  public PriceTotal(level: number) { return Array.from({length: level + 1}, (x,i) => this.Price(i)).reduce((a, b) => a + b, 0) }

  unlockAvailable(build: TOSBuild): boolean {
    // Prepare JobGrade and Skill
    return Object
      .values(this.UnlockArgs)
      .find(unlockArg => {
        let unlock = this.Unlock.map(line => {
          let regexJobGrade = /GetJobGradeByName\(pc, ['"](.+)['"]\)/g;
          let regexSkill = /GetSkill\(pc, ['"](.+)['"]\)/g;
          let match: RegExpExecArray;

          line = line.replace('jobName', "'" + unlockArg.UnlockArgStr + "'");
          line = line.replace('limitLevel', unlockArg.UnlockArgNum + '');
          line = line.replace('sklName', "'" + unlockArg.UnlockArgStr + "'");
          line = line.replace('GetTotalJobCount(pc)', build.Rank + '');

          while (match = regexJobGrade.exec(line)) {
            let job = TOSRepositoryService.findJobsByIdName(match[1]);
            line = line.replace(match[0], build.jobCircle(job) + '');
          }
          while (match = regexSkill.exec(line)) {
            let skill = TOSRepositoryService.findSkillsByIdName(match[1]);
            line = line.replace(match[0], JSON.stringify({ LevelByDB: build.skillLevel(skill) }));
          }

          return line;
        });

        let func: string[] = [];
        func.push('(function () {');
        func = func.concat(unlock);
        func.push('}())');

        return eval(func.join('\n')) == 'UNLOCK';
      }) != null;
  }

}

export class TOSAttributeUnlockArg {
  readonly UnlockArgStr: string;
  readonly UnlockArgNum: number;

  constructor(json: TOSAttributeUnlockArg) {
    this.UnlockArgStr = json.UnlockArgStr;
    this.UnlockArgNum = +json.UnlockArgNum;
  }

}
