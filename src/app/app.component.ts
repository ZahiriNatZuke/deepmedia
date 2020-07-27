import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {ThemeConfigService} from './services/theme-config.service';
import {NotificationService} from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentTheme: { theme: string } = this.themeConfigService.config;
  dontDrag: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private themeConfigService: ThemeConfigService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('X-Refresh-JWT'))
      this.authenticationService.POSTForRefreshJWT();
    this.notificationService.askForPermissions();
    this.notificationService.checkCurrentThemeFromTime();
  }

  catchEvent(event: boolean) {
    this.dontDrag = event;
  }
}
