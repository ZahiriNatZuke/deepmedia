import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {VideoPlayer} from '../models/video-player';
import {Video} from '../models/video';
import {CrudService} from './crud.service';
import {API} from './API';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import * as fileSize from 'filesize';
import {HttpClient} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {VideoPicture} from '../models/video-picture';

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
  private currentVideoPictureSubject: BehaviorSubject<VideoPicture>;
  public currentVideoPicture: Observable<VideoPicture>;

  constructor(private crudService: CrudService, private httpClient: HttpClient) {
    this.currentVideoPlayerSubject = new BehaviorSubject<VideoPlayer>(null);
    this.currentVideoPlayer = this.currentVideoPlayerSubject.asObservable();
    this.currentVideoSubject = new BehaviorSubject<Video>(null);
    this.currentVideo = this.currentVideoSubject.asObservable();
    this.currentPlayListSubject = new BehaviorSubject<Video[]>(null);
    this.currentPlayList = this.currentPlayListSubject.asObservable();
    this.currentVideoPictureSubject = new BehaviorSubject<VideoPicture>(null);
    this.currentVideoPicture = this.currentVideoPictureSubject.asObservable();
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

  public UpdateCurrentVideoPictureValue(videoPicture: VideoPicture) {
    this.currentVideoPictureSubject.next(videoPicture);
  }

  public get GetCurrentVideoPictureValue(): VideoPicture {
    return this.currentVideoPictureSubject.value;
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
        video: api.URL_STORAGE + video.video.path,
        type: video.type
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
      video: api.URL_STORAGE + playList[0].video.path,
      type: playList[0].type
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
      validMimeType = ['video/mp4', 'video/webm', 'video/ogg'];
    else if (type === 'poster' || type === 'avatar')
      validMimeType = ['image/jpeg', 'image/png', 'image/gif'];
    return validMimeType.includes(mime);
  }

  checkVideoInfo(info: any): Observable<any> {
    return this.httpClient.post<any>(api.getCheckNewVideoURL(), info, {headers: api.getHeadersWithAuth()})
        .pipe(first());
  }

  checkNewVideoSize(channel: number, video_size: number): Observable<any> {
    return this.httpClient.post<any>(api.getCheckNewVideoSizeURL() + channel, {video_size}, {
      headers: api.getHeadersWithOutAuth()
    }).pipe(first());
  }

  checkUpdateVideoSize(channel: number, video: number, video_size: number): Observable<any> {
    return this.httpClient.post<any>(api.getCheckUpdateVideoSizeURL(channel, video), {video_size}, {
      headers: api.getHeadersWithOutAuth()
    }).pipe(first());
  }
}
