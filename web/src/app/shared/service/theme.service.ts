import {EventEmitter, Injectable} from '@angular/core';

const KEY_THEME = 'theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private style: Element;
  private theme: Theme;
  private themeChange: EventEmitter<Theme> = new EventEmitter();

  constructor() {
    this.style = document.getElementById('bootstrap-theme');
    this.set((+localStorage.getItem(KEY_THEME) as Theme) || Theme.LIGHT);
  }

  is(theme: Theme) { return this.theme == theme }
  subscribe(handler: (theme: Theme) => void) { handler(this.theme); return this.themeChange.subscribe(handler); }
  toggle() { this.set(this.theme == Theme.LIGHT ? Theme.DARK : Theme.LIGHT) }

  private set(theme: Theme) {
    let href: string = this.style.getAttribute('href');
    let version: string = href.slice(href.indexOf('?version='));

    if (theme == Theme.LIGHT) href = 'assets/themes/flatly.lib.css';
    if (theme == Theme.DARK)  href = 'assets/themes/darkly.lib.css';


    this.theme = theme;
    this.themeChange.emit(this.theme);
    this.style.setAttribute('href', href + version);

    localStorage.setItem(KEY_THEME, theme + '');
  }

}

export enum Theme {
  UNKNOWN, // Workaround due to 0 being considered false
  DARK,
  LIGHT
}
