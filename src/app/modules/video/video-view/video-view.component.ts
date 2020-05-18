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
import {AuthenticationService} from "../../../services/authentication.service";
import {Channel} from "../../../models/channel";

const api = new API();

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit {
  User_Channel: Channel;
  Video: Video;
  videoPlayer: VideoPlayer = null;
  progressBar: JQuery<HTMLElement>;
  viewTop: JQuery<HTMLElement>;
  byViews: Video[];
  byLikes: Video[];
  idVideo: string;
  URL_STORAGE = environment.URL_STORAGE;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faEye = faEye;
  faPlayCircle = faPlayCircle;
  faStar = faStar;
  faDownload = faDownload;
  faInfoCircle = faInfoCircle;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  showInfo: boolean;
  showDateTime: boolean;
  carouselHeight: number;
  carouselWidth: number;
  carouselWidthToggle: number;
  showVideoView: boolean;

  constructor(private crudService: CrudService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    this.showDateTime = false;
    this.showInfo = false;
    this.showVideoView = true;
    this.getWidth();
    this.getWidthToggle();
    this.getHeight();
    this.authenticationService.currentUser.subscribe(x => this.User_Channel = x);
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.idVideo = id;
      this.crudService.GETWithOutAuth(api.getVideoURL(), id)
        .subscribe(response => {
          this.Video = response.video;
          this.videoPlayer = {
            id: this.Video.id,
            video: this.URL_STORAGE + this.Video.video.path,
            poster: this.URL_STORAGE + this.Video.poster.path
          };
          this.progressBar.toggle(400);
        });
    });
    this.crudService.GETWithOutAuth(api.getTopVideoURL()).subscribe(response => {
      this.byLikes = response.byLikes;
      this.byViews = response.byViews;
    })
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

  isFavorite(): boolean {
    if (this.User_Channel)
      return this.Video.favorite_for_who.map(channel => channel.id).indexOf(this.User_Channel.id) >= 0;
    else
      return false;
  }

  isLiked(): boolean {
    if (this.User_Channel)
      return this.Video.likes.map(user => user.id).indexOf(this.User_Channel.id) >= 0;
    else
      return false;
  }

  toggleFavorite() {
    this.crudService.POSTForLikeOrFavorite(api.getFavoriteURL(), this.idVideo)
      .subscribe(response => {
        this.Video.favorite_for_who = response.favoriteForWho;
      });
  }

  toggleLike() {
    this.crudService.POSTForLikeOrFavorite(api.getLikeURL(), this.idVideo)
      .subscribe(response => {
        this.Video.likes = response.likes;
        this.getStats();
      });
  }

  getStats() {
    this.crudService.GETWithOutAuth(api.getStatsVideoByIdURL(), this.idVideo).subscribe(response => {
      this.Video.comments_count = response.stats.comments;
      this.Video.likes_count = response.stats.likes;
      this.Video.views_count = response.stats.views;
    });
  }

}
