import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeConfigService {
  public config = {
    theme: 'light-theme'
  };

  constructor() {
    if (localStorage.getItem('config-theme')) {
      this.config.theme = localStorage.getItem('config-theme');
    } else {
      localStorage.setItem('config-theme', this.config.theme);
    }
    if (!localStorage.getItem('time-theme')) {
      localStorage.setItem('time-theme', JSON.stringify({
        checked: false
      }));
    }
  }

  setDarkTheme() {
    this.config.theme = 'dark-theme';
    localStorage.setItem('config-theme', this.config.theme);
  }

  setLightTheme() {
    this.config.theme = 'light-theme';
    localStorage.setItem('config-theme', this.config.theme);
  }

}
