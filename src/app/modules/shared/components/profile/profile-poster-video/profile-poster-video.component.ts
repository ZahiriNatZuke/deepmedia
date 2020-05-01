import {Component, Input, OnInit} from '@angular/core';
import {faPlayCircle, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-poster-video',
  templateUrl: './profile-poster-video.component.html',
  styleUrls: ['./profile-poster-video.component.scss']
})
export class ProfilePosterVideoComponent implements OnInit {
  faPlayCircle = faPlayCircle;
  faStar = faStar;
  @Input() heightPoster: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
