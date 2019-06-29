import {Injectable} from '@angular/core';
import {TOSRegion, TOSRegionService, VERSIONS} from "../domain/tos-region";

const KEY_VERSION = 'version';
const VERSION_HOTFIX = 5;

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private readonly region: TOSRegion = TOSRegionService.get();

  constructor() {}

  updateAvailable(): boolean { return this.versionNew != this.versionOld }
  updateVersion(clear?: boolean) {
    let version = JSON.parse(localStorage.getItem(KEY_VERSION) || '{}');
        version[this.region] = clear ? '' : this.versionNew;

    localStorage.setItem(KEY_VERSION, JSON.stringify(version));
  }

  get versionNew() { return VERSIONS[this.region].version + (VERSION_HOTFIX ? '_hotfix_' + VERSION_HOTFIX : '') }
  get versionHuman() { return this.region && (this.region.toString() + ' • ' + this.versionNew) }

  private get versionOld(): string { return JSON.parse(localStorage.getItem(KEY_VERSION) || '{}')[this.region]; }

}
