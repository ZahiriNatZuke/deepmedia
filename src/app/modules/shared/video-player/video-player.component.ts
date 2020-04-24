import {Component, Input, OnInit} from '@angular/core';
import {faPlay, faPause, faVolumeUp, faVolumeDown, faVolumeMute, faVolumeOff, faPlayCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  videoPlayer: HTMLVideoElement;
  @Input() widthVideo: number;
  @Input() video: { id: number, video: string };
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
  progressBar: HTMLElement;
  played: boolean;
  overSlider: boolean;
  mutedVideo: boolean;
  currentVolumen: number;
  currentTime: number;
  poster: boolean;

  constructor() {
    this.poster = true;
    this.mutedVideo = false;
    this.currentVolumen = 50;
    this.currentTime = 0.0;
  }

  ngOnInit(): void {
    this.loadHTML();
    this.setWidth();
    this.onPlaceBtnPlay();
    this.volumenSlider.fadeOut(0);
    this.addEventsListen();
  }

  loadHTML() {
    this.videoPlayer = document.getElementById(`video-player`) as HTMLVideoElement;
    this.controlBar = $(`#control-bar`);
    this.videoPoster = $(`#poster`);
    this.buttonPlay = document.getElementById(`btn-play`);
    this.volumenControl = $(`#volumen-control`);
    this.volumenSlider = $(`#volumen-slider`);
    this.progressBar = document.getElementById(`progress-bar-video`);
  }

  addEventsListen() {
    this.videoPlayer.addEventListener('timeupdate', () => {
      this.currentTime = this.videoPlayer.currentTime;
    });
    window.addEventListener('keydown', (event) => {
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

  setWidth() {
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
    this.progressBar.style.width = `${this.widthVideo * percent / 100}px`;
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
}
