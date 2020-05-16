import {Component, OnInit} from '@angular/core';
import {
  faThumbsUp, faComment, faEye, faPlayCircle, faAngleUp,
  faStar, faDownload, faInfoCircle, faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../../environments/environment.prod';
import {VideoPlayer} from "../../../models/video-player";
import {CrudService} from "../../../services/crud.service";
import {API} from "../../../services/API";
import {ActivatedRoute} from "@angular/router";
import {Video} from "../../../models/video";

const api = new API();

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit {
  Video: Video;
  videoPlayer: VideoPlayer = null;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faEye = faEye;
  faPlayCircle = faPlayCircle;
  faStar = faStar;
  faDownload = faDownload;
  faInfoCircle = faInfoCircle;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  viewTop: JQuery<HTMLElement>;
  progressBar: JQuery<HTMLElement>;
  showInfo: boolean;
  showDateTime: boolean;
  carouselHeight: number;
  carouselWidth: number;
  carouselWidthToggle: number;
  showVideoView: boolean;
  URL_STORAGE = environment.URL_STORAGE;

  constructor(private crudService: CrudService, private activatedRoute: ActivatedRoute) {
    this.showDateTime = false;
    this.showInfo = false;
    this.showVideoView = true;
    this.getWidth();
    this.getWidthToggle();
    this.getHeight();
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.crudService.GETWithOutAuth(api.getVideoURL(), id)
        .subscribe(response => {
          this.Video = response.video;
          this.videoPlayer = {
            id: this.Video.id,
            video: this.URL_STORAGE + this.Video.video.path,
            poster: this.URL_STORAGE + this.Video.poster.path
          };
          this.progressBar.fadeOut(400);
        });
    });
  }

  ngOnInit(): void {
    this.loadHTML();
    this.viewTop.toggle(0);
    window.addEventListener('resize', () => {
      this.getHeight();
      this.getWidth();
      this.getWidthToggle();
    });
  }

  loadHTML() {
    this.viewTop = $('#viewTop');
    this.progressBar = $('mat-progress-bar');
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
