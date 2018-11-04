import {BehaviorSubject, Observable} from "rxjs";
import {EventEmitter} from "@angular/core";
import {take, tap} from "rxjs/operators";
import {ITOSAttribute, ITOSEntity, ITOSJob, ITOSSkill, TOSJobTree} from "./tos-domain";
import {TOSDomainService} from "./tos-domain.service";

const LEVEL_LIMIT: number = 390;
const RANK_LIMIT: number = 10; // TODO: find a way to retrieve this value from the game files
const SKILL_POINTS_PER_CIRCLE: number = 15; // TODO: find a way to retrieve this value from the game files

export abstract class TOSBuild {

  private readonly jobs: BehaviorSubject<ITOSJob[]> = new BehaviorSubject([]);
  private jobTree: TOSJobTree;

  private readonly skillLevelsByJob: { [key: number]: BehaviorSubject<{ [key: number]: number }> } = {};
  private readonly skillPointsByJob: { [key: number]: BehaviorSubject<number> } = {};

  private readonly stats: TOSBuildStats = { CON: 0, DEX: 0, INT: 0, SPR: 0, STR: 0 };
  private readonly statsBonus: TOSBuildStats = { CON: 0, DEX: 0, INT: 0, SPR: 0, STR: 0 };
  private readonly statsPoints: BehaviorSubject<number> = new BehaviorSubject(0);

  protected constructor() {
    this.rankResetStats();
  }

  static get RankLimit(): number { return RANK_LIMIT; }

  get Jobs(): Observable<ITOSJob[]> { return this.jobs.asObservable(); }
  get JobTree(): TOSJobTree { return this.jobTree; }
  get Rank(): number { return this.jobs.getValue().length; }
  get Stats(): TOSBuildStats {
    return {
      CON: this.stats.CON + this.statsBonus.CON,
      DEX: this.stats.DEX + this.statsBonus.DEX,
      INT: this.stats.INT + this.statsBonus.INT,
      SPR: this.stats.SPR + this.statsBonus.SPR,
      STR: this.stats.STR + this.statsBonus.STR,
    };
  }
  get StatsBase(): TOSBuildStats {
    return {
      CON: this.stats.CON,
      DEX: this.stats.DEX,
      INT: this.stats.INT,
      SPR: this.stats.SPR,
      STR: this.stats.STR,
    };
  }
  get StatsBonus(): TOSBuildStats {
    return {
      CON: this.statsBonus.CON,
      DEX: this.statsBonus.DEX,
      INT: this.statsBonus.INT,
      SPR: this.statsBonus.SPR,
      STR: this.statsBonus.STR,
    };
  }
  get StatsPoints(): Observable<number> { return this.statsPoints.asObservable(); }

  jobAdd(job: ITOSJob): void {
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
  }
  jobCircle(job: ITOSJob): number {
    return this.jobs.getValue().filter(value => value.$ID == job.$ID).length;
  }
  jobRanks(job$ID: number): number[] {
    return this.jobs.getValue().reduce((accumulator, value, index) => {
      if (value.$ID == job$ID) accumulator.push(index + 1);
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

    // Reset stats
    if (rank == 1)
      this.rankResetStats();
  }
  jobSkillLevels(job: ITOSJob): Observable<{ [key: number]: number }> {
    return this.skillLevelsByJob[job.$ID].asObservable();
  }

  skillEffect(skill: ITOSSkill, showFactors: boolean): string {
    return skill.Effect(this.skillLevel(skill), this.Stats, showFactors);
  }
  skillEffectFormula(skill: ITOSSkill, prop: string): string {
    return skill.EffectFormula(this.skillLevel(skill), prop, this.Stats);
  }
  skillLevel(skill: ITOSSkill): number {
    return this.skillLevelsByJob[skill.Link_Job.$ID].getValue()[skill.$ID];
  }
  skillLevelIncrement(skill: ITOSSkill, delta: number, rollOver?: boolean) {
    if (!this.skillLevelsByJob[skill.Link_Job.$ID] || !this.skillPointsByJob[skill.Link_Job.$ID])
      return;

    let skillLevels = this.skillLevelsByJob[skill.Link_Job.$ID].getValue();
    let skillPoints = this.skillPointsByJob[skill.Link_Job.$ID].getValue();

    if (!this.skillLevelIncrementAvailable(skill, delta)) {
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
  }
  skillLevelIncrementAvailable(skill: ITOSSkill, delta: number): boolean {
    if (!this.skillLevelsByJob[skill.Link_Job.$ID] || !this.skillPointsByJob[skill.Link_Job.$ID])
      return false;

    let skillPoints = this.skillPointsByJob[skill.Link_Job.$ID].getValue();
    let skillLevels = this.skillLevelsByJob[skill.Link_Job.$ID].getValue()[skill.$ID];

    return 1==1
      && skillPoints - delta >= 0
      && skillLevels + delta >= 0
      && skillLevels + delta <=  skill.LevelMax(this.jobCircle(skill.Link_Job));
  }
  skillLevelMax(skill: ITOSSkill): number {
    return skill.LevelMax(this.jobCircle(skill.Link_Job));
  }
  skillPoints(job: { $ID: number }): Observable<number> {
    return this.skillPointsByJob[job.$ID].asObservable();
  }

  statIncrementLevel(stat: string, delta: number) {
    if (this.statsBonus[stat] == undefined)
      throw new Error("Can't increment unknown '" + stat + "' stat");
    if (!this.statIncrementLevelAvailable(stat, delta))
      throw new Error("Can't increment " + stat + "'s level or it gets out of bounds");

    let statsPoints = this.statsPoints.getValue();
    statsPoints -= delta;

    this.statsBonus[stat] += delta;
    this.statsPoints.next(statsPoints);
  }
  statIncrementLevelAvailable(stat: string, delta: number) {
    let statsPoints = this.statsPoints.getValue();

    return 1==1
      //&& statsPoints - delta >= 0 // TODO: Until we implement the full simulator with equipment, this will have no cap
      && this.statsBonus[stat] + delta <= 9999
      && this.statsBonus[stat] + delta >= 0;
  }

  private rankResetStats(): void {
    this.stats.CON = this.stats.DEX = this.stats.INT = this.stats.SPR = this.stats.STR = 0;
    this.statsBonus.CON = this.statsBonus.DEX = this.statsBonus.INT = this.statsBonus.SPR = this.statsBonus.STR = 0;

    // Bonus stat points:
    // + 390 - 1 > Level limit
    // + 40 > Hidden & Revelation Quests
    // + 12 > Zemyna Statues
    // More info: https://forum.treeofsavior.com/t/extra-stat-point-quests-guide/390257
    this.statsPoints.next(LEVEL_LIMIT - 1 + 40 + 12);
  }
  private rankResetSkillLevels(job: ITOSJob): void {
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
          let skill = TOSDomainService.skillsById[+value[0]];
          let skillPoints = this.skillPointsByJob[job.$ID].getValue();

          if (delta) {
            if (this.skillLevelIncrementAvailable(skill, delta))
              this.skillLevelIncrement(skill, delta);
            else
              this.skillLevelIncrement(skill, Math.min(this.skillLevelMax(skill), skillPoints));
          }
        });
  }
  private rankResetSkillPoints(job: ITOSJob, circle: number): void {
    this.skillPointsByJob[job.$ID] = this.skillPointsByJob[job.$ID] || new BehaviorSubject<number>(0);
    this.skillPointsByJob[job.$ID].next(SKILL_POINTS_PER_CIRCLE * circle);
  }

}

export interface TOSBuildEncoded {
  jobs: string[],
  skills: { [key: number]: number },
  stats: TOSBuildStats,
}

export interface TOSBuildStats {
  CON: number,
  DEX: number,
  INT: number,
  SPR: number,
  STR: number,
}

export class TOSDatabaseBuild extends TOSBuild {

  constructor() { super() }

}

export class TOSSimulatorBuild extends TOSBuild {
  public readonly Change: EventEmitter<void> = new EventEmitter();
  public readonly Tooltip: EventEmitter<ITOSEntity> = new EventEmitter();

  private tooltipAttribute: ITOSAttribute;
  private tooltipJob: ITOSJob;
  private tooltipSkill: ITOSSkill;

  static base64Decode(text: string): TOSSimulatorBuild {
    let build: TOSSimulatorBuild = new TOSSimulatorBuild();
    let encoded: TOSBuildEncoded = JSON.parse(atob(text));

    encoded.jobs.forEach(value => {
      let job = TOSDomainService.jobsByIdName[value];
      build.jobAdd(job)
    });
    Object.entries(encoded.skills || {})
      .filter(value => TOSDomainService.skillsById[+value[0]])
      .forEach(value => build.skillLevelIncrement(TOSDomainService.skillsById[+value[0]], value[1]));
    Object.entries(encoded.stats || {}).forEach(value => build.statIncrementLevel(value[0], value[1]));

    return build;
  }
  static base64Encode(build: TOSSimulatorBuild): string {
    let jobs = [];
    let skills = {};

    build.Jobs.pipe(
      take(1),
      tap(value => jobs = value.map(job => job.$ID_NAME))
    ).subscribe();

    jobs
      .map(value => TOSDomainService.jobsByIdName[value])
      .forEach(value => value.Link_Skills
        .filter(skill => build.skillLevel(skill) > 0)
        .forEach(skill => skills[skill.$ID] = build.skillLevel(skill))
      );

    return jobs.length
      ? btoa(JSON.stringify({ jobs, skills, stats: build.StatsBonus }))
      : '';
  }

  constructor() { super() }

  jobAdd(job: ITOSJob): void {
    super.jobAdd(job);
    this.Change.emit();
  }
  jobRemove(rank: number): void {
    super.jobRemove(rank);
    this.Change.emit();
  }

  skillLevelIncrement(skill: ITOSSkill, delta: number, rollOver?: boolean) {
    super.skillLevelIncrement(skill, delta, rollOver);
    this.Change.emit();
  }

  statIncrementLevel(stat: string, delta: number) {
    super.statIncrementLevel(stat, delta);
    this.Change.emit();
  }

  tooltipAttributeShow(attribute: ITOSAttribute, show: boolean) {
    this.tooltipAttribute = show ? attribute : null;
    this.Tooltip.emit(this.tooltipAttribute || this.tooltipSkill || this.tooltipJob);
  }
  tooltipJobShow(job: ITOSJob, show: boolean) {
    this.tooltipJob = show ? job : null;
    this.Tooltip.emit(this.tooltipAttribute || this.tooltipSkill || this.tooltipJob);
  }
  tooltipSkillShow(skill: ITOSSkill, show: boolean): void {
    this.tooltipSkill = show ? skill : null;
    this.Tooltip.emit(this.tooltipAttribute || this.tooltipSkill || this.tooltipJob);
  }

}
