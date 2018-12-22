import {Injectable} from "@angular/core";
import {TOSSimulatorBuild} from "../../domain/tos/tos-build";
import {ITOSJob} from "../../domain/tos/tos-domain";
import {TOSDomainService} from "../../domain/tos/tos-domain.service";
import {TOSRegionService} from "../tos-region.service";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class TosNeetService {

  constructor() {}

  decode(encoded: string): Observable<TOSSimulatorBuild> {
    return fromPromise((async () => {
      let build: TOSSimulatorBuild = TOSSimulatorBuild.new(TOSRegionService.Region);

      let partsEncoded = encoded.split('.');
      let jobsDecoded: ITOSJob[] = [];
      let ranksEncoded = partsEncoded[0];

      // Decode ranks
      for (let i = 1; i < ranksEncoded.length; i ++) {
        let jobTree = ranksEncoded[0];
        let jobClassName = 'Char' + jobTree + "_" + parseInt(ranksEncoded[i], 36);

        let job = await TOSDomainService.jobsByIdName(jobClassName).toPromise();
        if (job) { // HotFix: for example tos-th has the wrong ClassID for some classes
          if (!jobsDecoded.find(value => value.$ID == job.$ID))
            jobsDecoded.push(job);

          await build.jobAdd$(job);
        }
      }

      // Decode skills
      for (let i = 1; i < partsEncoded.length; i ++) {
        let skillsEncoded = partsEncoded[i];

        for (let j = 0; j < skillsEncoded.length; j += 2) {
          let job = jobsDecoded[i - 1];

          let skills = await TOSDomainService.skillsByJob(job).toPromise();
          let skillClassID = skills[0].$ID;
              skillClassID = parseInt(skillsEncoded[j], 36) + (skillClassID - skillClassID % 100);
          let skillLevel = parseInt(skillsEncoded[j + 1], 36);

          let skill = await TOSDomainService.skillsById(skillClassID).toPromise();
          let skillsIDs = skills.map(value => value.$ID);

          if (skill && skillsIDs.indexOf(skill.$ID) > -1)
            await build.skillLevelIncrement$(skill, skillLevel);
        }
      }

      return build;
    })());
  }

}
