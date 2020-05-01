import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faThumbsUp, faComment, faEye, faPlayCircle, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-video-card',
  templateUrl: './profile-video-card.component.html',
  styleUrls: ['./profile-video-card.component.scss']
})
export class ProfileVideoCardComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faEye = faEye;
  faPlayCircle = faPlayCircle;
  faStar = faStar;
  @Output() linkToPlay: EventEmitter<boolean>;

  constructor() {
    this.linkToPlay = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  emitPlayVideo() {
    this.linkToPlay.emit(true);
  }
}
