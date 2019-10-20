import {Injectable} from '@angular/core';
import {InstallService} from "../../shared/service/install.service";
import {ReplaySubject} from "rxjs";
import {filter, take} from "rxjs/operators";
import {SearchService} from "../../shared/service/search.service";
import {TOSRegion} from "../../shared/domain/tos-region";
import {LUAService} from "../../shared/service/lua.service";
import {TranslateService} from "../../shared/service/translate.service";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private installComplete: boolean;
  private luaComplete: boolean;
  private searchComplete: boolean;
  private translateComplete: boolean;

  private loading$complete: ReplaySubject<boolean> = new ReplaySubject(1);
  private loading$message: ReplaySubject<string> = new ReplaySubject(1);
  private loading$progress: ReplaySubject<number> = new ReplaySubject(1);
  private loading$total: ReplaySubject<number> = new ReplaySubject(1);

  constructor(
    private install: InstallService,
    private lua: LUAService,
    private search: SearchService,
    private translate: TranslateService,
  ) {
    this.install.complete$.subscribe(value => this.onInstallComplete(value));
    this.install.progress$.subscribe(value => this.loading$progress.next(value));
    this.install.total$.subscribe(value => this.loading$total.next(value));

    this.lua.complete$.subscribe(value => this.onLuaComplete(value));
    this.lua.progress$.subscribe(value => this.loading$progress.next(value));
    this.lua.total$.subscribe(value => this.loading$total.next(value));

    this.search.complete$.subscribe(value => this.onSearchComplete(value));
    this.search.progress$.subscribe(value => this.loading$progress.next(value));
    this.search.total$.subscribe(value => this.loading$total.next(value));

    this.translate.complete$.subscribe(value => this.onTranslateComplete(value));
    this.translate.progress$.subscribe(value => this.loading$progress.next(value));
    this.translate.total$.subscribe(value => this.loading$total.next(value));

    this.onComplete();
  }

  get complete$() { return this.loading$complete.pipe(filter(value => !!value), take(1)) }
  get message$() { return this.loading$message.asObservable() }
  get progress$() { return this.loading$progress.asObservable() }
  get total$() { return this.loading$total.asObservable() }

  get supported() { return navigator.serviceWorker != null && window.indexedDB != null && window.caches != null }

  private onComplete() {
    let message = 'Loading tos.guru...';
        message = this.installComplete ? 'Loading LUA runtime...' : message;
        message = this.luaComplete ? 'Loading search index...' : message;
        message = this.searchComplete ? 'Loading translation...' : message;


    this.loading$complete.next(this.installComplete && this.luaComplete && this.searchComplete && this.translateComplete);
    this.loading$message.next(message);
  }
  private onInstallComplete(value: boolean) { this.installComplete = value; this.onComplete() }
  private onLuaComplete(value: boolean) { this.luaComplete = value; this.onComplete() }
  private onSearchComplete(value: boolean) { this.searchComplete = value; this.onComplete() }
  private onTranslateComplete(value: boolean) { this.translateComplete = value; this.onComplete() }

  async reset() {
    let confirm = `
      =====================================
       Please close all other tos.guru tabs before proceeding
      =====================================
      
      Are you sure you want to clear the cache?
      This process will take a couple of minutes
    `;

    if (window.confirm(confirm)) {
      // Unregister service worker
      console.log('Unregistering service worker...');
      await Promise.all((await navigator.serviceWorker.getRegistrations()).map(value => value.unregister()));

      // Clear local storage
      console.log('Clearing local storage...');
      window.localStorage && window.localStorage.clear();

      // Clear cache
      console.log('Clearing cache...');
      window.caches && await Promise
        .all((await window.caches.keys())
          .map(value => window.caches.delete(value)));

      // Clear IndexedDB
      console.log('Clearing IndexedDB...');
      if (window.indexedDB) {
        let databases = [].concat.apply([], ['attributes', 'books', 'cards', 'collections', 'cubes', 'equipment', 'equipment-sets', 'gems', 'items', 'jobs', 'maps', 'monsters', 'npcs', 'recipes', 'skills']
          .map(dataset => Object.values(TOSRegion)
            .map(region => `${ region }/${ dataset }`.toLowerCase())));

        await Promise.all(databases
          .concat('__dbnames')
          .map(database => new Promise((resolve, reject) => {
            let request = window.indexedDB.deleteDatabase(database);
                request.onsuccess = () => resolve();
          })));
      }

      location.reload(true);
    }
  }

}
