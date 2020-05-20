import {Component, OnInit} from '@angular/core';
import {VideoPlayerComponent} from '../video-player/video-player.component';
import {HttpEventType} from '@angular/common/http';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {CrudService} from 'src/app/services/crud.service';
import {VideoService} from 'src/app/services/video.service';
import {Router, ActivatedRoute} from '@angular/router';
import {VideoPlayer} from 'src/app/models/video-player';
import {faSave, faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {API} from 'src/app/services/API';
import {Video} from 'src/app/models/video';
import {MatSnackBar} from '@angular/material/snack-bar';

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
              private snackBar: MatSnackBar) {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.crudService.GETWithOutAuth(api.getVideoURL(), id).subscribe(response => {
        const videoFetch: Video = response.video;
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
          video: api.URL_STORAGE + videoFetch.video.path
        });
        this.videoService.currentVideo.subscribe(video => this.Video = video);
        this.videoService.currentVideoPlayer.subscribe(videoPlayer => this.videoObj = videoPlayer);
      });
      this.poster = this._formBuilder.group({
        poster: [''],
      });
      this.video_src = this._formBuilder.group({
        video: [''],
        duration: ['']
      });
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
    this.posterFile = file;
    document.getElementById('label-poster-img').innerText = event.target.files[0].name;
    this.videoObj.poster = window.URL.createObjectURL(file);
    this.videoObj.id = this.randomNumber++;
    this.videoService.UpdateCurrentVideoPlayerValue(this.videoObj);
    setTimeout(() => {
      this.showPoster = true;
    }, 300);
  }

  previewVideo(event: any) {
    const file = event.target.files[0];
    this.videoFile = file;
    document.getElementById('label-video').innerText = event.target.files[0].name;
    this.videoObj.video = window.URL.createObjectURL(file);
    this.videoObj.id = this.randomNumber++;
    this.videoService.UpdateCurrentVideoPlayerValue(this.videoObj);
    setTimeout(() => {
      this.showVideoPlayer = true;
    }, 300);
  }

  sendData() {
    if (!this.info.pristine) {
      const info = this.info.value;
      this.formData.append('_method', 'PATCH');
      this.formData.append('title', info.title);
      this.formData.append('description', info.description);
      this.formData.append('state', info.state);
      this.formData.append('category', info.category);
    }
    if (!this.poster.pristine) {
      this.formData.append('poster', this.posterFile, this.posterFile.name);
    }
    if (!this.video_src.pristine) {
      this.formData.append('duration', this.video_src.get('duration').value);
      this.formData.append('video', this.videoFile, this.videoFile.name);
    }
    if (!this.info.pristine || !this.poster.pristine || !this.video_src.pristine)
      this.crudService.POSTForUpdate(api.getVideoURL(), 'video', this.formData, this.Video.id.toString())
        .subscribe((events) => {
          if (events.type === HttpEventType.UploadProgress) {
            this.progressUpload = Math.round(events.loaded / events.total * 100);
          }
          if (events.type === HttpEventType.Response)
            setTimeout(() => this.router.navigate(['/video/view', events.body.video.id]).then(), 750);
        });
    else
      this.snackBar.open('Video Info', 'Por Favor Modifique Algún Campo', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
        panelClass: ['bg-light', 'text-dark', 'font-weight-bold']
      });
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
