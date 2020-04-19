import {Component, Input, OnInit} from '@angular/core';
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-list-info',
  templateUrl: './profile-list-info.component.html',
  styleUrls: ['./profile-list-info.component.scss']
})
export class ProfileListInfoComponent implements OnInit {
  @Input() icon;
  @Input() statsName;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  up: boolean;

  constructor() {
    this.up = true;
  }

  ngOnInit(): void {
  }

}
