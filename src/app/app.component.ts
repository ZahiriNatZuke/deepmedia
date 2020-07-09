import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {ThemeConfigService} from './services/theme-config.service';
import {NotificationService} from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentTheme: { theme: string } = this.themeConfigService.config;
  checkTime: any;

  constructor(private authenticationService: AuthenticationService,
              private themeConfigService: ThemeConfigService,
              private notificationService: NotificationService) {
    this.checkTime = setInterval(() => {
      if (!this.notificationService.checkTime())
        this.notificationService.checkCurrentThemeFromTime();
    }, 120000);
  }

  ngOnInit(): void {
    this.authenticationService.POSTForRefreshJWT();
    this.notificationService.askForPermissions();
    this.notificationService.checkCurrentThemeFromTime();
  }

  ngOnDestroy(): void {
    clearInterval(this.checkTime);
  }

}
