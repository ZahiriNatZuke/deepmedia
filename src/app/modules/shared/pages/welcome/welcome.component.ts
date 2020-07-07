import {Component, OnDestroy, OnInit} from '@angular/core';
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {slideInDown, slideInUp} from 'ng-animate';
import {transition, trigger, useAnimation} from '@angular/animations';
import {ThemeConfigService} from '../../../../services/theme-config.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
    trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))])
  ]
})
export class WelcomeComponent implements OnInit, OnDestroy {
  faPlayCircle = faPlayCircle;
  currentTheme: { theme: string } = this.themeConfigService.config;

  constructor(private themeConfigService: ThemeConfigService) {
    $('app-sidebar').toggleClass('d-none');
    $('#p-sidebar').toggleClass('p-sidebar');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    $('app-sidebar').toggleClass('d-none');
    $('#p-sidebar').toggleClass('p-sidebar');
  }

}
