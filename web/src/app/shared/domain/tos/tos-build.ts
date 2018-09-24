import {TOSJob, TOSJobTree} from "./job/tos-job.model";
import {BehaviorSubject, Observable} from "rxjs";
import {TOSSkill} from "./skill/tos-skill.model";
import {EventEmitter} from "@angular/core";
import {TOSEntity} from "./entity/tos-entity.model";
import {TOSAttribute} from "./attribute/tos-attribute.model";
import {SkillSimulatorService} from "../../../skill-simulator/skill-simulator.service";
import {logging} from "selenium-webdriver";

const RANK_LIMIT: number = 10; // TODO: find a way to retrieve this value from the game files
const SKILL_POINTS_PER_CIRCLE: number = 15; // TODO: find a way to retrieve this value from the game files

export interface TOSBuild {

  attributeUnlockAvailable(jobs?: { $ID: number, Circle: number }[], skill?: { $ID: number, Level: number }): boolean;
  skillLevel(skill: TOSSkill): number;
  skillLevels(job: { $ID: number }): Observable<{ [key: number]: number }>;
  tooltipSkillEffect(skill: TOSSkill): string;

}

export interface TOSBuildEncoded {
  jobs: string[],
  skills: { [key: number]: number },
}

export interface TOSBuildStats {
  CON: number,
  DEX: number,
  INT: number,
  SPR: number,
  STR: number,
}

export class TOSSimulatorBuild implements TOSBuild {
  public readonly Change: EventEmitter<void> = new EventEmitter();
  public readonly Tooltip: EventEmitter<TOSEntity> = new EventEmitter();

  private readonly jobs: BehaviorSubject<TOSJob[]> = new BehaviorSubject([]);
  private jobTree: TOSJobTree;

  private readonly skills: { [key: number]: TOSSkill } = {};
  private readonly skillLevelsByJob: { [key: number]: BehaviorSubject<{ [key: number]: number }> } = {};
  private readonly skillPointsByJob: { [key: number]: BehaviorSubject<number> } = {};

  private readonly stats: TOSBuildStats = { CON: 0,
    DEX: 0,
    INT: 0,
    SPR: 0,
    STR: 0,
  };

  private tooltipAttribute: TOSAttribute;
  private tooltipSkill: TOSSkill;

  get Jobs(): Observable<TOSJob[]> { return this.jobs.asObservable(); }
  get JobTree(): TOSJobTree { return this.jobTree; }
  get Rank(): number {
    return this.jobs.getValue().length;
  }

  attributeUnlockAvailable(jobs?: { $ID: number, Circle: number }[], skill?: { $ID: number, Level: number }): boolean {
    if (jobs)
      for (let job of jobs)
        if (this.jobCircle(job) >= job.Circle)
          return true;

    if (skill)
      for (let skillLevels of Object.values(this.skillLevelsByJob).map(value => value.getValue()))
        if ((skillLevels[skill.$ID] || -1) >= skill.Level)
          return true;

    return !jobs && !skill;
  }

  static base64Decode(text: string, skillSimulatorService: SkillSimulatorService): TOSSimulatorBuild {
    let build: TOSSimulatorBuild = new TOSSimulatorBuild();
    let encoded: TOSBuildEncoded = JSON.parse(atob(text));

    encoded.jobs.forEach(value => {
      let job = skillSimulatorService.JobsByClassName[value];
      build.jobAdd(job, skillSimulatorService.SkillsByJob[job.$ID]);
    });
    Object.entries(encoded.skills).forEach(value => build.skillIncrementLevel(skillSimulatorService.Skills[value[0]], value[1]));

    return build;
  }
  static base64Encode(build: TOSSimulatorBuild): string {
    let jobs = build.jobs.getValue().map(value => value.$ID_NAME);
    let skills = Object.values(build.skillLevelsByJob)
      .reduce((accumulator, value) => accumulator.concat(value.getValue()), [])
      .reduce((accumulator, value) => {
        Object.entries(value)
          .filter(value1 => value1[1] > 0)
          .forEach(value1 => accumulator[value1[0]] = value1[1]);

        return accumulator
      }, {});

    return jobs.length
      ? btoa(JSON.stringify({ jobs, skills }))
      : '';
  }

  jobAdd(job: TOSJob, skills: TOSSkill[]): void {
    skills.forEach(value => this.skills[value.$ID] = value);

    if (this.Rank >= RANK_LIMIT)
      throw new Error('Rank limit of ' + RANK_LIMIT + ' has been reached');

    // If it's rank 1, set the JobTree and the default stats
    if (this.Rank + 1 == 1) {
      this.jobTree = job.JobTree;
      this.stats.CON = job.Stat_CON;
      this.stats.DEX = job.Stat_DEX;
      this.stats.INT = job.Stat_INT;
      this.stats.SPR = job.Stat_SPR;
      this.stats.STR = job.Stat_STR;
    }

    // Initialize skill levels & points
    this.rankResetSkillPoints(job, this.jobCircle(job) + 1);
    this.rankResetSkillLevels(job);

    // Propagate update
    let jobs = this.jobs.getValue();
        jobs.push(job);

    this.jobs.next(jobs);
    this.Change.emit();
  }
  jobCircle(job: { $ID: number }): number {
    return this.jobs.getValue().filter(value => value.$ID == job.$ID).length;
  }
  jobRanks(job: TOSJob): number[] {
    return this.jobs.getValue().reduce((accumulator, value, index) => {
      if (value.$ID == job.$ID) accumulator.push(index + 1);
      return accumulator;
    }, []);
  }
  jobRemove(rank: number): void {
    let jobs = this.jobs.getValue();

    // Remove associated skills and skillPoints
    for (let r = jobs.length - 1; r >= rank - 1; r --) {
      let job = jobs[r];
      let circle = this.jobCircle(job);

      // Update circle
      this.jobs.next(jobs.slice(0, r));

      if (circle == 1) {
        delete this.skillLevelsByJob[job.$ID];
        delete this.skillPointsByJob[job.$ID];
      } else {

        // Reset skill levels & points
        this.rankResetSkillPoints(job, this.jobCircle(job));
        this.rankResetSkillLevels(job);
      }
    }

    this.Change.emit();
  }
  jobUnlockAvailable(job: TOSJob) : boolean {
    return 1==1
      && this.Rank + 1 <= RANK_LIMIT
      && this.Rank + 1 >= job.Rank
      && this.jobCircle(job) < job.CircleMax;
  }

  skillIncrementLevel(skill: TOSSkill, delta: number, rollOver?: boolean) {
    let skillLevels = this.skillLevelsByJob[skill.Link_Job.$ID].getValue();
    let skillPoints = this.skillPointsByJob[skill.Link_Job.$ID].getValue();

    if (!this.skillIncrementLevelAvailable(skill, delta)) {
      let level = skillLevels[skill.$ID];
      let levelMax = this.skillLevelMax(skill);

      if (rollOver && level == 0)
        delta = Math.min(levelMax, skillPoints);
      else if (rollOver && level == levelMax)
        delta = -level;
      else
        throw new Error("Can't increment " + skill.$ID_NAME + "'s level or it gets out of bounds");
    }

    // Update skill level
    skillLevels[skill.$ID] += delta;
    this.skillLevelsByJob[skill.Link_Job.$ID].next(skillLevels);

    // Update skill points
    skillPoints -= delta;
    this.skillPointsByJob[skill.Link_Job.$ID].next(skillPoints);

    this.Change.emit();
  }
  skillIncrementLevelAvailable(skill: TOSSkill, delta: number): boolean {
    let skillPoints = this.skillPointsByJob[skill.Link_Job.$ID].getValue();
    let skillLevels = this.skillLevelsByJob[skill.Link_Job.$ID].getValue()[skill.$ID];

    return 1==1
      && skillPoints - delta >= 0
      && skillLevels + delta >= 0
      && skillLevels + delta <=  skill.LevelMax(this.jobCircle(skill.Link_Job));
  }
  skillLevel(skill: TOSSkill): number {
    return this.skillLevelsByJob[skill.Link_Job.$ID].getValue()[skill.$ID];
  }
  skillLevels(job: { $ID: number }): Observable<{ [key: number]: number }> {
    return this.skillLevelsByJob[job.$ID].asObservable();
  }
  skillLevelMax(skill: TOSSkill): number {
    return skill.LevelMax(this.jobCircle(skill.Link_Job));
  }
  skillPoints(job: { $ID: number }): Observable<number> {
    return this.skillPointsByJob[job.$ID].asObservable();
  }

  private rankResetSkillLevels(job: TOSJob): void {
    let skillLevels = this.skillLevelsByJob[job.$ID]
      ? this.skillLevelsByJob[job.$ID].getValue()
      : null;

    // Reset skill levels
    this.skillLevelsByJob[job.$ID] = this.skillLevelsByJob[job.$ID] || new BehaviorSubject<{ [key: number]: number }>({});
    this.skillLevelsByJob[job.$ID].next(
      job.Link_Skills.reduce((accumulator, value) => {
        accumulator[value.$ID] = 0;
        return accumulator;
      }, {})
    );

    // Restore previous skill levels
    if (skillLevels)
      Object.entries(skillLevels)
        .forEach(value => {
          let delta = value[1];
          let skill = this.skills[value[0]];
          let skillPoints = this.skillPointsByJob[job.$ID].getValue();

          if (delta) {
            if (this.skillIncrementLevelAvailable(skill, delta))
              this.skillIncrementLevel(skill, delta);
            else
              this.skillIncrementLevel(skill, Math.min(this.skillLevelMax(skill), skillPoints));
          }
        });
  }
  private rankResetSkillPoints(job: TOSJob, circle: number): void {
    this.skillPointsByJob[job.$ID] = this.skillPointsByJob[job.$ID] || new BehaviorSubject<number>(0);
    this.skillPointsByJob[job.$ID].next(SKILL_POINTS_PER_CIRCLE * circle);
  }

  tooltipSkillEffect(skill: TOSSkill): string {
    return skill.Effect(this.skillLevel(skill), this.stats);
  }
  tooltipSkillShow(skill: TOSSkill, show: boolean): void {
    this.tooltipSkill = show ? skill : null;
    this.Tooltip.emit(this.tooltipSkill);
  }

  tooltipAttributeShow(attribute: TOSAttribute, show: boolean) {
    this.tooltipAttribute = show ? attribute : null;
    this.Tooltip.emit(this.tooltipAttribute || this.tooltipSkill);
  }

}
