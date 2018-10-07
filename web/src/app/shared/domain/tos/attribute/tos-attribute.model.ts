import {TOSEntity, TOSEntityLink} from "../entity/tos-entity.model";
import {TOSBuild} from "../tos-build";

export class TOSAttribute extends TOSEntity {
  readonly DescriptionHTML: string;
  readonly IsToggleable: boolean;
  readonly LevelMax: number;
  readonly Unlock: string[];
  readonly UpgradePrice: number[];
  readonly UpgradeTime: number[];

  readonly Link_Jobs: TOSEntityLink[];
  readonly Link_Skill: TOSEntityLink;

  constructor(json: TOSAttribute) {
    super(json);

    this.DescriptionHTML = this.Description.replace(/{b}(.+){b}/g, '<b>$1</b>');
    this.DescriptionHTML = this.DescriptionHTML.replace(/{nl}/g, '\n');
    this.Description = null;

    this.IsToggleable = (json.IsToggleable + '') == 'True';
    this.LevelMax = +json.LevelMax;
    this.Unlock = json.Unlock
      ? JSON.parse(json.Unlock + '')
      : null;
    this.UpgradePrice = json.UpgradePrice
      ? JSON.parse(json.UpgradePrice + '')
      : null;
    this.UpgradeTime = json.UpgradeTime
      ? JSON.parse(json.UpgradeTime + '')
      : null;

    this.Link_Jobs = json.Link_Jobs
      ? JSON
        .parse(json.Link_Jobs + '')
        .map(json => new TOSEntityLink(json))
      : null;
    this.Link_Skill = json.Link_Skill ? new TOSEntityLink(json.Link_Skill) : null;
  }

  unlockAvailable(build: TOSBuild): boolean {
    // Prepare JobGrade and Skill
    let unlock = this.Unlock.map(line => {
      let regexJobGrade = /GetJobGrade\((.+)\)/g;
      let regexSkill = /GetSkill\((.+)\)/g;
      let match: RegExpExecArray;

      while (match = regexJobGrade.exec(line))
        line = line.replace(match[0], build.jobCircle(+match[1]) + '');
      while (match = regexSkill.exec(line))
        line = line.replace(match[0], JSON.stringify({ LevelByDB: build.skillLevel(+match[1]) }));

      line = line.replace('GetTotalJobCount(pc)', build.Rank + '');

      return line;
    });

    let func: string[] = [];
    func.push('(function () {');
    func = func.concat(unlock);
    func.push('}())');

    return eval(func.join('\n')) == 'UNLOCK';
    /*
    return build.attributeUnlockAvailable(
      this.Link_UnlockJob
        ? this.Link_UnlockJob.map(value => { return { $ID: value.Job.$ID, Circle: value.Level } })
        : null,
      this.Link_UnlockSkill
        ? { $ID: this.Link_UnlockSkill.Skill.$ID, Level: this.Link_UnlockSkill.Level }
        : null
    );
    */
  }

}
