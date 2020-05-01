import {Component, OnDestroy, OnInit} from '@angular/core';
import {Platform} from '@angular/cdk/platform';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  checkPlatform: any;

  constructor(public platform: Platform, private routerActive: Router) {
    this.checkPlatform = setInterval(() => {
      if (this.platform.ANDROID || this.platform.IOS)
        this.routerActive.navigate(['/forbidden']).then();
    }, 50);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    clearInterval(this.checkPlatform);
  }
}
