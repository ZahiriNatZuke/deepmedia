import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {faComment, faEye, faFileDownload, faPlayCircle, faStar, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {Video} from '../../../../../models/video';
import {environment} from '../../../../../../environments/environment.prod';
import {AuthenticationService} from '../../../../../services/authentication.service';
import {Channel} from '../../../../../models/channel';
import {VideoService} from '../../../../../services/video.service';
import {ActivatedRoute} from '@angular/router';
import {CrudService} from '../../../../../services/crud.service';
import {API} from '../../../../../services/API';

const api = new API();

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  User_Channel: Channel;
  playList: Video[] = [];
  URL_STORAGE: string = environment.URL_STORAGE;
  faPlayCircle = faPlayCircle;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faEye = faEye;
  faStar = faStar;
  faFileDownload = faFileDownload;
  loading: boolean;

  drop(event: CdkDragDrop<Video[]>) {
    moveItemInArray(this.playList, event.previousIndex, event.currentIndex);
    this.videoService.UpdateCurrentPlayListValue(this.playList);
  }

  playVideo(video: Video) {
    this.videoService.toBottomList(this.videoService.GetCurrentVideoValue);
    this.videoService.UpdateCurrentVideoPlayerValue({
      id: video.id,
      poster: api.URL_STORAGE + video.poster.path,
      video: api.URL_STORAGE + video.video.path,
      type: video.type
    });
    this.videoService.UpdateCurrentVideoValue(video);
  }

  constructor(private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private videoService: VideoService,
              private crudService: CrudService) {
    this.authenticationService.currentUser.subscribe(x => this.User_Channel = x);
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.crudService.GETWithOutAuth(api.getPlayListURL(), id).subscribe(response => {
        const PlayList: Video[] = response.playlist;
        PlayList.push(this.videoService.GetCurrentVideoValue);
        this.videoService.UpdateCurrentPlayListValue(PlayList);
        this.videoService.currentPlayList.subscribe(playList => this.playList = playList);
        this.loading = false;
      });
    });
  }

  ngOnInit(): void {
  }

  getMaxHeight() {
    return Math.floor(window.screen.availHeight * 64 / 100);
  }

  isFavorite(video: Video): boolean {
    if (this.User_Channel)
      return video.favorite_for_who.map(channel => channel.id).includes(this.User_Channel.id);
    else
      return false;
  }
}
