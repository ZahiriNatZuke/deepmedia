import {Component, OnInit} from '@angular/core';
import {VideoService} from '../../../../services/video.service';
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons';
import {VideoPicture} from '../../../../models/video-picture';

@Component({
  selector: 'app-video-picture',
  templateUrl: './video-picture.component.html',
  styleUrls: ['./video-picture.component.scss']
})
export class VideoPictureComponent implements OnInit {
  videoPicture: VideoPicture;
  videoPictureHTML: HTMLVideoElement;
  videoPictureTag: HTMLElement;
  faPlay = faPlay;
  faPause = faPause;
  volumenControl: JQuery<HTMLElement>;
  volumenSlider: JQuery<HTMLElement>;
  controlBar: JQuery<HTMLElement>;
  played: boolean;
  overSlider: boolean;
  mutedVideo: boolean;
  currentVolumen: number;
  currentTime: number;
  eventsCode: string[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Scape'];

  constructor(private videoService: VideoService) {
    this.videoService.currentVideoPicture.subscribe(videoPicture => {
      if (videoPicture !== null && videoPicture !== undefined) {
        this.videoPicture = videoPicture;
        this.currentVolumen = videoPicture.currentVolumen;
        this.currentTime = videoPicture.currentTime;
        this.videoPictureHTML.currentTime = videoPicture.currentTime;
        $('app-video-picture').removeClass('d-none');
        this.videoPictureHTML.load();
        this.videoPictureHTML.play().then();
        this.played = true;
      }
    });
    this.mutedVideo = false;
    this.played = false;
    this.currentVolumen = 50;
    this.currentTime = 0;
  }

  ngOnInit(): void {
    this.loadHTML();
    this.volumenSlider.fadeOut(0);
    this.addEventsListen();
  }

  loadHTML() {
    this.videoPictureTag = document.getElementById('video-picture');
    this.videoPictureHTML = this.videoPictureTag.getElementsByClassName('video-picture')[0] as HTMLVideoElement;
    this.controlBar = $(`#video-picture #control-bar-picture`);
    this.volumenControl = $(`#video-picture #volumen-control-picture`);
    this.volumenSlider = $(`#video-picture #volumen-slider-picture`);
  }

  addEventsListen() {
    this.videoPictureHTML.addEventListener('timeupdate', _ => this.currentTime = this.videoPictureHTML.currentTime);
    this.videoPictureHTML.addEventListener('dblclick', (event) => {
      event.preventDefault();
      this.playPause();
    });
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (this.eventsCode.includes(event.code) && (event.target === document.body || event.target === this.videoPictureTag))
        event.preventDefault();
      this.events(event);
    });
    this.videoPictureTag.addEventListener('wheel', (event) => {
      event.preventDefault();
      this.wheelEvent(event);
    });
  }

  makeBig() {
    this.videoPictureHTML.requestFullscreen({navigationUI: 'show'}).then();
  }

  seekingVideo(progress: number) {
    this.videoPictureHTML.currentTime = progress;
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
    this.mutedVideo ? this.videoPictureHTML.volume = 0 : this.videoPictureHTML.volume = this.currentVolumen / 100;
  }

  events(event: KeyboardEvent) {
    if (event.code === 'Space' && (event.target === document.body || event.target === this.videoPictureTag)) {
      event.preventDefault();
      this.playPause();
    }
    if (this.played) {
      switch (event.code) {
        case 'Enter':
          if (event.target === document.body || event.target === this.videoPictureTag)
            this.makeBig();
          break;
        case 'Scape':
          this.videoPictureHTML.webkitExitFullscreen();
          break;
        case 'KeyM':
          if (event.target === document.body || event.target === this.videoPictureTag)
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
    (this.currentVolumen + 2 <= 100) ? this.currentVolumen += 2 : this.currentVolumen = 100;
  }

  volumenDown() {
    (this.currentVolumen - 2 >= 0) ? this.currentVolumen -= 2 : this.currentVolumen = 0;
  }

  playPause() {
    this.videoPictureHTML.paused ? this.played = true : this.played = false;
    this.videoPictureHTML.paused ? this.videoPictureHTML.play() : this.videoPictureHTML.pause();
  }

  forwardVideo() {
    if (this.videoPictureHTML.currentTime + 5 <= this.videoPictureHTML.duration)
      this.videoPictureHTML.currentTime += 5;
    else this.videoPictureHTML.currentTime = this.videoPictureHTML.duration;
  }

  backwardVideo() {
    if (this.videoPictureHTML.currentTime - 5 >= 0) this.videoPictureHTML.currentTime -= 5;
    else this.videoPictureHTML.currentTime = 0;
  }

  wheelEvent($event: WheelEvent) {
    if (!this.mutedVideo) $event.deltaY < 0 ? this.volumenUp() : this.volumenDown();
  }

  endVideo() {
    this.videoPictureHTML.pause();
    $('app-video-picture').addClass('d-none');
    this.videoPictureHTML.currentTime = 0;
    this.videoService.UpdateCurrentVideoPictureValue(null);
  }
}
