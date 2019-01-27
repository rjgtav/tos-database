import {BehaviorSubject, Observable, of} from "rxjs";
import {EventEmitter} from "@angular/core";
import {map} from "rxjs/operators";
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
import {TOSRegion, TOSRegionService} from "../tos-region";
import {fromPromise} from "rxjs/internal-compatibility";

export const LEVEL_LIMIT: number = 390;
export const RANK_LIMIT: number = 10; // TODO: find a way to retrieve this value from the game files
const SKILL_POINTS_PER_CIRCLE: number = 15; // TODO: find a way to retrieve this value from the game files

abstract class TOSBuild implements ITOSBuild {

  private jobs: ITOSJob[] = [];
  private readonly jobCirclesById: { [key: number]: number } = {};
  private readonly jobChange: BehaviorSubject<ITOSJob> = new BehaviorSubject(null);
  private jobTree: TOSJobTree;

  private readonly skillChange: BehaviorSubject<ITOSSkill> = new BehaviorSubject(null);
  private readonly skillLevelsById: { [key: number]: number } = {};
  private readonly skillPointsByJob: { [key: number]: number } = {};

  private readonly statsPoints: BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly statsBonus: ITOSBuildStats = { CON: 0, DEX: 0, INT: 0, SPR: 0, STR: 0 };

  protected constructor() {
    this.buildResetStats();
  }

  get Job$(): Observable<ITOSJob> { return this.jobChange.asObservable() }
  get Jobs(): ITOSJob[] { return this.jobs }
  get JobTree(): TOSJobTree { return this.jobTree }
  get Rank(): number { return this.jobs.length }
  get Skill$(): Observable<ITOSSkill> { return this.skillChange.asObservable() }
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
  get StatsPoints$(): Observable<number> { return this.statsPoints.asObservable() }
  abstract get Version(): number;

  async jobAdd$(job: ITOSJob): Promise<void> {
    if (this.Rank >= RANK_LIMIT)
      throw new Error('Rank limit of ' + RANK_LIMIT + ' has been reached');

    // If it's rank 1, set the JobTree and the default stats
    if (this.Rank + 1 == 1)
      this.jobTree = job.JobTree;

    // Initialize job circle
    this.jobs.push(job);
    this.jobCirclesById[job.$ID] = this.jobCirclesById[job.$ID] || 0;
    this.jobCirclesById[job.$ID] ++;
    this.jobChange.next(job);

    // Initialize skill levels & points
    this.buildResetSkillPoints(job);
    await this.buildResetSkillLevels$(job);
  }
  jobCircle(job: ITOSJob): number {
    return this.jobCirclesById[job.$ID] || 0;
  }
  abstract jobCircleMax(job: ITOSJob): number;
  jobRanks(job: ITOSJob): number[] {
    return this.jobs.reduce((accumulator, value, index) => {
      if (value.$ID == job.$ID) accumulator.push(index + 1);
      return accumulator;
    }, []);
  }
  async jobRemove$(rank: number): Promise<void> {
    // Remove associated skills and skillPoints$
    for (let r = this.jobs.length - 1; r >= rank - 1; r --) {
      let job = this.jobs[r];
      let circle = await this.jobCircle(job);

      // Update circle
      this.jobs = this.jobs.slice(0, r);
      this.jobCirclesById[job.$ID] --;
      this.jobChange.next(job);

      if (circle == 1) {
        job.Link_Skills$ID.forEach(value => delete this.skillLevelsById[value]);
        delete this.jobCirclesById[job.$ID];
        delete this.skillPointsByJob[job.$ID];
      } else if (circle > 0) {
        // Reset skill levels & points
        this.buildResetSkillPoints(job);
        await this.buildResetSkillLevels$(job);
      }
    }

    // Reset stats
    if (rank == 1)
      this.buildResetStats();
  }
  abstract jobUnlockAvailable$(job: ITOSJob): Observable<boolean>;

  skillEffect$(skill: ITOSSkill, showFactors: boolean): Observable<string> {
    return skill.EffectDescription(this, showFactors);
  }
  skillEffectFormula$(skill: ITOSSkill, prop: string): Observable<string> {
    return skill.EffectFormula(prop, this);
  }
  skillLevel(skill: ITOSSkill): number { return this.skillLevelsById[skill.$ID] }

  abstract skillLevelMax$(skill: ITOSSkill): Observable<number>; // TODO: after Re:Build we can switch from an Observable to a plain number
  async skillLevelIncrement$(skill: ITOSSkill, delta: number, force?: boolean, rollOver?: boolean) {
    let skillLevel = this.skillLevel(skill);
    let skillPoints = this.skillPointsByJob[skill.Link_Job$ID];

    if (!force && !(await this.skillLevelIncrementAvailable$(skill, delta).toPromise())) {
      let levelMax = await this.skillLevelMax$(skill).toPromise();

      if (rollOver && skillLevel == 0)
        delta = Math.min(levelMax, skillPoints);
      else if (rollOver && (skillLevel == levelMax || skillPoints == 0))
        delta = -skillLevel;
      else
        throw new Error("Can't increment " + skill.$ID_NAME + "'s level or it gets out of bounds");
    }

    // Propagate update
    this.skillLevelsById[skill.$ID] += delta;
    this.skillPointsByJob[skill.Link_Job$ID] -= delta;
    this.skillChange.next(skill);
  }
  skillLevelIncrementAvailable$(skill: ITOSSkill, delta: number): Observable<boolean> { // TODO: after Re:Build we can switch from an Observable to a plain boolean
    let skillLevel = this.skillLevelsById[skill.$ID];
    let skillPoints = this.skillPointsByJob[skill.Link_Job$ID];

    return fromPromise((async () => 1==1
      && skillPoints - delta >= 0
      && skillLevel + delta >= 0
      && skillLevel + delta <= await this.skillLevelMax$(skill).toPromise()
    )());
  }
  skillPoints(job: { $ID: number }): number { return this.skillPointsByJob[job.$ID] }
  skillPointsMax(job: ITOSJob) : number { return SKILL_POINTS_PER_CIRCLE * this.jobCircle(job) }
  skillSP$(skill: ITOSSkill): Observable<number> { return skill.BuildSP(this) }

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

  private async buildResetSkillLevels$(job: ITOSJob) {
    let skillLevels: { [key: number]: number } = {};

    // Reset skill levels
    job.Link_Skills$ID.forEach(value => {
      skillLevels[value] = this.skillLevelsById[value];
      this.skillLevelsById[value] = 0;
    });

    // Restore previous skill levels
    for (let skill$ID in skillLevels) {
      let delta = skillLevels[skill$ID];
      let skill = await TOSDomainService.skillsById(+skill$ID).toPromise();
      let skillPoints = this.skillPointsByJob[job.$ID];

      if (delta > 0) {
        if (this.skillLevelIncrementAvailable$(skill, delta))
          await this.skillLevelIncrement$(skill, delta);
        else
          await this.skillLevelIncrement$(skill, Math.min(await this.skillLevelMax$(skill).toPromise(), skillPoints));
      }

      this.skillChange.next(skill);
    }
  }
  private buildResetSkillPoints(job: ITOSJob) {
    this.skillPointsByJob[job.$ID] = this.skillPointsMax(job);
  }
  private buildResetStats(): void {
    this.statsBonus.CON = this.statsBonus.DEX = this.statsBonus.INT = this.statsBonus.SPR = this.statsBonus.STR = 0;
    this.statsPoints.next(this.statsPointsMax());
  }

}

class TOSBuild_10 extends TOSBuild {

  private readonly stats: ITOSBuildStats = { CON: 0, DEX: 0, INT: 0, SPR: 0, STR: 0 };

  constructor() { super() }

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

  async jobAdd$(job: ITOSJob): Promise<void> {
    if (this.Rank + 1== 1) {
      this.stats.CON = job.Stat_CON;
      this.stats.DEX = job.Stat_DEX;
      this.stats.INT = job.Stat_INT;
      this.stats.SPR = job.Stat_SPR;
      this.stats.STR = job.Stat_STR;
    }

    await super.jobAdd$(job);
  }
  jobCircleMax(job: ITOSJob): number {
    return job.CircleMax;
  }

  jobUnlockAvailable$(job: ITOSJob): Observable<boolean> {
    return fromPromise((async () => {
      let extra = true;

      if (job.$ID_NAME == 'Char4_12') // Chaplain
        extra = this.jobCircle(await TOSDomainService.jobsById(4002).toPromise()) >= 3; // Priest

      return 1==1
        && extra
        && this.Rank + 1 <= RANK_LIMIT
        && this.Rank + 1 >= job.Rank
        && this.jobCircle(job) < this.jobCircleMax(job);
    })());
  }

  skillLevelMax$(skill: ITOSSkill): Observable<number> {
    // Taken from shared.ipf/script/skilltree_condition.lua :: GET_SKILLTREE_MAXLV
    return skill.Link_Job.pipe(map(value => {
      let classLv = this.jobCircle(value);
      let ret = (classLv - skill.Prop_UnlockGrade + 1) * skill.Prop_LevelPerGrade;

      return Math.min(ret, skill.Prop_MaxLevel);
    }));
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

  constructor() { super() }

  get Rank(): number {
    return (this.Jobs.length > 0 ? 1 : 0) + Math.max((this.Jobs.length - 1) * 3, 0);
  }
  get Version(): number {
    return 2.0;
  }

  get StatsBase(): ITOSBuildStats {
    let jobs = this.Jobs;
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

  jobCircle(job: ITOSJob): number { return super.jobCircle(job) ? this.jobCircleMax(job) : 0 }
  jobCircleMax(job: ITOSJob): number { return job.Rank == 1 ? 1 : 3 }
  jobUnlockAvailable$(job: ITOSJob): Observable<boolean> {
    return of(1==1
      && this.Rank + 1 <= RANK_LIMIT
      && this.Rank + 1 >= job.Rank
      && (!job.IsSecret || this.Rank + 1 > 2)
      && this.jobCircle(job) < this.jobCircleMax(job)
    );
  }

  skillLevelMax$(skill: ITOSSkill): Observable<number> {
    // Taken from shared.ipf/script/skill/skill_enable_get_shared.lua :: GET_LIMIT_SKILL_LEVEL
    return skill.Link_Job.pipe(map(value => {
      let defMaxLevel = skill.Prop_MaxLevel;
      let pcJobLv = this.jobCircleMax(value) * 15;
      let pcCircle = Math.floor((pcJobLv - 1) / 15) + 1;
      let sklCircle = Math.floor((skill.Prop_UnlockClassLevel - 1) / 15) + 1;
      let applyCircle = pcCircle - sklCircle + 1;

      return Math.min(applyCircle * 5, defMaxLevel);
    }));
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
    let build = TOSRegionService.isRebuild(region)
      ? new TOSBuild_20()
      : new TOSBuild_10();

    return new TOSDatabaseBuild(build);
  }

  private constructor(private build: TOSBuild) {}

  get Job$() { return this.build.Job$ }
  get Jobs() { return this.build.Jobs }
  get JobTree() { return this.build.JobTree }
  get Rank() { return this.build.Rank }
  get Skill$() { return this.build.Skill$ }
  get Stats() { return this.build.Stats }
  get StatsBase() { return this.build.StatsBase }
  get StatsBonus() { return this.build.StatsBonus }
  get StatsPoints$() { return this.build.StatsPoints$ }
  get Version() { return this.build.Version }

  jobAdd$(job: ITOSJob) { return this.build.jobAdd$(job) }
  jobCircle(job: ITOSJob) { return this.build.jobCircle(job) }
  jobCircleMax(job:ITOSJob): number { return this.build.jobCircleMax(job) }
  jobRanks(job: ITOSJob): number[] { return this.build.jobRanks(job) }
  jobRemove$(rank: number) { return this.build.jobRemove$(rank) }
  jobUnlockAvailable$(job: ITOSJob) { return this.build.jobUnlockAvailable$(job) }

  skillEffect$(skill: ITOSSkill, showFactors: boolean) { return this.build.skillEffect$(skill, showFactors) }
  skillEffectFormula$(skill: ITOSSkill, prop: string) { return this.build.skillEffectFormula$(skill, prop) }
  skillLevel(skill: ITOSSkill) { return this.build.skillLevel(skill) }
  skillLevelIncrement$(skill: ITOSSkill, delta: number, force?: boolean, rollOver?: boolean) { return this.build.skillLevelIncrement$(skill, delta, force, rollOver) }
  skillLevelIncrementAvailable$(skill: ITOSSkill, delta: number) { return this.build.skillLevelIncrementAvailable$(skill, delta) }
  skillLevelMax$(skill: ITOSSkill) { return this.build.skillLevelMax$(skill) }
  skillPoints(job: ITOSJob) { return this.build.skillPoints(job) }
  skillPointsMax(job: ITOSJob) { return this.build.skillPointsMax(job) }
  skillSP$(skill: ITOSSkill) { return this.build.skillSP$(skill) }

  statsIncrementLevel(stat: string, delta: number) { this.build.statsIncrementLevel(stat, delta) }
  statsIncrementLevelAvailable(stat: string, delta: number) { return this.build.statsIncrementLevelAvailable(stat, delta) }
  statsPointsMax() { return this.build.statsPointsMax() }

}

export class TOSSimulatorBuild implements ITOSBuild {
  public readonly Tooltip: EventEmitter<ITOSEntity> = new EventEmitter();

  static base64Decode(region: TOSRegion, text: string): Observable<TOSSimulatorBuild> {
    return fromPromise((async () => {
      let build: TOSSimulatorBuild = TOSSimulatorBuild.new(region);
      let encoded: ITOSBuildEncoded = JSON.parse(atob(text));

      if (build.Version == encoded.version) {
        // Parse jobs
        let jobs = await Promise.all(encoded.jobs.map(value => TOSDomainService.jobsByIdName(value).toPromise()));
        for (let job of jobs) await build.jobAdd$(job);

        // Parse skills
        for (let skill$ID of Object.keys(encoded.skills || {})) {
          let skill =
            await TOSDomainService.skillsById(+skill$ID).toPromise();
            await build.skillLevelIncrement$(skill, encoded.skills[skill$ID]);
        }

        // Parse stats
        for (let stat of Object.keys(encoded.stats || {}))
          build.statsIncrementLevel(stat, encoded.stats[stat]);
      }

      return build;
    })());
  }
  static async base64Encode(build: TOSSimulatorBuild): Promise<string> {
    let jobs = build.Jobs.map(value => value.$ID_NAME);
    let skills = await Promise.all(build.Jobs.map(value => value.Link_Skills.toPromise()));
    let skillLevels: { [key: number]: number } = {};
        skills
          .forEach(value => value
            .filter(value => build.skillLevel(value) > 0)
            .forEach(value => skillLevels[value.$ID] = build.skillLevel(value)))
    ;

    return jobs.length
      ? btoa(JSON.stringify({ jobs, skills: skillLevels, stats: build.StatsBonus, version: build.Version }))
      : '';
  }

  static new(region: TOSRegion): TOSSimulatorBuild {
    let build = TOSRegionService.isRebuild(region)
      ? new TOSBuild_20()
      : new TOSBuild_10();

    return new TOSSimulatorBuild(build);
  }

  private constructor(private build: TOSBuild) {}

  get Job$() { return this.build.Job$ }
  get Jobs() { return this.build.Jobs }
  get JobTree() { return this.build.JobTree }
  get Rank() { return this.build.Rank }
  get Skill$() { return this.build.Skill$ }
  get Stats() { return this.build.Stats }
  get StatsBase() { return this.build.StatsBase }
  get StatsBonus() { return this.build.StatsBonus }
  get StatsPoints$() { return this.build.StatsPoints$ }
  get Version() { return this.build.Version }

  jobAdd$(job: ITOSJob) { return this.build.jobAdd$(job); }
  jobCircle(job: ITOSJob) { return this.build.jobCircle(job) }
  jobCircleMax(job:ITOSJob) { return this.build.jobCircleMax(job) }
  jobRanks(job: ITOSJob) { return this.build.jobRanks(job) }
  jobRemove$(rank: number) { return this.build.jobRemove$(rank); }
  jobUnlockAvailable$(job: ITOSJob) { return this.build.jobUnlockAvailable$(job) }

  skillEffect$(skill: ITOSSkill, showFactors: boolean) { return this.build.skillEffect$(skill, showFactors) }
  skillEffectFormula$(skill: ITOSSkill, prop: string) { return this.build.skillEffectFormula$(skill, prop) }
  skillLevel(skill: ITOSSkill) { return this.build.skillLevel(skill) }

  skillLevelIncrement$(skill: ITOSSkill, delta: number, force?: boolean, rollOver?: boolean) { return this.build.skillLevelIncrement$(skill, delta, force, rollOver); }
  skillLevelIncrementAvailable$(skill: ITOSSkill, delta: number) { return this.build.skillLevelIncrementAvailable$(skill, delta) }
  skillLevelMax$(skill: ITOSSkill) { return this.build.skillLevelMax$(skill) }
  skillPoints(job: ITOSJob) { return this.build.skillPoints(job) }
  skillPointsMax(job: ITOSJob) { return this.build.skillPointsMax(job) }
  skillSP$(skill: ITOSSkill) { return this.build.skillSP$(skill) }

  statsIncrementLevel(stat: string, delta: number): void { this.build.statsIncrementLevel(stat, delta); }
  statsIncrementLevelAvailable(stat: string, delta: number): boolean { return this.build.statsIncrementLevelAvailable(stat, delta) }
  statsPointsMax(): number { return this.build.statsPointsMax() }

  tooltip(entity: ITOSAttribute | ITOSJob | ITOSSkill, show: boolean) {
    this.Tooltip.emit(show && entity)
  }

}
