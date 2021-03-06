import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {faPause, faPlay, faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {VideoPlayer} from '../../../../models/video-player';
import {VideoService} from '../../../../services/video.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnDestroy, OnChanges {
  videoPlayer: HTMLVideoElement;
  video: VideoPlayer;
  @Input() widthVideo: number;
  @Input() idCurrentVideo: number;
  @Output() videoPlayerEmitter: EventEmitter<VideoPlayerComponent>;
  @Output() durationVideoPlayerEmitter: EventEmitter<number>;
  @Output() playVideoEmitter: EventEmitter<boolean>;
  faPlay = faPlay;
  faPause = faPause;
  faPlayCircle = faPlayCircle;
  volumenControl: JQuery<HTMLElement>;
  volumenSlider: JQuery<HTMLElement>;
  controlBar: JQuery<HTMLElement>;
  videoPoster: JQuery<HTMLElement>;
  videoPlayerTag: HTMLElement;
  buttonPlay: HTMLElement;
  played: boolean;
  overSlider: boolean;
  mutedVideo: boolean;
  currentVolumen: number;
  currentTime: number;
  poster: boolean;
  placeBtnPlay: any;
  eventsCode = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Scape'];

  constructor(private videoService: VideoService, private titleService: Title) {
    this.videoService.currentVideoPlayer.subscribe(videoPlayer => this.video = videoPlayer);
    if (this.videoService.GetCurrentVideoValue)
      this.videoService.currentVideo.subscribe(video => this.titleService.setTitle(`#DeepMedia | ${video.title}`));
    this.videoPlayerEmitter = new EventEmitter();
    this.durationVideoPlayerEmitter = new EventEmitter();
    this.playVideoEmitter = new EventEmitter(true);
    this.poster = true;
    this.mutedVideo = false;
    this.currentVolumen = 50;
    this.currentTime = 0.0;
    this.placeBtnPlay = setInterval(() => this.onPlaceBtnPlay(), 500);
  }

  ngOnInit() {
    this.loadHTML();
    this.onPlaceBtnPlay();
    this.volumenSlider.fadeOut(0);
    this.addEventsListen();
  }

  loadHTML() {
    this.videoPlayerTag = document.getElementById(`video-${this.video.id}`);
    this.videoPlayer = this.videoPlayerTag.getElementsByClassName('video-player')[0] as HTMLVideoElement;
    this.controlBar = $(`#video-${this.video.id} #control-bar`);
    this.videoPoster = $(`#video-${this.video.id} #poster`);
    this.buttonPlay = this.videoPlayerTag.getElementsByClassName('btn-play')[0] as HTMLButtonElement;
    this.volumenControl = $(`#video-${this.video.id} #volumen-control`);
    this.volumenSlider = $(`#video-${this.video.id} #volumen-slider`);
  }

  addEventsListen() {
    this.videoPlayer.addEventListener('timeupdate', _ => this.currentTime = this.videoPlayer.currentTime);
    this.videoPlayer.addEventListener('dblclick', (event) => {
      event.preventDefault();
      this.playPause();
    });
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (this.eventsCode.includes(event.code) && (event.target === document.body || event.target === this.videoPlayerTag))
        event.preventDefault();
      this.events(event);
    });
    this.videoPlayerTag.addEventListener('wheel', (event) => {
      event.preventDefault();
      this.wheelEvent(event);
    });
  }

  makeBig() {
    this.videoPlayer.requestFullscreen({navigationUI: 'show'}).then();
  }

  playPause() {
    this.videoPlayer.paused ? this.played = true : this.played = false;
    this.videoPlayer.paused ? this.videoPlayer.play() : this.videoPlayer.pause();
    if (this.played) this.videoPlayerEmitter.emit(this);
  }

  seekingVideo(progress: number) {
    this.videoPlayer.currentTime = progress;
  }

  showVolumenSlider() {
    this.volumenSlider.fadeIn(200);
  }

  setVolumenSlider() {
    this.overSlider = true;
  }

  unsetVolumenSlider() {
    this.overSlider = false;
  }

  hideVolumenSlider() {
    if (!this.overSlider) this.volumenSlider.fadeOut(200);
  }

  changeVolumen(value: number) {
    this.currentVolumen = value;
  }

  toggleMutedVideo() {
    this.mutedVideo = !this.mutedVideo;
    this.mutedVideo ? this.videoPlayer.volume = 0 : this.videoPlayer.volume = this.currentVolumen / 100;
  }

  endVideo() {
    if (this.videoService.GetCurrentPlayListValue === null) {
      this.played = false;
      this.currentTime = 0;
    } else this.videoService.toBottomList(this.videoService.GetCurrentVideoValue);
  }

  events(event: KeyboardEvent) {
    if (this.videoService.GetCurrentVideoPictureValue === null) {
      if (event.code === 'Space' && (event.target === document.body || event.target === this.videoPlayerTag))
        this.poster ? this.hidePoster() : this.playPause();
      if (this.played) {
        switch (event.code) {
          case 'Enter':
            if (event.target === document.body || event.target === this.videoPlayerTag)
              this.makeBig();
            break;
          case 'Scape':
            this.videoPlayer.webkitExitFullscreen();
            break;
          case 'KeyM':
            if (event.target === document.body || event.target === this.videoPlayerTag)
              this.toggleMutedVideo();
            break;
          case 'ArrowUp':
            this.volumenUp();
            break;
          case 'ArrowRight':
            this.forwardVideo();
            break;
          case 'ArrowDown':
            this.volumenDown();
            break;
          case 'ArrowLeft':
            this.backwardVideo();
            break;
          default:
            break;
        }
      }
    }
  }

  volumenUp() {
    (this.currentVolumen + 2 <= 100) ? this.currentVolumen += 2 : this.currentVolumen = 100;
  }

  volumenDown() {
    (this.currentVolumen - 2 >= 0) ? this.currentVolumen -= 2 : this.currentVolumen = 0;
  }

  forwardVideo() {
    if (this.videoPlayer.currentTime + 5 <= this.videoPlayer.duration) this.videoPlayer.currentTime += 5;
    else this.videoPlayer.currentTime = this.videoPlayer.duration;
  }

  backwardVideo() {
    if (this.videoPlayer.currentTime - 5 >= 0) this.videoPlayer.currentTime -= 5;
    else this.videoPlayer.currentTime = 0;
  }

  wheelEvent($event: WheelEvent) {
    if (!this.mutedVideo) $event.deltaY < 0 ? this.volumenUp() : this.volumenDown();
  }

  setWidthProgressBar() {
    let percent;
    switch (this.widthVideo) {
      case 360:
        percent = 34;
        break;
      case 420:
        percent = 33.7;
        break;
      case 480:
        percent = 41.8;
        break;
      case 640:
        percent = 56.5;
        break;
      case 720:
        percent = 61.3;
        break;
      case 1080:
        percent = 74;
        break;
      default:
        percent = 56.5;
        break;
    }
    return (this.widthVideo * percent / 100) + 15;
  }

  setHeightPoster() {
    return this.widthVideo * 56.25 / 100;
  }

  onPlaceBtnPlay() {
    this.buttonPlay.style.left = `${this.widthVideo * 43 / 100}px`;
    this.buttonPlay.style.bottom = `${this.widthVideo * 22 / 100}px`;
    this.buttonPlay.style.fontSize = `${this.widthVideo * 15 / 100}px`;
    this.buttonPlay.style.width = `${this.widthVideo * 16 / 100}px`;
    this.buttonPlay.style.height = `${this.widthVideo * 16 / 100}px`;
  }

  hidePoster() {
    this.poster = false;
    this.videoPoster.fadeOut(800);
    setTimeout(() => {
      this.playPause();
      this.played = true;
      this.playVideoEmitter.emit(true);
    }, 850);
  }

  emitDurationVideo(event: any) {
    this.durationVideoPlayerEmitter.emit(event.target.duration);
  }

  ngOnDestroy(): void {
    clearInterval(this.placeBtnPlay);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.idCurrentVideo && !changes.idCurrentVideo.isFirstChange()) {
      this.videoPlayer.load();
      this.poster = false;
      this.videoPoster.fadeIn(300);
    }
  }

  checkVideoPicture() {
    return !(this.videoService.GetCurrentVideoPictureValue === null);
  }

  toPicture() {
    this.played = false;
    this.videoPlayer.pause();
    this.poster = false;
    this.videoPoster.fadeIn(300);
    setTimeout(() => this.videoService.UpdateCurrentVideoPictureValue({
      id: this.video.id,
      video: this.video.video,
      type: this.video.type,
      currentTime: this.videoPlayer.currentTime,
      currentVolumen: this.currentVolumen
    }), 300);
  }
}
