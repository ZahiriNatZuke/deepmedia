import {Component, Input, OnInit} from '@angular/core';
import {faGamepad, faThumbsUp, faEye, faComment} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-top-video-card',
  templateUrl: './profile-top-video-card.component.html',
  styleUrls: ['./profile-top-video-card.component.scss']
})
export class ProfileTopVideoCardComponent implements OnInit {
  @Input() video: { id: number, video: string };
  faGamepad = faGamepad;
  faThumbsUp = faThumbsUp;
  faEye = faEye;
  faComment = faComment;
  rowHeight: number;

  constructor() {
    this.rowHeight = window.screen.availHeight * 35 / 100;
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      console.log('resize');
      this.rowHeight = window.screen.availHeight * 35 / 100;
    });
  }

}
