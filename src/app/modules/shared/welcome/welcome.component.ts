import {Component, OnInit} from '@angular/core';
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
export class WelcomeComponent implements OnInit {
  faPlayCircle = faPlayCircle;

  constructor() {
  }

  ngOnInit(): void {
  }

}
