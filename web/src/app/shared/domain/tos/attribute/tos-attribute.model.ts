import {TOSEntity, TOSEntityLink} from "../entity/tos-entity.model";
import {TOSBuild} from "../tos-build";

export class TOSAttribute extends TOSEntity {
  readonly DescriptionHTML: string;
  readonly IsToggleable: boolean;
  readonly LevelMax: number;
  readonly UpgradePrice: number[];
  readonly UpgradeTime: number[];

  readonly Link_Jobs: TOSEntityLink[];
  readonly Link_Skill: TOSEntityLink;
  readonly Link_UnlockJob: TOSAttributeUnlockJobLink[];
  readonly Link_UnlockSkill: TOSAttributeUnlockSkillLink;

  constructor(json: TOSAttribute) {
    super(json);

    this.DescriptionHTML = this.Description.replace(/{b}(.+){b}/g, '<b>$1</b>');
    this.Description = null;

    this.IsToggleable = (json.IsToggleable + '') == 'TRUE';
    this.LevelMax = +json.LevelMax;
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
    this.Link_UnlockJob = json.Link_UnlockJob
      ? JSON
        .parse(json.Link_UnlockJob + '')
        .map(json => new TOSAttributeUnlockJobLink(json))
      : null;
    this.Link_UnlockSkill = json.Link_UnlockSkill ? new TOSAttributeUnlockSkillLink(json.Link_UnlockSkill) : null;
  }

  unlockAvailable(build: TOSBuild): boolean {
    return build.attributeUnlockAvailable(
      this.Link_UnlockJob
        ? this.Link_UnlockJob.map(value => { return { $ID: value.Job.$ID, Circle: value.Level } })
        : null,
      this.Link_UnlockSkill
        ? { $ID: this.Link_UnlockSkill.Skill.$ID, Level: this.Link_UnlockSkill.Level }
        : null
    );
  }

}

export class TOSAttributeUnlockJobLink {
  Job: TOSEntityLink;
  Level: number;

  constructor(json: TOSAttributeUnlockJobLink) {
    json = (typeof json == 'string') ? JSON.parse(json) : json;

    this.Job = new TOSEntityLink(json.Job);
    this.Level = +json.Level;
  }

}

export class TOSAttributeUnlockSkillLink {
  Level: number;
  Skill: TOSEntityLink;

  constructor(json: TOSAttributeUnlockSkillLink) {
    json = (typeof json == 'string') ? JSON.parse(json) : json;

    this.Level = +json.Level;
    this.Skill = new TOSEntityLink(json.Skill);
  }

}

