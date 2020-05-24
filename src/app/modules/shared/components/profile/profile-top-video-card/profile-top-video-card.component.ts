import {Component, Input, OnInit} from '@angular/core';
import {faComment, faEye, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {Video} from '../../../../../models/video';

@Component({
  selector: 'app-profile-top-video-card',
  templateUrl: './profile-top-video-card.component.html',
  styleUrls: ['./profile-top-video-card.component.scss']
})
export class ProfileTopVideoCardComponent implements OnInit {
  @Input() video: Video;
  faThumbsUp = faThumbsUp;
  faEye = faEye;
  faComment = faComment;
  rowHeight: number;
  heightPoster: number;

  constructor() {
    this.getHeight();
    this.getPosterHeight();
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.getHeight();
    });
  }

  getHeight() {
    this.rowHeight = window.screen.availHeight * 35 / 100;
  }

  getPosterHeight() {
    this.heightPoster = Math.floor(window.screen.availHeight * 35 / 100);
  }

}
