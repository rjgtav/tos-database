import {Injectable} from "@angular/core";
import {SkillSimulatorService} from "../../../skill-simulator/skill-simulator.service";
import {TOSSimulatorBuild} from "../../domain/tos/tos-build";
import {TOSJob} from "../../domain/tos/job/tos-job.model";

@Injectable({
  providedIn: 'root'
})
export class TosNeetService {

  constructor(private skillSimulatorService: SkillSimulatorService) {}

  decode(encoded: string): TOSSimulatorBuild {
    let build: TOSSimulatorBuild = new TOSSimulatorBuild();

    let partsEncoded = encoded.split('.');
    let jobsDecoded: TOSJob[] = [];
    let ranksEncoded = partsEncoded[0];

    // Decode ranks
    for (let i = 1; i < ranksEncoded.length; i ++) {
      let jobTree = ranksEncoded[0];
      let jobClassName = 'Char' + jobTree + "_" + parseInt(ranksEncoded[i], 36);

      let job = this.skillSimulatorService.JobsByClassName[jobClassName];
      if (job == null) // HotFix: for example tos-th has the wrong ClassID for some classes
        continue;

      build.jobAdd(job, this.skillSimulatorService.SkillsByJob[job.$ID]);

      if (jobsDecoded.indexOf(job) == -1)
        jobsDecoded.push(job)
    }

    // Decode skills
    for (let i = 1; i < partsEncoded.length; i ++) {
      let skillsEncoded = partsEncoded[i];

      for (let j = 0; j < skillsEncoded.length; j += 2) {
        let job = jobsDecoded[i - 1];


        let skillClassID = this.skillSimulatorService.SkillsByJob[job.$ID][0].$ID;
            skillClassID = parseInt(skillsEncoded[j], 36) + (skillClassID - skillClassID % 100);
        let skillLevel = parseInt(skillsEncoded[j + 1], 36);

        let skill = this.skillSimulatorService.Skills[skillClassID];

        if (skill && this.skillSimulatorService.SkillsByJob[job.$ID].indexOf(skill) > -1)
          build.skillIncrementLevel(skill, skillLevel);
      }
    }

    return build;
  }

}
