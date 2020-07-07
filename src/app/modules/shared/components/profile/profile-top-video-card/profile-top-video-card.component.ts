import {Component, Input, OnInit} from '@angular/core';
import {Video} from '../../../../../models/video';

@Component({
  selector: 'app-profile-top-video-card',
  templateUrl: './profile-top-video-card.component.html',
  styleUrls: ['./profile-top-video-card.component.scss']
})
export class ProfileTopVideoCardComponent implements OnInit {
  @Input() video: Video;
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
