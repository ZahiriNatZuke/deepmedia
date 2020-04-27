import {Component, OnInit} from '@angular/core';
import {faThumbsUp, faComment, faEye, faPlayCircle, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faEye = faEye;
  faPlayCircle = faPlayCircle;
  faStar = faStar;

  constructor() {
  }

  ngOnInit(): void {
  }

}
