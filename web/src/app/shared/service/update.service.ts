import {Injectable} from '@angular/core';
import {TOSRegion, TOSRegionService} from "../domain/tos-region";

const KEY_VERSION = 'version';
const VERSION_HOTFIX = 2;
const VERSION: { [key in TOSRegion]: string } = {
  'iTOS': 'patch_239899_release_239949', /* iTOS-needle */
  'jTOS': 'patch_239936_release_239936', /* jTOS-needle */
  'kTEST': 'patch_239410_release_239410', /* kTEST-needle */
  'kTOS': 'patch_240050_release_240042', /* kTOS-needle */
  'twTOS': 'patch_239774_release_239774', /* twTOS-needle */
};

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private region: TOSRegion;

  constructor() {
    this.region = TOSRegionService.get();
  }

  updateAvailable(): boolean { return this.version != this.versionOld }
  updateVersion(clear?: boolean) {
    let version = JSON.parse(localStorage.getItem(KEY_VERSION) || '{}');
        version[this.region] = clear ? '' : this.version;

    localStorage.setItem(KEY_VERSION, JSON.stringify(version));
  }

  get version() { return VERSION[this.region] + (VERSION_HOTFIX ? '_hotfix_' + VERSION_HOTFIX : ''); }
  get versionHuman() { return this.region && (this.region.toString() + ' • ' + this.version) }

  private get versionOld(): string { return JSON.parse(localStorage.getItem(KEY_VERSION) || '{}')[this.region]; }

}
