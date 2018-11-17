import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

const KEY_THEME = 'theme';
const VERSION = '2018-11-17';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private style: Element;
  private theme: Theme;
  private themeChange: EventEmitter<Theme> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.style = document.getElementById('bootstrap-theme');
    this.set((+localStorage.getItem(KEY_THEME) as Theme) || Theme.LIGHT);
  }

  is(theme: Theme) { return this.theme == theme }
  subscribe(handler: (theme: Theme) => void) { handler(this.theme); return this.themeChange.subscribe(handler); }
  toggle() { this.set(this.theme == Theme.LIGHT ? Theme.DARK : Theme.LIGHT) }

  private set(theme: Theme) {
    let url: string = null;

    if (theme == Theme.LIGHT) url = 'assets/themes/flatly.lib.css';
    if (theme == Theme.DARK)  url = 'assets/themes/darkly.lib.css';

    this.theme = theme;
    this.themeChange.emit(this.theme);

    this.http
      .get(url + '?version=' + VERSION, { responseType: "text" })
      .subscribe(value => this.style.innerHTML = value);

    localStorage.setItem(KEY_THEME, theme + '');
  }

}

export enum Theme {
  UNKNOWN, // Workaround due to 0 being considered false
  DARK,
  LIGHT
}
