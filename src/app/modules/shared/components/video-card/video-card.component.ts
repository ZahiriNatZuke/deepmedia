import {Component, Input, OnInit} from '@angular/core';
import {faThumbsUp, faComment, faEye, faPlayCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import {Video} from "../../../../models/video";
import {environment} from "../../../../../environments/environment.prod";

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
  @Input() video: Video;
  URL_STORAGE = environment.URL_STORAGE;

  constructor() {
  }

  ngOnInit(): void {
  }

}
