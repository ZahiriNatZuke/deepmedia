import {Component, OnDestroy, OnInit} from '@angular/core';
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {slideInDown, slideInUp} from 'ng-animate';
import {transition, trigger, useAnimation} from '@angular/animations';

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

  constructor() {
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
