import {Component, OnInit} from '@angular/core';
import {faGamepad, faThumbsUp, faEye, faComment} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-top-video-card',
  templateUrl: './profile-top-video-card.component.html',
  styleUrls: ['./profile-top-video-card.component.scss']
})
export class ProfileTopVideoCardComponent implements OnInit {
  faGamepad = faGamepad;
  faThumbsUp = faThumbsUp;
  faEye = faEye;
  faComment = faComment;

  constructor() {
  }

  ngOnInit(): void {
  }

}
