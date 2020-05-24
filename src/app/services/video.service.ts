import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {VideoPlayer} from '../models/video-player';
import {Video} from '../models/video';
import {CrudService} from './crud.service';
import {API} from './API';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import * as fileSize from 'filesize';

const api = new API();

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private currentVideoPlayerSubject: BehaviorSubject<VideoPlayer>;
  public currentVideoPlayer: Observable<VideoPlayer>;
  private currentVideoSubject: BehaviorSubject<Video>;
  public currentVideo: Observable<Video>;
  private currentPlayListSubject: BehaviorSubject<Video[]>;
  public currentPlayList: Observable<Video[]>;

  constructor(private crudService: CrudService) {
    this.currentVideoPlayerSubject = new BehaviorSubject<VideoPlayer>(null);
    this.currentVideoPlayer = this.currentVideoPlayerSubject.asObservable();
    this.currentVideoSubject = new BehaviorSubject<Video>(null);
    this.currentVideo = this.currentVideoSubject.asObservable();
    this.currentPlayListSubject = new BehaviorSubject<Video[]>(null);
    this.currentPlayList = this.currentPlayListSubject.asObservable();
  }

  public get GetCurrentVideoPlayerValue(): VideoPlayer {
    return this.currentVideoPlayerSubject.value;
  }

  public UpdateCurrentVideoPlayerValue(videoPlayer: VideoPlayer) {
    this.currentVideoPlayerSubject.next(videoPlayer);
  }

  public get GetCurrentVideoValue(): Video {
    return this.currentVideoSubject.value;
  }

  public UpdateCurrentVideoValue(video: Video) {
    this.currentVideoSubject.next(video);
  }

  public get GetCurrentPlayListValue(): Video[] {
    return this.currentPlayListSubject.value;
  }

  public UpdateCurrentPlayListValue(playList: Video[]) {
    this.currentPlayListSubject.next(playList);
  }

  fetchVideo(id: string) {
    this.currentVideoSubject.next(null);
    this.currentVideoPlayerSubject.next(null);
    this.crudService.GETWithOutAuth(api.getVideoURL(), id).subscribe(response => {
      const video: Video = response.video;
      this.currentVideoSubject.next(video);
      const videoPlayer: VideoPlayer = {
        id: video.id,
        poster: api.URL_STORAGE + video.poster.path,
        video: api.URL_STORAGE + video.video.path
      };
      this.currentVideoPlayerSubject.next(videoPlayer);
    });
  }

  toBottomList(endVideo: Video) {
    const playList = this.GetCurrentPlayListValue;
    moveItemInArray(playList, playList.indexOf(endVideo), playList.length - 1);
    this.UpdateCurrentVideoPlayerValue({
      id: playList[0].id,
      poster: api.URL_STORAGE + playList[0].poster.path,
      video: api.URL_STORAGE + playList[0].video.path
    });
    this.UpdateCurrentVideoValue(playList[0]);
    this.UpdateCurrentPlayListValue(playList);
  }

  checkSize(type: string, size: number): boolean {
    const outputSize = fileSize(size, {round: 2, output: 'array'});
    if (type === 'video')
      return (outputSize[1] === 'MB' && +outputSize[0] <= 300) ? true : outputSize[1] === 'KB';
    else if (type === 'poster' || type === 'avatar')
      return (outputSize[1] === 'MB' && +outputSize[0] <= 10) ? true : outputSize[1] === 'KB';
  }

  checkMimeType(type: string, mime: string): boolean {
    let validMimeType = [];
    if (type === 'video')
      validMimeType = ['video/mp4', 'video/x-matroska', 'video/avi'];
    else if (type === 'poster' || type === 'avatar')
      validMimeType = ['image/jpeg', 'image/png', 'image/gif'];
    return validMimeType.includes(mime);
  }

}
