import {TOSEntity} from "../tos-entity.model";
import {TOSBuild} from "../tos-build";
import {ITOSAttribute, ITOSJob, ITOSSkill, TOSDataSet, TOSJobDifficulty, TOSJobTree, TOSJobType} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";

export class TOSJob extends TOSEntity implements ITOSJob {
  private link_Attributes: ITOSAttribute[];
  private link_Skills: ITOSSkill[];

  readonly CircleMax: number;
  readonly JobDifficulty: TOSJobDifficulty;
  readonly JobTree: TOSJobTree;
  readonly JobType: TOSJobType[];
  readonly IsHidden: boolean;
  readonly IsSecret: boolean;
  readonly Rank: number;
  readonly Stat_CON: number;
  readonly Stat_DEX: number;
  readonly Stat_INT: number;
  readonly Stat_SPR: number;
  readonly Stat_STR: number;


  constructor(private json: TOSJob) {
    super(TOSDataSet.JOBS, json);

    this.CircleMax = +json.CircleMax;
    this.JobDifficulty = Object.values(TOSJobDifficulty)[+json.JobDifficulty];
    this.JobTree = Object.values(TOSJobTree)[+json.JobTree];
    this.JobType = json.JobType ?
      JSON
        .parse(json.JobType + '')
        .map(json => Object.values(TOSJobType)[+json])
        .sort()
      : null;
    this.IsHidden = (json.IsHidden + '') == 'True';
    this.IsSecret = (json.IsSecret + '') == 'True';
    this.Rank = +json.Rank;
    this.Stat_CON = +json.Stat_CON;
    this.Stat_DEX = +json.Stat_DEX;
    this.Stat_INT = +json.Stat_INT;
    this.Stat_SPR = +json.Stat_SPR;
    this.Stat_STR = +json.Stat_STR;
  }

  get Link_Attributes(): ITOSAttribute[] {
    return this.link_Attributes = this.link_Attributes
      ? this.link_Attributes
      : this.json.Link_Attributes
        ? JSON
          .parse(this.json.Link_Attributes + '')
          .map(value => TOSDomainService.attributesById[value])
        : null;
  }

  get Link_Skills(): ITOSSkill[] {
    return this.link_Skills = this.link_Skills
      ? this.link_Skills
      : this.json.Link_Skills
        ? JSON
          .parse(this.json.Link_Skills + '')
          .map(value => TOSDomainService.skillsById[value])
        : null;
  }

  get CircleAvailable(): number[] {
    return Array.from(Array(this.CircleMax).keys(), n => n + 1)
  }

  get IconAnimations(): string[] {
    if (this.Rank > TOSBuild.RankLimit)
        return null;

    return [
      'assets/images/classes/' + this.$ID_NAME + '_f.gif',
      'assets/images/classes/' + this.$ID_NAME + '_m.gif',
    ];
  }

  unlockAvailable(build: TOSBuild): boolean {
    let extra = true;

    if (this.$ID_NAME == 'Char4_12') // Chaplain
      extra = build.jobCircle(TOSDomainService.jobsById[4002]) >= 3; // Priest

    return 1==1
      && extra
      && build.Rank + 1 <= TOSBuild.RankLimit
      && build.Rank + 1 >= this.Rank
      && build.jobCircle(this) < this.CircleMax;
  }

}
