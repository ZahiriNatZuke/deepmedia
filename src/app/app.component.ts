import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {ThemeConfigService} from './services/theme-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentTheme: { theme: string } = this.themeConfigService.config;

  constructor(private authenticationService: AuthenticationService,
              private themeConfigService: ThemeConfigService) {
  }

  ngOnInit(): void {
    this.authenticationService.POSTForRefreshJWT();
  }

}
