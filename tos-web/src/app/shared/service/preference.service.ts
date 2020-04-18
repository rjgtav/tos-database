import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  private readonly $change: { [key in Preference]: ReplaySubject<any> } = {} as any;
  private readonly $default: { [key in Preference]: any } = {
    [Preference['3D']]: Preference3D.YES,
    [Preference.THEME]: PreferenceTheme.LIGHT,
  };

  constructor() { }

  get3D() { return this.get(Preference['3D']) as Preference3D }
  getTheme() { return this.get(Preference.THEME) as PreferenceTheme }

  get3D$() { return this.get$(Preference['3D']) as Observable<Preference3D> }
  getTheme$() { return this.get$(Preference.THEME) as Observable<PreferenceTheme> }

  set3D(value: Preference3D) { this.set(Preference['3D'], value) }
  setTheme(value: PreferenceTheme) { this.set(Preference.THEME, value) }

  private change(key: Preference) {
    let subject = this.$change[key];

    if (subject == undefined) {
      subject = this.$change[key] = new ReplaySubject<any>(1);
      subject.next(this.get(key));
    }

    return subject;
  }

  private get(key: Preference) { return window['getPreference'](key, this.$default[key]) }
  private get$(key: Preference) { return this.change(key).asObservable() }

  private set(key: Preference, value: string) {
    if (value == this.get(key))
      return;

    window['setPreference'](key, value);
    this.change(key).next(value);
  }

}

export enum Preference {
  "3D" = 'preference.3d',
  "THEME" = 'preference.theme',
}

export enum Preference3D {
  NO = 'No',
  YES = 'Yes',
}

export enum PreferenceTheme {
  DARK = 'Dark',
  LIGHT = 'Light',
}
