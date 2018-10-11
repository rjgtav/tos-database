import {Injectable} from "@angular/core";
import {TOSSimulatorBuild} from "../../domain/tos/tos-build";
import {TOSJob} from "../../domain/tos/job/tos-job.model";
import {TOSSkillRepository} from "../../domain/tos/skill/tos-skill.repository";
import {TOSJobRepository} from "../../domain/tos/job/tos-job.repository";
import {TOSRepositoryService} from "../../domain/tos/tos-repository.service";

@Injectable({
  providedIn: 'root'
})
export class TosNeetService {

  constructor() {}

  decode(encoded: string): TOSSimulatorBuild {
    let build: TOSSimulatorBuild = new TOSSimulatorBuild();

    let partsEncoded = encoded.split('.');
    let jobsDecoded: TOSJob[] = [];
    let ranksEncoded = partsEncoded[0];

    // Decode ranks
    for (let i = 1; i < ranksEncoded.length; i ++) {
      let jobTree = ranksEncoded[0];
      let jobClassName = 'Char' + jobTree + "_" + parseInt(ranksEncoded[i], 36);

      let job = TOSRepositoryService.findJobsByIdName(jobClassName);
      if (job == null) // HotFix: for example tos-th has the wrong ClassID for some classes
        continue;

      build.jobAdd(job);

      if (jobsDecoded.indexOf(job) == -1)
        jobsDecoded.push(job)
    }

    // Decode skills
    for (let i = 1; i < partsEncoded.length; i ++) {
      let skillsEncoded = partsEncoded[i];

      for (let j = 0; j < skillsEncoded.length; j += 2) {
        let job = jobsDecoded[i - 1];

        let skills = TOSRepositoryService.findSkillsByJob(job.$ID);
        let skillClassID = skills[0].$ID;
            skillClassID = parseInt(skillsEncoded[j], 36) + (skillClassID - skillClassID % 100);
        let skillLevel = parseInt(skillsEncoded[j + 1], 36);

        let skill = TOSRepositoryService.findSkillsById(skillClassID);

        if (skill && skills.indexOf(skill) > -1)
          build.skillIncrementLevel(skill, skillLevel);
      }
    }

    return build;
  }

}
