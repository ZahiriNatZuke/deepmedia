import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faAngleLeft, faAngleRight, faSave, faTrash} from '@fortawesome/free-solid-svg-icons';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {VideoPlayerComponent} from '../video-player/video-player.component';
import {CrudService} from '../../../../services/crud.service';
import {API} from '../../../../services/API';
import {Router} from '@angular/router';
import {HttpEventType} from '@angular/common/http';
import {VideoPlayer} from '../../../../models/video-player';
import {VideoService} from '../../../../services/video.service';
import {NotificationService} from '../../../../services/notification.service';
import {Video} from '../../../../models/video';

const api = new API();

@Component({
  selector: 'app-video-form-stepper',
  templateUrl: './video-form-stepper.component.html',
  styleUrls: ['./video-form-stepper.component.scss']
})
export class VideoFormStepperComponent implements OnInit {
  info: FormGroup;
  poster: FormGroup;
  video_src: FormGroup;
  videoObj: VideoPlayer = {id: 1, video: '', poster: '', type: ''};
  videoPlayer: VideoPlayerComponent;
  formData = new FormData();
  videoFile: File;
  posterFile: File;
  faSave = faSave;
  faTrash = faTrash;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  showVideoPlayer: boolean;
  showPoster: boolean;
  progressUpload: number = 0;
  randomNumber: number = 1;
  canReset: boolean;

  constructor(private _formBuilder: FormBuilder,
              private crudService: CrudService,
              private router: Router,
              private videoService: VideoService,
              private notificationService: NotificationService) {
    this.showVideoPlayer = false;
    this.showPoster = false;
    this.canReset = true;
    this.info = this._formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      state: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.poster = this._formBuilder.group({
      poster: ['', Validators.required],
    });
    this.video_src = this._formBuilder.group({
      video: ['', Validators.required],
      duration: ['']
    });
  }


  ngOnInit() {
  }

  getHeight(): number {
    return Math.floor(window.screen.availHeight * 36.5 / 100);
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
    const file: File = event.target.files[0];
    const checkSize: boolean = this.videoService.checkSize('poster', file.size);
    const checkMimeType: boolean = this.videoService.checkMimeType('poster', file.type);
    if (checkSize && checkMimeType) {
      this.posterFile = file;
      document.getElementById('label-poster-img').innerText = event.target.files[0].name;
      this.videoObj.poster = window.URL.createObjectURL(file);
      this.videoObj.id = this.randomNumber++;
      this.videoService.UpdateCurrentVideoPlayerValue(this.videoObj);
      setTimeout(() => {
        this.showPoster = true;
      }, 300);
    } else {
      const msg: string = `${!checkSize ? 'La imagen excede el límite de 10MB.\n' : ''}
                           ${!checkMimeType ? 'El formato de la imagen no es admisible.' : ''}`;
      this.notificationService.showNotification('Video Info', msg, 'warning');
    }
  }

  previewVideo(event: any) {
    const file: File = event.target.files[0];
    const checkSize: boolean = this.videoService.checkSize('video', file.size);
    const checkMimeType: boolean = this.videoService.checkMimeType('video', file.type);
    if (checkSize && checkMimeType) {
      this.videoFile = file;
      document.getElementById('label-video').innerText = event.target.files[0].name;
      this.videoObj.video = window.URL.createObjectURL(file);
      this.videoObj.id = this.randomNumber++;
      this.videoService.UpdateCurrentVideoPlayerValue(this.videoObj);
      setTimeout(() => {
        this.showVideoPlayer = true;
      }, 300);
    } else {
      const msg: string = `${!checkSize ? 'El video excede el límite de 300MB.\n' : ''}
                           ${!checkMimeType ? 'El formato del video no es admisible.' : ''}`;
      this.notificationService.showNotification('Video Info', msg, 'warning');
    }
  }

  sendData() {
    this.canReset = false;
    const info = this.info.value;
    const video = this.video_src.value;
    this.formData.append('title', info.title);
    this.formData.append('description', info.description);
    this.formData.append('state', info.state);
    this.formData.append('category', info.category);
    this.formData.append('poster', this.posterFile, this.posterFile.name);
    this.formData.append('video', this.videoFile, this.videoFile.name);
    this.formData.append('duration', video.duration);
    this.formData.append('type', this.videoFile.type);
    this.crudService.POSTForStore(api.getStoreVideoURL(), 'video', this.formData)
      .subscribe((events) => {
        if (events.type === HttpEventType.UploadProgress) {
          this.progressUpload = Math.round(events.loaded / events.total * 100);
        }
        if (events.type === HttpEventType.Response) {
          const newVideo: Video = events.body.video;
          this.videoService.UpdateCurrentVideoValue(newVideo);
          this.videoService.UpdateCurrentVideoPlayerValue({
            id: newVideo.id,
            poster: api.URL_STORAGE + newVideo.poster.path,
            video: api.URL_STORAGE + newVideo.video.path,
            type: newVideo.type
          });
          setTimeout(() => this.router.navigate(['/video/view', newVideo.id]).then(), 500);
        }
      });
  }

  resetForm(stepper: MatHorizontalStepper) {
    stepper.reset();
    this.videoObj = {id: 1, poster: '', video: '', type: ''};
    document.getElementById('label-poster-img').innerText = 'Poster del Video';
    document.getElementById('label-video').innerText = 'Video';
    this.showVideoPlayer = false;
    this.showPoster = false;
  }

  saveVideoPlayer(event: VideoPlayerComponent) {
    this.videoPlayer = event;
  }

  pauseVideo() {
    if (this.videoPlayer && this.videoPlayer.played) {
      this.videoPlayer.playPause();
    }
  }

  saveDurationVideo(event: number) {
    this.video_src.get('duration').setValue(event);
  }
}
