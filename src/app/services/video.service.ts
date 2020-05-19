import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {VideoPlayer} from "../models/video-player";
import {Video} from "../models/video";
import {CrudService} from "./crud.service";
import {API} from "./API";

const api = new API();

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private currentVideoPlayerSubject: BehaviorSubject<VideoPlayer>;
  public currentVideoPlayer: Observable<VideoPlayer>;
  private currentVideoSubject: BehaviorSubject<Video>;
  public currentVideo: Observable<Video>;

  constructor(private crudService: CrudService) {
    this.currentVideoPlayerSubject = new BehaviorSubject<VideoPlayer>(null);
    this.currentVideoPlayer = this.currentVideoPlayerSubject.asObservable();
    this.currentVideoSubject = new BehaviorSubject<Video>(null);
    this.currentVideo = this.currentVideoSubject.asObservable();
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

  fetchVideo(id: string) {
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

}
