import {Component, OnInit} from '@angular/core';
import {faThumbsUp, faComment, faHeart, faPlayCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faHeart = faHeart;
  faPlayCircle = faPlayCircle;

  constructor() {
  }

  ngOnInit(): void {
  }

}
