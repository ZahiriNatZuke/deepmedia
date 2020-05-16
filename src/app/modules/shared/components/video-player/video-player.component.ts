import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  faPlay, faPause, faVolumeUp,
  faVolumeDown, faVolumeMute,
  faVolumeOff, faPlayCircle
} from '@fortawesome/free-solid-svg-icons';
import {environment} from "../../../../../environments/environment.prod";
import {VideoPlayer} from "../../../../models/video-player";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  videoPlayer: HTMLVideoElement;
  @Input() widthVideo: number;
  @Input() video: VideoPlayer;
  @Output() videoPlayerEmitter: EventEmitter<VideoPlayerComponent>;
  @Output() durationVideoPlayerEmitter: EventEmitter<number>;
  faPlay = faPlay;
  faPause = faPause;
  faVolumeUp = faVolumeUp;
  faVolumeDown = faVolumeDown;
  faVolumeMute = faVolumeMute;
  faVolumeOff = faVolumeOff;
  faPlayCircle = faPlayCircle;
  volumenControl: JQuery<HTMLElement>;
  volumenSlider: JQuery<HTMLElement>;
  controlBar: JQuery<HTMLElement>;
  videoPoster: JQuery<HTMLElement>;
  buttonPlay: HTMLElement;
  played: boolean;
  overSlider: boolean;
  mutedVideo: boolean;
  currentVolumen: number;
  currentTime: number;
  poster: boolean;
  URL_ASSETS = environment.URL_ASSETS;
  placeBtnPlay: any;

  constructor() {
    this.videoPlayerEmitter = new EventEmitter();
    this.durationVideoPlayerEmitter = new EventEmitter();
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
    const videoPlayerTag = document.getElementById(`video-${this.video.id}`);
    this.videoPlayer = videoPlayerTag.getElementsByClassName('video-player')[0] as HTMLVideoElement;
    this.controlBar = $(`#video-${this.video.id} #control-bar`);
    this.videoPoster = $(`#video-${this.video.id} #poster`);
    this.buttonPlay = videoPlayerTag.getElementsByClassName('btn-play')[0] as HTMLButtonElement;
    this.volumenControl = $(`#video-${this.video.id} #volumen-control`);
    this.volumenSlider = $(`#video-${this.video.id} #volumen-slider`);
  }

  addEventsListen() {
    this.videoPlayer.addEventListener('timeupdate', () => {
      this.currentTime = this.videoPlayer.currentTime;
    });
    this.videoPlayer.addEventListener('dblclick', (event) => {
      event.preventDefault();
      this.playPause();
    });
    window.addEventListener('keydown', (event) => {
      const events = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (events.indexOf(event.code) !== -1 || event.keyCode === 27 || event.keyCode === 32 || event.keyCode === 13)
        event.preventDefault();
      this.events(event);
    });
    window.addEventListener('wheel', (event) => {
      this.wheelEvent(event);
    });
  }

  makeBig() {
    this.videoPlayer.requestFullscreen({
      navigationUI: 'show'
    }).then();
  }

  playPause() {
    this.videoPlayer.paused ? this.played = true : this.played = false;
    this.videoPlayer.paused ? this.videoPlayer.play() : this.videoPlayer.pause();
    if (this.played) {
      this.videoPlayerEmitter.emit(this);
    }
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
    if (!this.overSlider) {
      this.volumenSlider.fadeOut(200);
    }
  }

  changeVolumen(value: number) {
    this.currentVolumen = value;
  }

  toggleMutedVideo() {
    this.mutedVideo = !this.mutedVideo;
    this.mutedVideo ? this.videoPlayer.volume = 0 : this.videoPlayer.volume = this.currentVolumen / 100;
  }

  endVideo() {
    this.played = false;
    this.currentTime = 0;
  }

  events(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.poster ? this.hidePoster() : this.playPause();
    }
    if (this.played) {
      switch (event.code) {
        case 'Enter':
          this.makeBig();
          break;
        case 'Scape':
          document.exitFullscreen().then();
          break;
        case 'KeyM':
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

  volumenUp() {
    if (this.currentVolumen + 2 <= 100) {
      this.currentVolumen += 2;
    } else {
      this.currentVolumen = 100;
    }
  }

  volumenDown() {
    if (this.currentVolumen - 2 >= 0) {
      this.currentVolumen -= 2;
    } else {
      this.currentVolumen = 0;
    }
  }

  forwardVideo() {
    if (this.videoPlayer.currentTime + 5 <= this.videoPlayer.duration) {
      this.videoPlayer.currentTime += 5;
    } else {
      this.videoPlayer.currentTime = this.videoPlayer.duration;
    }
  }

  backwardVideo() {
    if (this.videoPlayer.currentTime - 5 >= 0) {
      this.videoPlayer.currentTime -= 5;
    } else {
      this.videoPlayer.currentTime = 0;
    }
  }

  wheelEvent($event: WheelEvent) {
    if (!this.mutedVideo) {
      $event.deltaY < 0 ? this.volumenUp() : this.volumenDown();
    }
  }

  setWidthProgressBar() {
    let percent;
    switch (this.widthVideo) {
      case 360:
        percent = 40;
        break;
      case 420:
        percent = 45;
        break;
      case 480:
        percent = 55;
        break;
      case 720:
        percent = 70;
        break;
      case 1080:
        percent = 80;
        break;
      case 1280:
        percent = 83;
        break;
      case 1920:
        percent = 88;
        break;
      case 3840:
        percent = 94;
        break;
      default:
        percent = 65;
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
    }, 850);
  }

  emitDurationVideo(event: any) {
    this.durationVideoPlayerEmitter.emit(event.target.duration);
  }

  ngOnDestroy(): void {
    clearInterval(this.placeBtnPlay);
  }
}
