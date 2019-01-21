import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {SwUpdate} from "@angular/service-worker";
import {UpdateService} from "../../shared/service/update.service";
import {TOSDataSet, TOSDataSetService} from "../../shared/domain/tos/tos-domain";
import {filter, take} from "rxjs/operators";
import {TOSRegionService} from "../../shared/domain/tos-region";
import {TOSDomainService} from "../../shared/domain/tos/tos-domain.service";

const CACHE_KEY = 'app';
const CACHE_WAIT = 250;

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private cacheAssets: Cache;
  private cacheControl: Cache;
  private installTotal_: number;

  private installComplete: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private installProgress: BehaviorSubject<number> = new BehaviorSubject(-1);

  private updateComplete: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private updateProgress: BehaviorSubject<number> = new BehaviorSubject(-1);

  constructor(
    private domain: TOSDomainService,
    private http: HttpClient,
    private swUpdate: SwUpdate,
    private update: UpdateService,
  ) {
    if (this.swUpdate.isEnabled)
      window.navigator.serviceWorker.ready.then(() => this.onServiceWorkerReady());
    else
      this.onInstallComplete();
  }

  get installComplete$() { return this.installComplete.pipe(filter(value => value), take(1)) }
  get installProgress$() { return this.installProgress.asObservable() }
  get installSupported() { return !!navigator.serviceWorker && !!window.indexedDB }
  get installTotal() { return this.installTotal_ }

  get updateComplete$() { return this.updateComplete.pipe(filter(value => value), take(1)) }
  get updateProgress$() { return this.updateProgress.asObservable() }
  get updateTotal() { return Object.values(TOSDataSet).length }

  async clear() {
    // Clear cache
    console.log('Clearing cache...');
    await Promise
      .all((await window.caches.keys())
        .map(value => window.caches.delete(value)));

    // Clear IndexedDB for the current region
    console.log('Clearing IndexedDB...');
    await Promise
      .all(Object.values(TOSDataSet)
        .map(value => new Promise((resolve) => {
          let request = window.indexedDB.deleteDatabase(TOSRegionService.getUrl() + '/' + TOSDataSetService.toUrl(value));
          request.onsuccess = () => resolve();
        })));

    // Clear version
    console.log('Clearing version...');
    this.update.updateVersion(true);

    // Unregister service worker
    console.log('Unregistering service worker...');
    await Promise.all((await navigator.serviceWorker.getRegistrations()).map(value => value.unregister()));

    location.reload(true);
  }

  private installCheck() {
    //console.log('installCheck');

    // Angular's Service Worker works as follows:
    // - There's a ngsw:db:control Cache Storage which stores all control variables:
    //   - /latest returns an object with a 'latest' key and the latest manifest's hash as a value
    //   - /manifests returns an object with all installed manifests, using their hash as the key
    // - There's a ngsw:HASH:assets:GROUP:cache for each installed manifest and each Asset Group
    // - The CACHE_KEY asset group is the one responsible for storing the prefetched assets, which includes all the main scripts

    if (this.cacheAssets == null)
      return this.cacheControl
        .match(new Request('/latest'), { ignoreVary: true })
        .then(latest => {
          if (latest)
            return this.cacheControl
              .match('/manifests', { ignoreVary: true })
              .then(async manifests => {
                if (manifests) {
                  let manifestHash = (await latest.json())['latest'] as string;
                  let manifest = (await manifests.json())[manifestHash] as ngswManifest;

                  this.installTotal_ = manifest.assetGroups
                    .find(value => value.name == CACHE_KEY)
                    .urls.length;

                  return window.caches
                    .open(`ngsw:${manifestHash}:assets:${CACHE_KEY}:cache`)
                    .then(value => {
                      this.cacheAssets = value;
                      this.installCheck();
                    });
                }

                //console.log('manifests not yet available...');
                setTimeout(() => this.installCheck(), CACHE_WAIT)
              });

          //console.log('latest not yet available...');
          setTimeout(() => this.installCheck(), CACHE_WAIT)
        });

    this.cacheAssets
      .keys()
      .then(value => {
        //console.log('installProgress', value.length);
        this.installProgress.next(value.length);
        this.installProgress.getValue() < this.installTotal
          ? setTimeout(() => this.installCheck(), CACHE_WAIT)
          : this.onInstallComplete();
      });
  }

  private updateCheck() {
    let region = TOSRegionService.get();
    //console.log('updateCheck', region);

    if (!this.update.updateAvailable())
      return this.onUpdateComplete();

    this.updateProgress.next(0);

    // Load one at a time, for reliability
    Promise.all(Object
      .values(TOSDataSet)
      .map(value =>
        this.domain
          .load(value, region).toPromise()
          .then(value => {
            //console.log('updateProgress', this.updateProgress.getValue() + 1);
            this.updateProgress.next(this.updateProgress.getValue() + 1);
            this.updateProgress.getValue() == this.updateTotal && this.onUpdateComplete();
          })
      )
    ).then(value => this.update.updateVersion())
  }

  private onInstallComplete() {
    //console.log('onInstallComplete');
    this.installComplete.next(this.installSupported);
    this.updateCheck();
  }

  private onServiceWorkerReady() {
    //console.log('onServiceWorkerReady');

    // Open cache database
    window.caches
      .open('ngsw:db:control')
      .then(value => {
        this.cacheControl = value;
        this.installCheck();
      });
  }

  private onUpdateComplete() {
    //console.log('onUpdateComplete');
    this.updateComplete.next(true);
  }

}

interface ngswManifest {
  assetGroups: ngswAssetGroup[];
}
interface ngswAssetGroup {
  name: string;
  urls: string[];
}
