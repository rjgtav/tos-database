import {Injectable} from '@angular/core';
import {TOSRegion, TOSRegionService} from "../domain/tos-region";
import {LoadingService} from "../../shell/loading/loading.service";
import {HttpClient} from "@angular/common/http";
import {map, take} from "rxjs/operators";
import {ReplaySubject} from "rxjs";
import {InstallService} from "./install.service";
import {TOSUrlService} from "./tos-url.service";

const KEY_VERSION = 'version';
const VERSION_HOTFIX = 0;

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private readonly versionInstalled: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private readonly version: ReplaySubject<VersionByRegion> = new ReplaySubject(1);

  constructor(
    private http: HttpClient,
    private install: InstallService,
    private loading: LoadingService
  ) {
    this.install.complete$.subscribe(value => this.http.get<VersionByRegion>(TOSUrlService.Asset('version.json.js')).subscribe(value => this.version.next(value)));
    this.loading.complete$.subscribe(value => this.update());
    this.versionInstalled.next(!!localStorage.getItem(KEY_VERSION));
  }

  get version$() { return this.version.pipe(take(1), map(value => value[this.region].version + (VERSION_HOTFIX ? '_hotfix_' + VERSION_HOTFIX : ''))) }
  get versionHuman$() { return this.version$.pipe(map(value => `${ this.region } • ${ value }`)) }
  get versionUpdateAvailable$() { return this.version$.pipe(map(value => value != this.versionOld)) }
  get versionUpdateInstalled$() { return this.versionInstalled.asObservable() }

  private get versionOld(): string { return JSON.parse(localStorage.getItem(KEY_VERSION) || '{}')[this.region]; }
  private get region(): TOSRegion { return TOSRegionService.get() }

  private async update() {
    let version = JSON.parse(localStorage.getItem(KEY_VERSION) || '{}');
        version[this.region] = await this.version$.toPromise();

    localStorage.setItem(KEY_VERSION, JSON.stringify(version));

    this.versionInstalled.next(true);
  }

}

type VersionByRegion = {
  [key in TOSRegion]: { is_rebuild: boolean, version: string }
}
