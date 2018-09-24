import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {SkillSimulatorService} from "./skill-simulator.service";

@Injectable()
export class SkillSimulatorResolver implements Resolve<any> {

  constructor(private skillSimulatorService: SkillSimulatorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.skillSimulatorService.load();
  }

}
