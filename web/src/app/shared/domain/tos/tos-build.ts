import {TOSJob, TOSJobTree} from "./job/tos-job.model";
import {BehaviorSubject, Observable} from "rxjs";
import {TOSSkill} from "./skill/tos-skill.model";
import {EventEmitter} from "@angular/core";
import {TOSEntity} from "./entity/tos-entity.model";
import {TOSAttribute} from "./attribute/tos-attribute.model";
import {SkillSimulatorService} from "../../../skill-simulator/skill-simulator.service";

const RANK_LIMIT: number = 10; // TODO: find a way to retrieve this value from the game files
const SKILL_PER_CIRCLE: number = 15; // TODO: find a way to retrieve this value from the game files

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

    encoded.jobs.forEach(value => build.jobAdd(skillSimulatorService.JobsByClassName[value]));
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

  jobAdd(job: TOSJob): void {
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
    this.skillLevelsByJob[job.$ID] =  this.skillLevelsByJob[job.$ID] || new BehaviorSubject<{ [key: number]: number }>(
      job.Link_Skills.reduce((accumulator, value) => {
        accumulator[value.$ID] = 0;
        return accumulator;
      }, {})
    );

    this.skillPointsByJob[job.$ID] = this.skillPointsByJob[job.$ID] || new BehaviorSubject<number>(SKILL_PER_CIRCLE);
    this.skillPointsByJob[job.$ID].next(SKILL_PER_CIRCLE * (this.jobCircle(job) + 1));

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
    jobs.slice(rank).forEach(value => {
      delete this.skillLevelsByJob[value.$ID];
      delete this.skillPointsByJob[value.$ID];
    });

    this.jobs.next(jobs.slice(0, rank - 1));
    this.Change.emit();
  }
  jobUnlockAvailable(job: TOSJob) : boolean {
    return 1==1
      && this.Rank + 1 <= RANK_LIMIT
      && this.Rank + 1 >= job.Rank
      && this.jobCircle(job) < job.CircleMax;
  }

  skillIncrementLevel(skill: TOSSkill, delta: number) {
    if (!this.skillIncrementLevelAvailable(skill, delta))
      throw new Error("Can't increment " + skill.$ID_NAME + "'s level or it gets out of bounds");

    // Increment level
    let skillLevels = this.skillLevelsByJob[skill.Link_Job.$ID].getValue();
        skillLevels[skill.$ID] += delta;

    this.skillLevelsByJob[skill.Link_Job.$ID].next(skillLevels);

    // Update skill points
    let skillPoints = this.skillPointsByJob[skill.Link_Job.$ID].getValue();
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
