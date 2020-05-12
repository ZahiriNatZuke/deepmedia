import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faThumbsUp, faComment, faEye, faPlayCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import {Video} from "../../../../../models/video";
import {environment} from "../../../../../../environments/environment.prod";

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
  @Input() Video: Video;
  URL_STORAGE: string = environment.URL_STORAGE;

  constructor() {
    this.linkToPlay = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  emitPlayVideo() {
    this.linkToPlay.emit(true);
  }
}
