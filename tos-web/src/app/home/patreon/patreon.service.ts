import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {InstallService} from "../../shared/service/install.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ArrayUtils} from "../../shared/utils/array-utils";
import {TOSUrlService} from "../../shared/service/tos-url.service";

const KEY_PATREON = 'patreon';

@Injectable({
  providedIn: 'root'
})
export class PatreonService {

  private readonly patrons: ReplaySubject<PatronsByTier> = new ReplaySubject(1);

  constructor(
    private http: HttpClient,
    private install: InstallService
  ) {
    this.install.complete$.subscribe(value => this.http.get<PatronsByTier>(TOSUrlService.Asset('patreon.json.js')).subscribe(value => {
      Object
        .keys(PatreonTier)
        .forEach(key => value[key] = value[key] || []);

      this.patrons.next(value)
    }));
  }

  patreonShow() { return localStorage.getItem(KEY_PATREON) == null || new Date(localStorage.getItem(KEY_PATREON)) < new Date() }
  patreonDismiss() {
    // Dismiss for 5-10 days
    let dismiss = new Date();
        dismiss.setDate(dismiss.getDate() + (5 + Math.round(Math.random() * 5)));

    localStorage.setItem(KEY_PATREON, dismiss.toISOString());
  }

  get patrons$() { return this.patrons.pipe(map(patrons => ArrayUtils.flatten(Object.keys(patrons).map(key => patrons[key]) as string[][]))) }
  get patrons$ByTier() { return this.patrons.asObservable() }

  patrons$Random(count) {
    return this.patrons$.pipe(map(value => {
      let result = count >= value.length ? value : [];

      if (result.length == 0) {
        while (count > 0) {
          let random = value[Math.floor(Math.random() * value.length)];

          if (result.indexOf(random) == -1) {
            result.push(random);
            count --;
          }
        }
      }

      return {
        total: value.length,
        result
      };
    }));
  }

}

export enum PatreonTier {
  KEPA = 100,
  TINI = 500,
  POPOLION = 1000,
  KUPOLE = 2000,
}

export type PatronsByTier = {
  [key in PatreonTier]: string[]
}
