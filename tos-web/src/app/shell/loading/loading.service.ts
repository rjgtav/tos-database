import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, ReplaySubject} from "rxjs";
import {UpdateService} from "../../shared/service/update.service";
import {TOSDataSet, TOSDataSetService} from "../../shared/domain/tos/tos-domain";
import {take} from "rxjs/operators";
import {TOSRegionService} from "../../shared/domain/tos-region";
import {TOSDomainService} from "../../shared/domain/tos/tos-domain.service";
import {SWService} from "../../shared/service/sw.service";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private installComplete: ReplaySubject<boolean> = new ReplaySubject(1);
  private updateComplete: ReplaySubject<boolean> = new ReplaySubject(1);
  private updateProgress: BehaviorSubject<number> = new BehaviorSubject(-1);

  constructor(
    private domain: TOSDomainService,
    private http: HttpClient,
    private sw: SWService,
    private update: UpdateService,
  ) {
    this.sw.enabled
      ? this.installCheck()
      : this.onInstallComplete();
  }

  get installComplete$() { return this.installComplete.pipe(take(1)) }
  get installSupported() { return !!navigator.serviceWorker && !!window.indexedDB }

  get updateComplete$() { return this.updateComplete.pipe(take(1)) }
  get updateProgress$() { return this.updateProgress.asObservable() }
  get updateTotal() { return Object.values(TOSDataSet).length }

  async clear() {
    let confirm = `
      =====================================
       Please close all other tos.guru tabs before proceeding
      =====================================
      
      Are you sure you want to clear the cache?
      This process will take a couple of minutes
    `;

    if (window.confirm(confirm)) {
      if (window.caches) {
        // Clear cache
        console.log('Clearing cache...');
        await Promise
          .all((await window.caches.keys())
            .map(value => window.caches.delete(value)));
      }

      // Clear IndexedDB for the current region
      console.log('Clearing IndexedDB...');
      await Promise
        .all(Object.values(TOSDataSet)
          .map(value => new Promise((resolve) => {
            let request = window.indexedDB.deleteDatabase(TOSRegionService.getUrl() + '/' + TOSDataSetService.toUrl(value));
            request.onsuccess = () => resolve("ebisuke"); //@TODO
          })));

      // Clear version
      console.log('Clearing version...');
      this.update.updateVersion(true);

      // Unregister service worker
      console.log('Unregistering service worker...');
      await Promise.all((await navigator.serviceWorker.getRegistrations()).map(value => value.unregister()));

      location.reload(true);
    }
  }

  private installCheck() {
    this.sw.installComplete()
      ? this.onInstallComplete()
      : setTimeout(() => this.installCheck(), 250);
  }

  private async updateCheck() {
    let region = TOSRegionService.get();
    //console.log('updateCheck', region);

    if (!this.update.updateAvailable())
      return this.onUpdateComplete();

    this.updateProgress.next(0);

    // Load one at a time, for reliability
    for (let dataset of Object.values(TOSDataSet)) {
      await this.domain.load(dataset, region).toPromise();

      //console.log('updateProgress', this.updateProgress.getValue() + 1);
      this.updateProgress.next(this.updateProgress.getValue() + 1);
      this.updateProgress.getValue() == this.updateTotal && this.onUpdateComplete();
    }

    this.update.updateVersion();
  }

  private onInstallComplete() {
    //console.log('onInstallComplete');
    this.installComplete.next(this.installSupported);
    this.updateCheck();
  }

  private onUpdateComplete() {
    //console.log('onUpdateComplete');
    this.updateComplete.next(true);
  }

}
