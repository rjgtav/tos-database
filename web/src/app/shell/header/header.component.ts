import { Component} from '@angular/core';

const KEY_THEME = 'theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  $Theme = Theme;

  style: Element;
  theme: Theme;

  constructor() {
    this.style = document.getElementById('bootstrap-theme');
    this.setTheme((+localStorage.getItem(KEY_THEME) as Theme) || Theme.LIGHT);
  }

  toggleTheme() {
    this.setTheme(this.theme == Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }

  private setTheme(theme: Theme) {
    let href: string = null;

    if (theme == Theme.LIGHT) href = 'https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0/flatly/bootstrap.min.css';
    if (theme == Theme.DARK)  href = 'https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0/darkly/bootstrap.min.css';

    localStorage.setItem(KEY_THEME, theme + '');
    this.theme = theme;
    this.style.setAttribute('href', href)
  }

}

enum Theme {
  UNKNOWN, // Workaround due to 0 being considered false
  DARK,
  LIGHT
}
