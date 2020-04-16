import {Component, OnInit} from '@angular/core';
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {pulse, tada} from 'ng-animate';
import {transition, trigger, useAnimation} from '@angular/animations';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    trigger('pulse', [transition('* => *', useAnimation(pulse))]),
    trigger('tada', [transition('* => *', useAnimation(tada))])
  ]
})
export class WelcomeComponent implements OnInit {
  faPlayCircle = faPlayCircle;

  constructor() {
  }

  ngOnInit(): void {
  }

}
