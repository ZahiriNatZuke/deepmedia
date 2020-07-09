import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ThemeConfigService {
  public config = {theme: 'light-theme'};

  constructor() {
    if (localStorage.getItem('config-theme')) {
      this.config.theme = localStorage.getItem('config-theme');
      localStorage.setItem('time-theme', JSON.stringify({checked: false}));
    } else {
      if (moment().hours() <= 8 || moment().hours() >= 20) {
        localStorage.setItem('config-theme', 'dark-theme');
        this.config.theme = 'dark-theme';
      }
      if (moment().hours() > 8 && moment().hours() < 20) {
        localStorage.setItem('config-theme', 'light-theme');
        this.config.theme = 'light-theme';
      }
      localStorage.setItem('time-theme', JSON.stringify({checked: true}));
      localStorage.setItem('config-theme', this.config.theme);
    }
  }

  setDarkTheme() {
    this.config.theme = 'dark-theme';
    localStorage.setItem('config-theme', this.config.theme);
    localStorage.setItem('time-theme', JSON.stringify({checked: false}));
  }

  setLightTheme() {
    this.config.theme = 'light-theme';
    localStorage.setItem('config-theme', this.config.theme);
    localStorage.setItem('time-theme', JSON.stringify({checked: false}));
  }

}
