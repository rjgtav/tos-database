import {TOSEntity, TOSEntityLink} from "../entity/tos-entity.model";

export class TOSJob extends TOSEntity {

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

  Link_Attributes: TOSEntityLink[];
  Link_Skills: TOSEntityLink[];

  constructor(json: TOSJob) {
    super(json);

    this.CircleMax = +json.CircleMax;
    this.JobDifficulty = Object.values(TOSJobDifficulty)[+json.JobDifficulty];
    this.JobTree = Object.values(TOSJobTree)[+json.JobTree];
    this.JobType = json.JobType ?
      JSON
        .parse(json.JobType + '')
        .map(json => Object.values(TOSJobType)[+json])
      : null;
    this.IsHidden = (json.IsHidden + '') == 'True';
    this.IsSecret = (json.IsSecret + '') == 'True';
    this.Rank = +json.Rank;
    this.Stat_CON = +json.Stat_CON;
    this.Stat_DEX = +json.Stat_DEX;
    this.Stat_INT = +json.Stat_INT;
    this.Stat_SPR = +json.Stat_SPR;
    this.Stat_STR = +json.Stat_STR;

    this.Link_Attributes = json.Link_Attributes
      ? JSON
        .parse(json.Link_Attributes + '')
        .map(json => new TOSEntityLink(json))
      : null;
    this.Link_Skills = json.Link_Skills
      ? JSON
        .parse(json.Link_Skills + '')
        .map(json => new TOSEntityLink(json))
      : null;
  }

  get CircleAvailable(): number[] {
    return Array.from(Array(this.CircleMax).keys(), n => n + 1)
  }

  get IconGIFFemale() {
    let name = this.Name == 'Cryomancer' ? 'Cryomancers' : this.Name; // hotfix
    return 'https://treeofsavior.com/img/class/class_character/' + name.split(' ').join('').toLowerCase() + '_f.gif';
  }
  get IconGIFMale() {
    let name = this.Name == 'Cryomancer' ? 'Cryomancers' : this.Name; // hotfix
    return 'https://treeofsavior.com/img/class/class_character/' + name.split(' ').join('').toLowerCase() + '_m.gif';
  }

}

export enum  TOSJobDifficulty {
  EASY = 'Easy',
  NORMAL = 'Normal',
  HARD = 'Hard',
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
