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
  viewTop: JQuery<HTMLElement>;
  showInfo: boolean;
  showDateTime: boolean;
  carouselHeight: number;
  carouselWidth: number;
  carouselWidthToggle: number;
  showVideoView: boolean;

  constructor() {
    this.showDateTime = false;
    this.showInfo = false;
    this.showVideoView = true;
    this.getWidth();
    this.getWidthToggle();
    this.getHeight();
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
    this.viewTop.toggle(0);
    window.addEventListener('resize', () => {
      this.getHeight();
      this.getWidth();
      this.getWidthToggle();
    });
  }

  loadHTML() {
    this.info = $('#info');
    this.dateTime = $('#dateTime');
    this.viewTop = $('#viewTop');
  }

  getHeight() {
    this.carouselHeight = window.screen.availHeight * 40 / 100;
  }

  getWidth() {
    this.carouselWidth = Math.floor(window.screen.availWidth * 38.1 / 100);
  }

  getWidthToggle() {
    this.carouselWidthToggle = Math.floor(window.screen.availWidth * 35.2 / 100);
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

  toggleVideoView() {
    this.showVideoView = !this.showVideoView;
    this.viewTop.toggle(500);
    setTimeout(() => {
      if (!this.showVideoView) {
        window.scroll({
          behavior: 'smooth',
          top: 1000,
          left: 0,
        });
      }
    }, 500);
  }
}
