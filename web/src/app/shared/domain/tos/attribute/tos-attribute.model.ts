import {TOSEntity} from "../entity/tos-entity.model";
import {TOSBuild} from "../tos-build";
import {TOSJob} from "../job/tos-job.model";
import {TOSSkill} from "../skill/tos-skill.model";
import {TOSRepositoryService} from "../tos-repository.service";

export class TOSAttribute extends TOSEntity {
  private link_Jobs: TOSJob[];
  private link_Skill: TOSSkill;

  readonly DescriptionHTML: string;
  readonly IsToggleable: boolean;
  readonly LevelMax: number;
  readonly Unlock: string[];
  readonly UpgradePrice: number[];
  readonly UpgradeTime: number[];

  constructor(private json: TOSAttribute) {
    super(json, 'attributes');

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

  unlockAvailable(build: TOSBuild): boolean {
    // Prepare JobGrade and Skill
    let unlock = this.Unlock.map(line => {
      let regexJobGrade = /GetJobGrade\((.+)\)/g;
      let regexSkill = /GetSkill\((.+)\)/g;
      let match: RegExpExecArray;

      while (match = regexJobGrade.exec(line)) {
        let job = TOSRepositoryService.findJobsById(+match[1]);
        line = line.replace(match[0], build.jobCircle(job) + '');
      }
      while (match = regexSkill.exec(line)) {
        let skill = TOSRepositoryService.findSkillsById(+match[1]);
        line = line.replace(match[0], JSON.stringify({ LevelByDB: build.skillLevel(skill) }));
      }

      line = line.replace('GetTotalJobCount(pc)', build.Rank + '');

      return line;
    });

    let func: string[] = [];
    func.push('(function () {');
    func = func.concat(unlock);
    func.push('}())');

    return eval(func.join('\n')) == 'UNLOCK';
  }

}
