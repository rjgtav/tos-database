import {Injectable} from "@angular/core";
import {TOSSimulatorBuild} from "../../domain/tos/tos-build";
import {ITOSJob} from "../../domain/tos/tos-domain";
import {TOSDomainService} from "../../domain/tos/tos-domain.service";
import {TOSRegionService} from "../tos-region.service";

@Injectable({
  providedIn: 'root'
})
export class TosNeetService {

  constructor() {}

  decode(encoded: string): TOSSimulatorBuild {
    let build: TOSSimulatorBuild = TOSSimulatorBuild.new(TOSRegionService.Region);

    let partsEncoded = encoded.split('.');
    let jobsDecoded: ITOSJob[] = [];
    let ranksEncoded = partsEncoded[0];

    // Decode ranks
    for (let i = 1; i < ranksEncoded.length; i ++) {
      let jobTree = ranksEncoded[0];
      let jobClassName = 'Char' + jobTree + "_" + parseInt(ranksEncoded[i], 36);

      let job = TOSDomainService.jobsByIdName[jobClassName];
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

        let skills = TOSDomainService.skillsByJob[job.$ID];
        let skillClassID = skills[0].$ID;
            skillClassID = parseInt(skillsEncoded[j], 36) + (skillClassID - skillClassID % 100);
        let skillLevel = parseInt(skillsEncoded[j + 1], 36);

        let skill = TOSDomainService.skillsById[skillClassID];

        if (skill && skills.indexOf(skill) > -1)
          build.skillLevelIncrement(skill, skillLevel);
      }
    }

    return build;
  }

}
