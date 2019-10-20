import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs";

const KEY_THEME = 'theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private change: ReplaySubject<Theme> = new ReplaySubject(1);
  private style: Element;

  constructor() {
    this.style = document.getElementById('bootstrap-theme');
    this.set(localStorage.getItem(KEY_THEME) as Theme);
  }

  get change$() { return this.change.asObservable() }

  is(theme: Theme) { return this.get() == theme }
  toggle() { this.set(this.get() == Theme.LIGHT ? Theme.DARK : Theme.LIGHT) }

  private get() { return window['getTheme']() as Theme }
  private set(theme: Theme ) {
    window['setTheme'](theme);
    this.change.next(theme);
  }

}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}
