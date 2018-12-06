import {BehaviorSubject, Observable} from "rxjs";
import {EventEmitter} from "@angular/core";
import {take, tap} from "rxjs/operators";
import {
  ITOSAttribute,
  ITOSBuild,
  ITOSBuildEncoded,
  ITOSBuildStats,
  ITOSEntity,
  ITOSJob,
  ITOSSkill,
  TOSJobTree
} from "./tos-domain";
import {TOSDomainService} from "./tos-domain.service";
import {TOSRegion} from "../tos-region";

export const LEVEL_LIMIT: number = 390;
export const RANK_LIMIT: number = 10; // TODO: find a way to retrieve this value from the game files
const SKILL_POINTS_PER_CIRCLE: number = 15; // TODO: find a way to retrieve this value from the game files

abstract class TOSBuild implements ITOSBuild {

  protected readonly jobs: BehaviorSubject<ITOSJob[]> = new BehaviorSubject([]);
  private jobTree: TOSJobTree;

  private readonly skillLevelsByJob: { [key: number]: BehaviorSubject<{ [key: number]: number }> } = {};
  private readonly skillPointsByJob: { [key: number]: BehaviorSubject<number> } = {};

  private readonly statsPoints: BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly statsBonus: ITOSBuildStats = { CON: 0, DEX: 0, INT: 0, SPR: 0, STR: 0 };

  protected constructor() {
    this.buildResetStats();
  }

  get Jobs(): Observable<ITOSJob[]> { return this.jobs.asObservable(); }
  get JobTree(): TOSJobTree { return this.jobTree; }
  get Rank(): number { return this.jobs.getValue().length; }
  get Stats(): ITOSBuildStats {
    let statsBase = this.StatsBase;
    let statsBonus = this.StatsBonus;

    return {
      CON: statsBase.CON + statsBonus.CON,
      DEX: statsBase.DEX + statsBonus.DEX,
      INT: statsBase.INT + statsBonus.INT,
      SPR: statsBase.SPR + statsBonus.SPR,
      STR: statsBase.STR + statsBonus.STR,
    }
  }
  abstract get StatsBase(): ITOSBuildStats;
  get StatsBonus(): ITOSBuildStats {
    return {
      CON: this.statsBonus.CON,
      DEX: this.statsBonus.DEX,
      INT: this.statsBonus.INT,
      SPR: this.statsBonus.SPR,
      STR: this.statsBonus.STR,
    };
  }
  get StatsPoints(): Observable<number> { return this.statsPoints.asObservable(); }
  abstract get Version(): number;

  jobAdd(job: ITOSJob): void {
    if (this.Rank >= RANK_LIMIT)
      throw new Error('Rank limit of ' + RANK_LIMIT + ' has been reached');

    // If it's rank 1, set the JobTree and the default stats
    if (this.Rank + 1 == 1)
      this.jobTree = job.JobTree;

    // Initialize skill levels & points
    this.buildResetSkillPoints(job);
    this.buildResetSkillLevels(job);

    // Propagate update
    let jobs = this.jobs.getValue();
        jobs.push(job);

    this.jobs.next(jobs);
  }
  jobCircle(job: ITOSJob): number { // TODO: Remove after Re:Build releases globally
    return this.jobs.getValue().filter(value => value.$ID == job.$ID).length;
  }
  abstract jobCircleMax(job: ITOSJob): number;
  jobRanks(job: ITOSJob): number[] { // TODO: Remove after Re:Build releases globally
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
        this.buildResetSkillPoints(job);
        this.buildResetSkillLevels(job);
      }
    }

    // Reset stats
    if (rank == 1)
      this.buildResetStats();
  }
  jobSkillLevels(job: ITOSJob): Observable<{ [key: number]: number }> {
    return this.skillLevelsByJob[job.$ID].asObservable();
  }
  abstract jobUnlockAvailable(job: ITOSJob): boolean;

  skillEffect(skill: ITOSSkill, showFactors: boolean): string {
    return skill.EffectDescription(this, showFactors);
  }
  skillEffectFormula(skill: ITOSSkill, prop: string): string {
    return skill.EffectFormula(prop, this);
  }
  skillLevel(skill: ITOSSkill): number {
    return this.skillLevelsByJob[skill.Link_Job.$ID].getValue()[skill.$ID];
  }
  abstract skillLevelMax(skill: ITOSSkill): number;
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
      else if (rollOver && (level == levelMax || skillPoints == 0))
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
      && skillLevels + delta <=  this.skillLevelMax(skill);
  }
  skillPoints(job: { $ID: number }): Observable<number> {
    return this.skillPointsByJob[job.$ID].asObservable();
  }
  abstract skillPointsMax(job: ITOSJob) : number;
  skillSP(skill: ITOSSkill): number {
    return skill.SPCost(this);
  }

  statsIncrementLevel(stat: string, delta: number) {
    if (this.statsBonus[stat] == undefined)
      throw new Error("Can't increment unknown '" + stat + "' stat");
    if (!this.statsIncrementLevelAvailable(stat, delta))
      throw new Error("Can't increment " + stat + "'s level or it gets out of bounds");

    let statsPoints = this.statsPoints.getValue();
    statsPoints -= delta;

    this.statsBonus[stat] += delta;
    this.statsPoints.next(statsPoints);
  }
  statsIncrementLevelAvailable(stat: string, delta: number): boolean {
    let statsPoints = this.statsPoints.getValue();

    return 1==1
      //&& statsPoints - delta >= 0 // TODO: Until we implement the full simulator with equipment, this will have no cap
      && this.statsBonus[stat] + delta <= 9999
      && this.statsBonus[stat] + delta >= 0;
  }
  abstract statsPointsMax(): number;

  private buildResetSkillLevels(job: ITOSJob): void {
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
      Object
        .entries(skillLevels)
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
  private buildResetSkillPoints(job: ITOSJob): void {
    this.skillPointsByJob[job.$ID] = this.skillPointsByJob[job.$ID] || new BehaviorSubject<number>(0);
    this.skillPointsByJob[job.$ID].next(this.skillPointsMax(job));
  }
  private buildResetStats(): void {
    this.statsBonus.CON = this.statsBonus.DEX = this.statsBonus.INT = this.statsBonus.SPR = this.statsBonus.STR = 0;
    this.statsPoints.next(this.statsPointsMax());
  }

}

class TOSBuild_10 extends TOSBuild {

  private readonly stats: ITOSBuildStats = { CON: 0, DEX: 0, INT: 0, SPR: 0, STR: 0 };

  constructor() { super(); }

  get StatsBase(): ITOSBuildStats {
    return {
      CON: this.stats.CON,
      DEX: this.stats.DEX,
      INT: this.stats.INT,
      SPR: this.stats.SPR,
      STR: this.stats.STR,
    };
  }
  get Version(): number {
    return 1.0;
  }

  jobAdd(job: ITOSJob): void {
    super.jobAdd(job);

    if (this.Rank == 1) {
      this.stats.CON = job.Stat_CON;
      this.stats.DEX = job.Stat_DEX;
      this.stats.INT = job.Stat_INT;
      this.stats.SPR = job.Stat_SPR;
      this.stats.STR = job.Stat_STR;
    }
  }
  jobCircleMax(job: ITOSJob): number {
    return job.CircleMax;
  }

  jobRemove(rank: number): void {
    super.jobRemove(rank);

    // Reset stats
    if (rank == 1)
      this.stats.CON = this.stats.DEX = this.stats.INT = this.stats.SPR = this.stats.STR = 0;
  }
  jobUnlockAvailable(job: ITOSJob): boolean {
    let extra = true;

    if (job.$ID_NAME == 'Char4_12') // Chaplain
      extra = this.jobCircle(TOSDomainService.jobsById[4002]) >= 3; // Priest

    return 1==1
      && extra
      && this.Rank + 1 <= RANK_LIMIT
      && this.Rank + 1 >= job.Rank
      && this.jobCircle(job) < this.jobCircleMax(job);
  }

  skillLevelMax(skill: ITOSSkill): number {
    return skill.LevelMax(this.jobCircle(skill.Link_Job));
  }
  skillPointsMax(job: ITOSJob) : number {
    return SKILL_POINTS_PER_CIRCLE * (this.jobCircle(job) + 1);
  }

  statsPointsMax(): number {
    // Bonus stat points:
    // + 390 - 1 > Level limit
    // + 40 > Hidden & Revelation Quests
    // + 12 > Zemyna Statues
    // More info: https://forum.treeofsavior.com/t/extra-stat-point-quests-guide/390257
    return LEVEL_LIMIT - 1 + 40 + 12;
  }

}

class TOSBuild_20 extends TOSBuild {

  constructor() { super(); }

  get Rank(): number {
    let jobs = this.jobs.getValue();
    return (jobs.length > 0 ? 1 : 0) + Math.max((jobs.length - 1) * 3, 0);
  }
  get Version(): number {
    return 2.0;
  }

  get StatsBase(): ITOSBuildStats {
    let jobs = this.jobs.getValue();
    let jobsStarter = jobs[0];
    let stats = jobs.reduce((previousValue, currentValue) => {
      previousValue.CON += currentValue.Stat_CON;
      previousValue.DEX += currentValue.Stat_DEX;
      previousValue.INT += currentValue.Stat_INT;
      previousValue.SPR += currentValue.Stat_SPR;
      previousValue.STR += currentValue.Stat_STR;

      return previousValue;
    }, { CON: 0, DEX: 0, INT: 0, SPR: 0, STR: 0 });

    return {
      CON: Math.floor((LEVEL_LIMIT - 1) * stats.CON / (jobs.length * 100)) + (jobsStarter ? jobsStarter.StatBase_CON : 0),
      DEX: Math.floor((LEVEL_LIMIT - 1) * stats.DEX / (jobs.length * 100)) + (jobsStarter ? jobsStarter.StatBase_DEX : 0),
      INT: Math.floor((LEVEL_LIMIT - 1) * stats.INT / (jobs.length * 100)) + (jobsStarter ? jobsStarter.StatBase_INT : 0),
      SPR: Math.floor((LEVEL_LIMIT - 1) * stats.SPR / (jobs.length * 100)) + (jobsStarter ? jobsStarter.StatBase_SPR : 0),
      STR: Math.floor((LEVEL_LIMIT - 1) * stats.STR / (jobs.length * 100)) + (jobsStarter ? jobsStarter.StatBase_STR : 0),
    };
  }

  jobCircle(job: ITOSJob): number {
    let jobs = this.jobs.getValue();
    return jobs.indexOf(job) == -1
      ? 0
      : this.jobCircleMax(job);
  }
  jobCircleMax(job: ITOSJob): number {
    return job.Rank == 1 ? 1 : 3;
  }
  jobUnlockAvailable(job: ITOSJob): boolean {
    return 1==1
      && this.Rank + 1 <= RANK_LIMIT
      && this.Rank + 1 >= job.Rank
      && (!job.IsSecret || this.Rank + 1 > 2)
      && this.jobCircle(job) < this.jobCircleMax(job);
  }

  skillLevelMax(skill: ITOSSkill): number {
    return skill.LevelMax();
  }
  skillPointsMax(job: ITOSJob) : number {
    return SKILL_POINTS_PER_CIRCLE * this.jobCircleMax(job);
  }

  statsPointsMax(): number {
    // Bonus stat points:
    // + 40 > Hidden & Revelation Quests
    // + 12 > Zemyna Statues
    // More info: https://forum.treeofsavior.com/t/extra-stat-point-quests-guide/390257
    return 40 + 12;
  }

}

export class TOSDatabaseBuild implements ITOSBuild {

  static new(region: TOSRegion): TOSDatabaseBuild {
    let build = TOSRegion.isRebuild(region)
      ? new TOSBuild_20()
      : new TOSBuild_10();

    return new TOSDatabaseBuild(build);
  }

  private constructor(private build: TOSBuild) {}

  get JobTree(): TOSJobTree { return this.build.JobTree }
  get Jobs(): Observable<ITOSJob[]> { return this.build.Jobs; }
  get Rank(): number { return this.build.Rank; }
  get Stats(): ITOSBuildStats { return this.build.Stats; }
  get StatsBase(): ITOSBuildStats { return this.build.StatsBase; }
  get StatsBonus(): ITOSBuildStats { return this.build.StatsBonus; }
  get StatsPoints(): Observable<number> { return this.build.StatsPoints; }
  get Version(): number { return this.build.Version; }

  jobAdd(job: ITOSJob): void { this.build.jobAdd(job); }
  jobCircle(job: ITOSJob): number { return this.build.jobCircle(job); }
  jobCircleMax(job:ITOSJob): number { return this.build.jobCircleMax(job); }

  jobRanks(job: ITOSJob): number[] { return this.build.jobRanks(job); }
  jobRemove(rank: number): void { this.build.jobRemove(rank); }
  jobSkillLevels(job: ITOSJob): Observable<{ [p: number]: number }> { return this.build.jobSkillLevels(job); }
  jobUnlockAvailable(job: ITOSJob): boolean { return this.build.jobUnlockAvailable(job); }

  skillEffect(skill: ITOSSkill, showFactors: boolean): string { return this.build.skillEffect(skill, showFactors); }
  skillEffectFormula(skill: ITOSSkill, prop: string): string { return this.build.skillEffectFormula(skill, prop); }
  skillLevel(skill: ITOSSkill): number { return this.build.skillLevel(skill); }
  skillLevelIncrement(skill: ITOSSkill, delta: number, rollOver?: boolean): void { this.build.skillLevelIncrement(skill, delta, rollOver); }
  skillLevelIncrementAvailable(skill: ITOSSkill, delta: number): boolean { return this.build.skillLevelIncrementAvailable(skill, delta); }
  skillLevelMax(skill: ITOSSkill): number { return this.build.skillLevelMax(skill); }
  skillPoints(job: ITOSJob): Observable<number> { return this.build.skillPoints(job); }
  skillPointsMax(job: ITOSJob) : number { return this.build.skillPointsMax(job); }
  skillSP(skill: ITOSSkill): number { return this.build.skillSP(skill); }

  statsIncrementLevel(stat: string, delta: number): void { this.build.statsIncrementLevel(stat, delta); }
  statsIncrementLevelAvailable(stat: string, delta: number): boolean { return this.build.statsIncrementLevelAvailable(stat, delta); }
  statsPointsMax(): number { return this.build.statsPointsMax(); }

}

export class TOSSimulatorBuild implements ITOSBuild {
  public readonly Change: EventEmitter<void> = new EventEmitter();
  public readonly Tooltip: EventEmitter<ITOSEntity> = new EventEmitter();

  private tooltipAttribute: ITOSAttribute;
  private tooltipJob: ITOSJob;
  private tooltipSkill: ITOSSkill;

  static base64Decode(region: TOSRegion, text: string): TOSSimulatorBuild {
    let build: TOSSimulatorBuild = TOSSimulatorBuild.new(region);
    let encoded: ITOSBuildEncoded = JSON.parse(atob(text));

    if (build.Version == encoded.version) {
      encoded.jobs.forEach(value => {
        let job = TOSDomainService.jobsByIdName[value];
        build.jobAdd(job)
      });
      Object.entries(encoded.skills || {})
        .filter(value => TOSDomainService.skillsById[+value[0]])
        .forEach(value => build.skillLevelIncrement(TOSDomainService.skillsById[+value[0]], value[1]));
      Object.entries(encoded.stats || {}).forEach(value => build.statsIncrementLevel(value[0], value[1]));
    }

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
      ? btoa(JSON.stringify({ jobs, skills, stats: build.StatsBonus, version: build.Version }))
      : '';
  }

  static new(region: TOSRegion): TOSSimulatorBuild {
    let build = TOSRegion.isRebuild(region)
      ? new TOSBuild_20()
      : new TOSBuild_10();

    return new TOSSimulatorBuild(build);
  }

  private constructor(private build: TOSBuild) {}

  get JobTree(): TOSJobTree { return this.build.JobTree }
  get Jobs(): Observable<ITOSJob[]> { return this.build.Jobs; }
  get Rank(): number { return this.build.Rank; }
  get Stats(): ITOSBuildStats { return this.build.Stats; }
  get StatsBase(): ITOSBuildStats { return this.build.StatsBase; }
  get StatsBonus(): ITOSBuildStats { return this.build.StatsBonus; }
  get StatsPoints(): Observable<number> { return this.build.StatsPoints; }
  get Version(): number { return this.build.Version; }

  jobAdd(job: ITOSJob): void {
    this.build.jobAdd(job);
    this.Change.emit();
  }
  jobCircle(job: ITOSJob): number { return this.build.jobCircle(job); }
  jobCircleMax(job:ITOSJob): number { return this.build.jobCircleMax(job); }
  jobRanks(job: ITOSJob): number[] { return this.build.jobRanks(job); }
  jobRemove(rank: number): void {
    this.build.jobRemove(rank);
    this.Change.emit();
  }
  jobSkillLevels(job: ITOSJob): Observable<{ [p: number]: number }> { return this.build.jobSkillLevels(job); }
  jobUnlockAvailable(job: ITOSJob): boolean { return this.build.jobUnlockAvailable(job); }

  skillEffect(skill: ITOSSkill, showFactors: boolean): string { return this.build.skillEffect(skill, showFactors); }
  skillEffectFormula(skill: ITOSSkill, prop: string): string { return this.build.skillEffectFormula(skill, prop); }
  skillLevel(skill: ITOSSkill): number { return this.build.skillLevel(skill); }
  skillLevelIncrement(skill: ITOSSkill, delta: number, rollOver?: boolean): void {
    this.build.skillLevelIncrement(skill, delta, rollOver);
    this.Change.emit();
  }
  skillLevelIncrementAvailable(skill: ITOSSkill, delta: number): boolean { return this.build.skillLevelIncrementAvailable(skill, delta); }
  skillLevelMax(skill: ITOSSkill): number { return this.build.skillLevelMax(skill); }
  skillPoints(job: ITOSJob): Observable<number> { return this.build.skillPoints(job); }
  skillPointsMax(job: ITOSJob) : number { return this.build.skillPointsMax(job); }
  skillSP(skill: ITOSSkill): number { return this.build.skillSP(skill); }

  statsIncrementLevel(stat: string, delta: number): void {
    this.build.statsIncrementLevel(stat, delta);
    this.Change.emit();
  }
  statsIncrementLevelAvailable(stat: string, delta: number): boolean { return this.build.statsIncrementLevelAvailable(stat, delta); }
  statsPointsMax(): number { return this.build.statsPointsMax(); }

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
