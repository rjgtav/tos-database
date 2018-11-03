import {TOSEntity} from "../entity/tos-entity.model";
import {TOSBuild} from "../tos-build";
import {TOSRepositoryService} from "../tos-repository.service";
import {TOSAttribute} from "../attribute/tos-attribute.model";
import {TOSSkill} from "../skill/tos-skill.model";

export class TOSJob extends TOSEntity {
  private link_Attributes: TOSAttribute[];
  private link_Skills: TOSSkill[];

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
    super(json, 'classes');

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

  get Link_Attributes(): TOSAttribute[] {
    return this.link_Attributes = this.link_Attributes
      ? this.link_Attributes
      : this.json.Link_Attributes
        ? JSON
          .parse(this.json.Link_Attributes + '')
          .map(value => TOSRepositoryService.findAttributesById(value))
        : null;
  }

  get Link_Skills(): TOSSkill[] {
    return this.link_Skills = this.link_Skills
      ? this.link_Skills
      : this.json.Link_Skills
        ? JSON
          .parse(this.json.Link_Skills + '')
          .map(value => TOSRepositoryService.findSkillsById(value))
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
      extra = build.jobCircle(TOSRepositoryService.findJobsById(4002)) >= 3; // Priest

    return 1==1
      && extra
      && build.Rank + 1 <= TOSBuild.RankLimit
      && build.Rank + 1 >= this.Rank
      && build.jobCircle(this) < this.CircleMax;
  }

}

export enum  TOSJobDifficulty {
  EASY = 'Easy',
  HARD = 'Hard',
  NORMAL = 'Normal',
}

export enum TOSJobTree {
  ARCHER = 'Archer',
  CLERIC = 'Cleric',
  WARRIOR = 'Warrior',
  WIZARD = 'Wizard',
}

export enum TOSJobType {
  ATTACK = 'Attack',
  ATTACK_INSTALL = 'Attack with Installations',
  ATTACK_MANEUVERING = 'Attack with Mobility',
  ATTACK_SUMMON = 'Attack with Summons',
  CRAFTING = 'Crafting',
  DEFENSE = 'Defense',
  DEFENSE_PROVOKE = 'Defense with Provoke',
  SUPPORT = 'Support',
  SUPPORT_CONTROL = 'Support with Control',
  SUPPORT_PARTY = 'Support with Party',
}
