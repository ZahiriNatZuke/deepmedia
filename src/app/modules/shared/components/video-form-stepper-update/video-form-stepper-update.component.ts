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
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {AuthenticationService} from '../../../../services/authentication.service';
import {Channel} from '../../../../models/channel';
import * as fileSize from 'filesize';
import {StepperSelectionEvent} from '@angular/cdk/stepper';

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
  User_Channel: Channel;
  formData = new FormData();
  videoFile: File;
  posterFile: File;
  mode: ProgressSpinnerMode = 'determinate';
  faSave = faSave;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  showVideoPlayer: boolean;
  showPoster: boolean;
  canStoreVideo: boolean;
  progressUpload: number = 0;
  randomNumber: number = 1;
  storage_size_available: string;

  constructor(private _formBuilder: FormBuilder,
              private crudService: CrudService,
              private router: Router,
              private videoService: VideoService,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.User_Channel = x);
    this.videoService.currentVideo.subscribe(video => this.Video = video);
    this.videoService.currentVideoPlayer.subscribe(videoPlayer => this.videoObj = videoPlayer);
    if (this.Video === null || this.Video === undefined) {
      this.activatedRoute.params.subscribe(params => {
        const id = params.id;
        this.crudService.GETWithOutAuth(api.getVideoURL(), id).subscribe(response => {
          const videoFetch: Video = response.video;
          if (videoFetch.channel_id !== this.User_Channel.id)
            this.router.navigate(['/forbidden']).then();
          this.info = this._formBuilder.group({
            title: [videoFetch.title, [Validators.required]],
            description: [videoFetch.description, Validators.required],
            state: [videoFetch.state, Validators.required],
            category: [videoFetch.category, Validators.required],
          });
          this.videoService.UpdateCurrentVideoValue(videoFetch);
          this.videoService.UpdateCurrentVideoPlayerValue({
            id: videoFetch.id,
            poster: api.URL_STORAGE + videoFetch.poster.path,
            video: api.URL_STORAGE + videoFetch.video.path,
            type: videoFetch.type
          });
        });
      });
    } else {
      if (this.Video.channel_id !== this.User_Channel.id)
        this.router.navigate(['/forbidden']).then();
      this.info = this._formBuilder.group({
        title: [this.Video.title, [Validators.required]],
        description: [this.Video.description, Validators.required],
        state: [this.Video.state, Validators.required],
        category: [this.Video.category, Validators.required],
      });
    }
    this.poster = this._formBuilder.group({
      poster: [''],
    });
    this.video_src = this._formBuilder.group({
      video: [''],
      duration: ['']
    });
    this.showVideoPlayer = false;
    this.showPoster = false;
    this.canStoreVideo = false;
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
      this.videoService.checkUpdateVideoSize(this.User_Channel.id, this.Video.id, file.size)
          .subscribe(response => {
            this.canStoreVideo = response.can_store;
            if (this.canStoreVideo) {
              this.videoFile = file;
              document.getElementById('label-video').innerText = event.target.files[0].name;
              this.videoObj.video = window.URL.createObjectURL(file);
              this.videoObj.type = file.type;
              this.videoObj.id = this.randomNumber++;
              this.videoService.UpdateCurrentVideoPlayerValue(this.videoObj);
              setTimeout(() => {
                this.showVideoPlayer = true;
                this.notificationService.showNotification('Info Video', 'Video Listo para ser guardado', 'success');
              }, 300);
            } else {
              this.storage_size_available = fileSize(response.storage_size_available, {round: 2, output: 'string'});
              this.notificationService.showNotification('Video Info',
                  `El video seleccionado sobrepasa su almacenamiento. Disponible ${this.storage_size_available}`, 'warning');
            }
          });
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
      if (!this.info.get('title').pristine && this.info.get('title').value !== '') this.formData.append('title', info.title);
      if (!this.info.get('description').pristine && this.info.get('description').value !== '') this.formData.append('description', info.description);
      if (!this.info.get('state').pristine && this.info.get('state').value !== '') this.formData.append('state', info.state);
      if (!this.info.get('category').pristine && this.info.get('category').value !== '') this.formData.append('category', info.category);
    }
    if (!this.poster.pristine && this.posterFile) {
      this.formData.append('poster', this.posterFile, this.posterFile.name);
    }
    if (!this.video_src.pristine && this.videoFile) {
      this.formData.append('duration', this.video_src.get('duration').value);
      this.formData.append('type', this.videoFile.type);
      this.formData.append('video', this.videoFile, this.videoFile.name);
    }
    if (this.getCanStore())
      this.crudService.POSTForUpdate(api.getVideoURL(), 'video', this.formData, this.Video.id.toString())
          .subscribe((events) => {
            if (events.type === HttpEventType.UploadProgress) {
              this.progressUpload = Math.round(events.loaded / events.total * 100);
              if (this.progressUpload === 100) {
                this.mode = 'indeterminate';
                this.notificationService.showNotification('Info Video', 'Redirección hacia el video', 'success');
              }
            }
            if (events.type === HttpEventType.Response) {
              const video: Video = events.body.video;
              this.videoService.UpdateCurrentVideoValue(null);
              this.videoService.UpdateCurrentVideoPlayerValue(null);
              setTimeout(() => this.router.navigate(['/video/view', video.id]).then(), 2500);
            }
          });
    else
      this.notificationService.showNotification('Video Info',
          !this.canStoreVideo ?
              `El video seleccionado sobrepasa su almacenamiento. Disponible ${this.storage_size_available}` : 'Por Favor Modifique Algún Campo',
          'warning');
  }

  saveVideoPlayer(event: VideoPlayerComponent) {
    this.videoPlayer = event;
  }

  saveDurationVideo(event: number) {
    this.video_src.get('duration').setValue(event);
  }

  catchChangesFromStepper(event: StepperSelectionEvent) {
    if (this.videoPlayer && this.videoPlayer.played) {
      this.videoPlayer.playPause();
    }

    if (event.previouslySelectedIndex === 2 && (!this.video_src.pristine && !this.canStoreVideo)) {
      this.notificationService.showNotification('Video Info',
          this.storage_size_available ?
              `El Video seleccionado sobrepasa su almacenamiento. Disponible ${this.storage_size_available}` :
              'El Video seleccionado no es admisible ', 'warning');
    }
  }

  getCanStore(): boolean {
    return !this.info.pristine || !this.poster.pristine || (!this.video_src.pristine && this.canStoreVideo);
  }
}
