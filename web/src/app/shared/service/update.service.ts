import {Injectable} from '@angular/core';
import {TOSRegion} from "../domain/tos-region";

const KEY_VERSION = 'version';
const VERSION_HOTFIX = 1;
const VERSION: { [key in TOSRegion]: string } = {
  'iTOS': 'patch_235798_release_235766', /* iTOS-needle */
  'jTOS': 'patch_234991_release_235407', /* jTOS-needle */
  'kTEST': 'patch_235297_release_235297', /* kTEST-needle */
  'kTOS': 'patch_235385_release_235385', /* kTOS-needle */
};

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor() { }

  updateAvailable(region: TOSRegion): boolean { return this.version(region) != this.versionOld(region) }
  updateVersion(region: TOSRegion) {
    let version = JSON.parse(localStorage.getItem(KEY_VERSION) || '{}');
        version[region] = this.version(region);

    localStorage.setItem(KEY_VERSION, JSON.stringify(version));
  }

  version(region: TOSRegion) { return VERSION[region] + (VERSION_HOTFIX ? '_hotfix_' + VERSION_HOTFIX : ''); }
  versionHuman(region: TOSRegion) { return region && (region.toString() + ' ~ ' + this.version(region)) }

  private versionOld(region: TOSRegion): string {
    return JSON.parse(localStorage.getItem(KEY_VERSION) || '{}')[region];
  }

}
