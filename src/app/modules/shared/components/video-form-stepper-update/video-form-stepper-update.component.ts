import {Component, OnInit} from '@angular/core';
import {VideoPlayerComponent} from '../video-player/video-player.component';
import {HttpEventType} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from 'src/app/services/crud.service';
import {VideoService} from 'src/app/services/video.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VideoPlayer} from 'src/app/models/video-player';
import {faAngleLeft, faAngleRight, faSave} from '@fortawesome/free-solid-svg-icons';
import {API} from 'src/app/services/API';
import {Video} from 'src/app/models/video';
import {NotificationService} from '../../../../services/notification.service';

const api = new API();

@Component({
  selector: 'app-video-form-stepper-update',
  templateUrl: './video-form-stepper-update.component.html',
  styleUrls: ['./video-form-stepper-update.component.scss']
})
export class VideoFormStepperUpdateComponent implements OnInit {
  info: FormGroup;
  poster: FormGroup;
  Video: Video;
  video_src: FormGroup;
  videoObj: VideoPlayer;
  videoPlayer: VideoPlayerComponent;
  formData = new FormData();
  videoFile: File;
  posterFile: File;
  faSave = faSave;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  showVideoPlayer: boolean;
  showPoster: boolean;
  progressUpload: number = 0;
  randomNumber: number = 1;

  constructor(private _formBuilder: FormBuilder,
              private crudService: CrudService,
              private router: Router,
              private videoService: VideoService,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
    this.videoService.currentVideo.subscribe(video => this.Video = video);
    this.videoService.currentVideoPlayer.subscribe(videoPlayer => this.videoObj = videoPlayer);
    this.info = this._formBuilder.group({
      title: [this.Video.title, [Validators.required]],
      description: [this.Video.description, Validators.required],
      state: [this.Video.state, Validators.required],
      category: [this.Video.category, Validators.required],
    });
    this.poster = this._formBuilder.group({
      poster: [''],
    });
    this.video_src = this._formBuilder.group({
      video: [''],
      duration: ['']
    });
    this.showVideoPlayer = false;
    this.showPoster = false;
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
    const file = event.target.files[0];
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
      const msg: string = `${!checkSize ? 'La nueva imagen excede el límite de 10MB.\n' : ''}
                           ${!checkMimeType ? 'El formato de la nueva imagen no es admisible.' : ''}`;
      this.notificationService.showNotification('Video Info', msg, 'warning');
    }
  }

  previewVideo(event: any) {
    const file = event.target.files[0];
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
      const msg: string = `${!checkSize ? 'El nuevo video excede el límite de 300MB.\n' : ''}
                           ${!checkMimeType ? 'El formato del nuevo video no es admisible.' : ''}`;
      this.notificationService.showNotification('Video Info', msg, 'warning');
    }
  }

  sendData() {
    this.formData.append('_method', 'PATCH');
    if (!this.info.pristine) {
      const info = this.info.value;
      if (!this.info.get('title').pristine) this.formData.append('title', info.title);
      if (!this.info.get('description').pristine) this.formData.append('description', info.description);
      if (!this.info.get('state').pristine) this.formData.append('state', info.state);
      if (!this.info.get('category').pristine) this.formData.append('category', info.category);
    }
    if (!this.poster.pristine && this.posterFile) {
      this.formData.append('poster', this.posterFile, this.posterFile.name);
    }
    if (!this.video_src.pristine && this.videoFile) {
      this.formData.append('duration', this.video_src.get('duration').value);
      this.formData.append('type', this.videoFile.type);
      this.formData.append('video', this.videoFile, this.videoFile.name);
    }
    if (!this.info.pristine || !this.poster.pristine || !this.video_src.pristine)
      this.crudService.POSTForUpdate(api.getVideoURL(), 'video', this.formData, this.Video.id.toString())
        .subscribe((events) => {
          if (events.type === HttpEventType.UploadProgress) {
            this.progressUpload = Math.round(events.loaded / events.total * 100);
          }
          if (events.type === HttpEventType.Response) {
            const video: Video = events.body.video;
            this.videoService.UpdateCurrentVideoValue(video);
            this.videoService.UpdateCurrentVideoPlayerValue({
              id: video.id,
              poster: api.URL_STORAGE + video.poster.path,
              video: api.URL_STORAGE + video.video.path,
              type: video.type
            });
            setTimeout(() => this.router.navigate(['/video/view', video.id]).then(), 350);
          }
        });
    else
      this.notificationService.showNotification('Video Info', 'Por Favor Modifique Algún Campo', 'warning');
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
