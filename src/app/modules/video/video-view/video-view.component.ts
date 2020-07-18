import {Component, OnInit} from '@angular/core';
import {faAngleDown, faAngleUp, faEdit, faInfoCircle, faPlayCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../../../environments/environment.prod';
import {VideoPlayer} from '../../../models/video-player';
import {CrudService} from '../../../services/crud.service';
import {API} from '../../../services/API';
import {ActivatedRoute} from '@angular/router';
import {Video} from '../../../models/video';
import {AuthenticationService} from '../../../services/authentication.service';
import {Channel} from '../../../models/channel';
import {VideoService} from '../../../services/video.service';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {DownloadDialogComponent} from '../../shared/dialogs/download-dialog/download-dialog.component';
import {ThemeConfigService} from '../../../services/theme-config.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

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
  viewTop: JQuery<HTMLElement>;
  byViews: Video[];
  byLikes: Video[];
  URL_STORAGE = environment.URL_STORAGE;
  faPlayCircle = faPlayCircle;
  faStar = faStar;
  faInfoCircle = faInfoCircle;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faEdit = faEdit;
  showInfo: boolean;
  showDateTime: boolean;
  carouselHeight: number;
  carouselWidthToggle: number;
  showVideoView: boolean;
  tabGroupFocus: boolean;
  snackDownload: MatSnackBarRef<DownloadDialogComponent>;
  currentTheme: { theme: string } = this.themeConfigService.config;
  widthVideoFull: number;
  widthVideoToggle: number;

  constructor(private crudService: CrudService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private videoService: VideoService,
              private snackBar: MatSnackBar,
              private themeConfigService: ThemeConfigService,
              private breakpointObserver: BreakpointObserver) {
    this.showDateTime = false;
    this.showInfo = false;
    this.showVideoView = true;
    this.tabGroupFocus = false;
    this.getWidthToggle();
    this.getHeight();
    this.authenticationService.currentUser.subscribe(x => this.User_Channel = x);
    this.videoService.currentVideoPlayer.subscribe(videoPlayer => this.videoPlayer = videoPlayer);
    this.videoService.currentVideo.subscribe(video => this.Video = video);
    if (this.Video === null || this.Video === undefined)
      this.activatedRoute.params.subscribe(params => this.videoService.fetchVideo(params.id));
    this.crudService.GETWithOutAuth(api.getTopVideoURL()).subscribe(response => {
      this.byLikes = response.byLikes;
      this.byViews = response.byViews;
    });
  }

  ngOnInit(): void {
    this.watchMediaQuery();
    this.loadHTML();
    this.viewTop.toggle(0);
    window.addEventListener('resize', () => {
      this.watchMediaQuery();
      this.getHeight();
      this.getWidthToggle();
    });
  }

  loadHTML() {
    this.viewTop = $('#viewTop');
  }

  getHeight() {
    this.carouselHeight = window.screen.availHeight * 40 / 100;
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
    if (!this.showVideoView)
      setTimeout(() => window.scroll({
        behavior: 'smooth',
        top: 1000,
        left: 0,
      }), 500);
  }

  isFavorite(): boolean {
    if (this.User_Channel)
      return this.Video.favorite_for_who.map(channel => channel.id).includes(this.User_Channel.id);
    else
      return false;
  }

  isLiked(): boolean {
    if (this.User_Channel)
      return this.Video.likes.map(user => user.id).includes(this.User_Channel.id);
    else
      return false;
  }

  toggleFavorite() {
    this.crudService.POSTForLikeOrFavorite(api.getFavoriteURL(), this.Video.id.toString())
        .subscribe(response => this.Video.favorite_for_who = response.favoriteForWho);
  }

  toggleLike() {
    this.crudService.POSTForLikeOrFavorite(api.getLikeURL(), this.Video.id.toString())
        .subscribe(response => {
          this.Video.likes = response.likes;
          this.getStats();
        });
  }

  getStats() {
    this.crudService.GETWithOutAuth(api.getStatsVideoByIdURL(), this.Video.id.toString()).subscribe(response => {
      this.Video.comments_count = response.stats.comments;
      this.Video.likes_count = response.stats.likes;
      this.Video.views_count = response.stats.views;
      this.videoService.UpdateCurrentVideoValue(this.Video);
    });
  }

  makeView() {
    this.crudService.POSTForMakeView(api.getMakeViewURL(), this.Video.id.toString()).subscribe();
    this.Video.views_count++;
  }

  downloadVideo() {
    this.Video.downloads_count++;
    this.snackDownload = this.snackBar.openFromComponent(DownloadDialogComponent, {
      duration: -1,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      data: {video: this.Video, from: this},
      panelClass: this.currentTheme.theme
    });
  }

  private watchMediaQuery() {
    this.breakpointObserver.observe(['all and (max-width: 575.98px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.widthVideoFull = 420;
            this.widthVideoToggle = 360;
          }
        });
    this.breakpointObserver.observe(['all and (min-width: 576px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.widthVideoFull = 420;
            this.widthVideoToggle = 360;
          }
        });
    this.breakpointObserver.observe(['all and (min-width: 768px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.widthVideoFull = 640;
            this.widthVideoToggle = 480;
          }
        });
    this.breakpointObserver.observe(['all and (min-width: 992px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.widthVideoFull = 720;
            this.widthVideoToggle = 640;
          }
        });
    this.breakpointObserver.observe(['all and (min-width: 1200px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.widthVideoFull = 640;
            this.widthVideoToggle = 480;
          }
        });
    this.breakpointObserver.observe(['all and (min-width: 1300px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.widthVideoFull = 720;
            this.widthVideoToggle = 640;
          }
        });
    this.breakpointObserver.observe(['all and (min-width: 1920px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.widthVideoFull = 1080;
            this.widthVideoToggle = 1080;
          }
        });
  }
}
