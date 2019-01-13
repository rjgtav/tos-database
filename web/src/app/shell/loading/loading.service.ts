import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, forkJoin} from "rxjs";
import {SwUpdate} from "@angular/service-worker";
import {UpdateService} from "../../shared/service/update.service";
import {TOSDataSet} from "../../shared/domain/tos/tos-domain";
import {filter, take, tap} from "rxjs/operators";
import {TOSRegionService} from "../../shared/domain/tos-region";
import {TOSDomainService} from "../../shared/domain/tos/tos-domain.service";

const CACHE_KEY = 'app';
const CACHE_WAIT = 125;

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

  private installCheck() {
    console.log('installCheck');

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

                console.log('manifests not yet available...');
                setTimeout(() => this.installCheck(), CACHE_WAIT)
              });

          console.log('latest not yet available...');
          setTimeout(() => this.installCheck(), CACHE_WAIT)
        });

    this.cacheAssets
      .keys()
      .then(value => {
        console.log('installProgress', value.length);
        this.installProgress.next(value.length);
        this.installProgress.getValue() < this.installTotal
          ? setTimeout(() => this.installCheck(), CACHE_WAIT)
          : this.onInstallComplete();
      });
  }

  private updateCheck() {
    let region = TOSRegionService.get();
    console.log('updateCheck', region);

    if (!this.update.updateAvailable(region))
      return this.onUpdateComplete();

    this.updateProgress.next(0);

    forkJoin(Object
      .values(TOSDataSet)
      .map(value =>
        this.domain
          .load(value, region)
          .pipe(tap(() => {
            console.log('updateProgress', this.updateProgress.getValue() + 1);
            this.updateProgress.next(this.updateProgress.getValue() + 1);
            this.updateProgress.getValue() == this.updateTotal && this.onUpdateComplete();
          }))
      )
    ).subscribe(() => this.update.updateVersion(region));
  }

  private onInstallComplete() {
    console.log('onInstallComplete');
    this.installComplete.next(this.installSupported);
    this.updateCheck();
  }

  private onServiceWorkerReady() {
    console.log('onServiceWorkerReady');

    // Open cache database
    window.caches
      .open('ngsw:db:control')
      .then(value => {
        this.cacheControl = value;
        this.installCheck();
      });
  }

  private onUpdateComplete() {
    console.log('onUpdateComplete');
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

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Compute the SHA1 of the given string
 *
 * see http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf
 *
 * WARNING: this function has not been designed not tested with security in mind.
 *          DO NOT USE IT IN A SECURITY SENSITIVE CONTEXT.
 *
 * Borrowed from @angular/compiler/src/i18n/digest.ts
 */
function sha1(str) {
  const utf8 = str;
  const words32 = stringToWords32(utf8, Endian.Big);
  return _sha1(words32, utf8.length * 8);
}
function sha1Binary(buffer) {
  const words32 = arrayBufferToWords32(buffer, Endian.Big);
  return _sha1(words32, buffer.byteLength * 8);
}
function _sha1(words32, len) {
  const w = new Array(80);
  let [a, b, c, d, e] = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
  words32[len >> 5] |= 0x80 << (24 - len % 32);
  words32[((len + 64 >> 9) << 4) + 15] = len;
  for (let i = 0; i < words32.length; i += 16) {
    const [h0, h1, h2, h3, h4] = [a, b, c, d, e];
    for (let j = 0; j < 80; j++) {
      if (j < 16) {
        w[j] = words32[i + j];
      }
      else {
        w[j] = rol32(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
      }
      const [f, k] = fk(j, b, c, d);
      const temp = [rol32(a, 5), f, e, k, w[j]].reduce(add32);
      [e, d, c, b, a] = [d, c, rol32(b, 30), a, temp];
    }
    [a, b, c, d, e] = [add32(a, h0), add32(b, h1), add32(c, h2), add32(d, h3), add32(e, h4)];
  }
  return byteStringToHexString(words32ToByteString([a, b, c, d, e]));
}
function add32(a, b) {
  return add32to64(a, b)[1];
}
function add32to64(a, b) {
  const low = (a & 0xffff) + (b & 0xffff);
  const high = (a >>> 16) + (b >>> 16) + (low >>> 16);
  return [high >>> 16, (high << 16) | (low & 0xffff)];
}
// Rotate a 32b number left `count` position
function rol32(a, count) {
  return (a << count) | (a >>> (32 - count));
}
var Endian;
(function (Endian) {
  Endian[Endian["Little"] = 0] = "Little";
  Endian[Endian["Big"] = 1] = "Big";
})(Endian || (Endian = {}));
function fk(index, b, c, d) {
  if (index < 20) {
    return [(b & c) | (~b & d), 0x5a827999];
  }
  if (index < 40) {
    return [b ^ c ^ d, 0x6ed9eba1];
  }
  if (index < 60) {
    return [(b & c) | (b & d) | (c & d), 0x8f1bbcdc];
  }
  return [b ^ c ^ d, 0xca62c1d6];
}
function stringToWords32(str, endian) {
  const words32 = Array((str.length + 3) >>> 2);
  for (let i = 0; i < words32.length; i++) {
    words32[i] = wordAt(str, i * 4, endian);
  }
  return words32;
}
function arrayBufferToWords32(buffer, endian) {
  const words32 = Array((buffer.byteLength + 3) >>> 2);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < words32.length; i++) {
    words32[i] = wordAt(view, i * 4, endian);
  }
  return words32;
}
function byteAt(str, index) {
  if (typeof str === 'string') {
    return index >= str.length ? 0 : str.charCodeAt(index) & 0xff;
  }
  else {
    return index >= str.byteLength ? 0 : str[index] & 0xff;
  }
}
function wordAt(str, index, endian) {
  let word = 0;
  if (endian === Endian.Big) {
    for (let i = 0; i < 4; i++) {
      word += byteAt(str, index + i) << (24 - 8 * i);
    }
  }
  else {
    for (let i = 0; i < 4; i++) {
      word += byteAt(str, index + i) << 8 * i;
    }
  }
  return word;
}
function words32ToByteString(words32) {
  return words32.reduce((str, word) => str + word32ToByteString(word), '');
}
function word32ToByteString(word) {
  let str = '';
  for (let i = 0; i < 4; i++) {
    str += String.fromCharCode((word >>> 8 * (3 - i)) & 0xff);
  }
  return str;
}
function byteStringToHexString(str) {
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    const b = byteAt(str, i);
    hex += (b >>> 4).toString(16) + (b & 0x0f).toString(16);
  }
  return hex.toLowerCase();
}
