import {Component, OnDestroy, OnInit} from '@angular/core';
import {Platform} from '@angular/cdk/platform';
import {Router} from '@angular/router';
import {CrudService} from "./services/crud.service";
import {API} from "./services/API";

const api = new API();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  checkPlatform: any;

  constructor(public platform: Platform,
              private routerActive: Router,
              private router: Router,
              private crudService: CrudService) {
    this.checkPlatform = setInterval(() => {
      if (this.platform.ANDROID || this.platform.IOS)
        this.routerActive.navigate(['/forbidden']).then();
    }, 50);
  }

  ngOnInit(): void {
    this.crudService.GETWithAuth(api.getRefreshJwtURL(), 'refresh')
      .subscribe(response => {
        sessionStorage.setItem('User-Auth', JSON.stringify(response['auth:user'].user));
        sessionStorage.setItem('X-Authentication-JWT', response['X-Authentication-JWT']);
        sessionStorage.setItem('X-Encode-ID', response['X-Encode-ID']);
        localStorage.setItem('X-Refresh-JWT', response['X-Refresh-JWT']);
        this.router.navigate(['/video/categories']).then();
      }, () => localStorage.clear());
  }

  ngOnDestroy(): void {
    clearInterval(this.checkPlatform);
  }
}
