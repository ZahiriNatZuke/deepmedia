import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faSave, faTrash, faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {VideoPlayerComponent} from '../video-player/video-player.component';

@Component({
  selector: 'app-video-form-stepper',
  templateUrl: './video-form-stepper.component.html',
  styleUrls: ['./video-form-stepper.component.scss']
})
export class VideoFormStepperComponent implements OnInit, AfterViewInit {
  info: FormGroup;
  poster: FormGroup;
  video_src: FormGroup;
  videoObj = {id: 1, video: '', poster: ''};
  showVideoPlayer: boolean;
  faSave = faSave;
  faTrash = faTrash;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  videoPlayer: VideoPlayerComponent;

  constructor(private _formBuilder: FormBuilder) {
    this.showVideoPlayer = false;
    this.info = this._formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      status: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.poster = this._formBuilder.group({
      image: ['', Validators.required],
    });
    this.video_src = this._formBuilder.group({
      video: ['', Validators.required]
    });
  }


  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('#poster-img').css({
      height: `${Math.floor(window.screen.availHeight * 36.5 / 100)}px`,
      display: 'none'
    });
    $('#b-video').css({
      height: `${Math.floor(window.screen.availHeight * 36.5 / 100)}px`,
    });
  }

  checkValid(group: string, input: string) {
    switch (group) {
      case 'info':
        return this.info.get(input).invalid;
      case 'poster':
        return this.poster.get(input).invalid;
      case 'video_src':
        return this.video_src.get(input).invalid;
      default:
        break;
    }
  }

  checkRequired(group: string, input: string) {
    switch (group) {
      case 'info':
        return this.info.get(input).hasError('required') ? 'Este campo no puede estar vacío' : '';
      case 'poster':
        return this.poster.get(input).hasError('required') ? 'Este campo no puede estar vacío' : '';
      case 'video_src':
        return this.video_src.get(input).hasError('required') ? 'Este campo no puede estar vacío' : '';
      default:
        break;
    }
  }

  previewPoster(event: any) {
    const file = event.target.files[0];
    const poster_img = document.getElementById('poster-img') as HTMLImageElement;
    document.getElementById('label-poster-img').innerText = event.target.files[0].name;
    this.videoObj.poster = window.URL.createObjectURL(file);
    poster_img.style.display = 'initial';
  }

  previewVideo(event: any) {
    const file = event.target.files[0];
    document.getElementById('label-video').innerText = event.target.files[0].name;
    this.videoObj.video = window.URL.createObjectURL(file);
    setTimeout(() => {
      this.showVideoPlayer = true;
    }, 300);
  }

  sendData() {
    console.log(this.info.value, this.poster.value, this.video_src.value);
  }

  resetForm(stepper: MatHorizontalStepper) {
    stepper.reset();
    this.videoObj = {id: 1, poster: '', video: ''};
    const poster_img = document.getElementById('poster-img') as HTMLImageElement;
    poster_img.style.display = 'none';
    this.showVideoPlayer = false;
  }

  saveVideoPlayer(event: VideoPlayerComponent) {
    this.videoPlayer = event;
  }

  pauseVideo() {
    if (this.videoPlayer && this.videoPlayer.played) {
      this.videoPlayer.playPause();
    }
  }
}
