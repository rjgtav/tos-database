import { Injectable } from '@angular/core';
import {TOSAttribute} from "../shared/domain/tos/attribute/tos-attribute.model";
import {TOSJob} from "../shared/domain/tos/job/tos-job.model";
import {TOSSkill} from "../shared/domain/tos/skill/tos-skill.model";
import {TOSAttributeService} from "../shared/domain/tos/attribute/tos-attribute.service";
import {TOSJobService} from "../shared/domain/tos/job/tos-job.service";
import {TOSSkillService} from "../shared/domain/tos/skill/tos-skill.service";
import {concat, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SkillSimulatorService {

  private initialized: boolean;

  private attributesBySkill: {[key: number]: TOSAttribute[]};
  private attributesByJob: {[key: number]: TOSAttribute[]};

  private jobsByClassName: {[key: string]: TOSJob};
  private jobsByClassTree: {[key: string]: TOSJob[]};
  private jobsStarter: TOSJob[];

  private skills: {[key: number]: TOSSkill};
  private skillsByJob: {[key: number]: TOSSkill[]};
  private skillsByJobAndCircle: {[key: number]: {[key: number]: TOSSkill[]}};

  constructor(private attributeService: TOSAttributeService, private jobService: TOSJobService, private skillService: TOSSkillService) {}

  get AttributesBySkill() { return this.attributesBySkill; }
  get AttributesByJob() { return this.attributesByJob; }
  get JobsByClassTree() { return this.jobsByClassTree; }
  get JobsByClassName() { return this.jobsByClassName; }
  get JobsStarter() { return this.jobsStarter; }
  get Skills() { return this.skills; }
  get SkillsByJob() { return this.skillsByJob; }
  get SkillsByJobAndCircle() { return this.skillsByJobAndCircle; }

  load(): Observable<any> {
    if (this.initialized) return null;
    else                  this.initialized = true;

    let attribute$: Observable<any> = this.attributeService.findAll()
      .pipe(map(data => {
        this.attributesByJob = data
          .filter(value => value.Link_Jobs && !value.Link_Skill)
          .reduce((accumulator, value) => {
            value.Link_Jobs.forEach(job => (accumulator[job.$ID] = accumulator[job.$ID] || []).push(value));
            return accumulator;
          }, {});

        this.attributesBySkill = data
          .filter(value => value.Link_Skill)
          .reduce(this.accumulateByKey((value: TOSAttribute) => value.Link_Skill.$ID), {});
      }));

    let job$: Observable<any> = this.jobService.findAll()
      .pipe(map(data => {
        data = data
          .filter(value => value.Link_Attributes) // Filter classes that are still under development
          .sort((a, b) =>                         // Sort by Rank, Name
            a.Rank < b.Rank ? -1 :
            a.Rank > b.Rank ? 1 :
            a.Name < b.Name ? -1 :
            a.Name > b.Name ? 1 : 0
          );

        this.jobsByClassName = data.reduce((accumulator, value) => {
            accumulator[value.$ID_NAME] = value;
            return accumulator;
          }, {});

        this.jobsByClassTree = data
          .reduce(this.accumulateByKey((job: TOSJob) => job.JobTree.toString()), {});

        this.jobsStarter = data
          .filter(value => value.Rank == 1);
      }));

    let skill$: Observable<any> = this.skillService.findAll()
      .pipe(map(data => {
        data = data.filter(value => value.Link_Job && value.Name.indexOf('Summon:') != 0);

        this.skills = data.reduce((accumulator, value) => {
          accumulator[value.$ID] = value;
          return accumulator;
        }, {});

        this.skillsByJob = data
          .reduce(this.accumulateByKey((value: TOSSkill) => value.Link_Job.$ID), {});

        this.skillsByJobAndCircle = data
          .reduce((accumulator, value) => {
            let job = (accumulator[value.Link_Job.$ID] = accumulator[value.Link_Job.$ID] || {});
            let circle = (job[value.RequiredCircle] = job[value.RequiredCircle] || []);
                circle.push(value);

            return accumulator;
          }, {});
      }));

    return concat(attribute$, job$, skill$);
  }

  private accumulateByKey(extractor: (value: any) => number | string) {
    return (accumulator, value) => {
      (accumulator[extractor(value)] = accumulator[extractor(value)] || []).push(value);
      return accumulator;
    }
  }
}
