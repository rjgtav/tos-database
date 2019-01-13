import {Injectable} from '@angular/core';
import {TOSRegion} from "../domain/tos-region";

const KEY_VERSION = 'version';
const VERSION_HOTFIX = 0;
const VERSION: { [key in TOSRegion]: string } = {
  'iTOS': '234929_release_234446', /* iTOS-needle */
  'jTOS': '233760001001_hotfix_1', /* jTOS-needle */
  'kTEST': '234350001001_hotfix_1', /* kTEST-needle */
  'kTOS': '234620001001_hotfix_1', /* kTOS-needle */
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
