import {Component, OnInit} from '@angular/core';
import {
  faThumbsUp,
  faComment,
  faEye,
  faPlayCircle,
  faStar,
  faDownload,
  faInfoCircle,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../../environments/environment.prod';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit {
  video: { id: number, poster: string, video: string };
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faEye = faEye;
  faPlayCircle = faPlayCircle;
  faStar = faStar;
  faDownload = faDownload;
  faInfoCircle = faInfoCircle;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  info: JQuery<HTMLElement>;
  dateTime: JQuery<HTMLElement>;
  showInfo: boolean;
  showDateTime: boolean;

  constructor() {
    this.showDateTime = false;
    this.showInfo = false;
    this.video = {
      id: 1,
      video: 'http://streaming-uci.dev.com/Streaming-Symfony/web/uploads/video_file/video_389/1583974464.mp4',
      poster: 'http://streaming-uci.dev.com/Streaming-Symfony/web/uploads/video_images/video_389/1583974433.png'
    };
  }

  ngOnInit(): void {
    this.loadHTML();
    this.info.toggle(0);
    this.dateTime.toggle(0);
  }

  loadHTML() {
    this.info = $('#info');
    this.dateTime = $('#dateTime');
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
    this.info.toggle(650);
  }

  toggleDateTime() {
    this.showDateTime = !this.showDateTime;
    this.dateTime.toggle(650);
  }

  getToggleVideoSize(): boolean {
    return environment.expandedSidebar;
  }
}
