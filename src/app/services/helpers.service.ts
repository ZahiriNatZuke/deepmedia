import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {Channel} from '../models/channel';
import {CrudService} from './crud.service';
import {API} from './API';
import {Stats} from '../models/stats';
import {first, retry} from 'rxjs/operators';
import * as fileSize from 'filesize';

const api = new API();

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  URL_STORAGE: string;
  private currentChannelSubject: BehaviorSubject<Channel>;
  private currentStatsChannelSubject: BehaviorSubject<Stats>;
  public currentChannel: Observable<Channel>;
  public currentStatsChannel: Observable<Stats>;

  constructor(private crudService: CrudService) {
    this.currentChannelSubject = new BehaviorSubject<Channel>(null);
    this.currentChannel = this.currentChannelSubject.asObservable();
    this.currentStatsChannelSubject = new BehaviorSubject<Stats>(null);
    this.currentStatsChannel = this.currentStatsChannelSubject.asObservable();
    this.URL_STORAGE = environment.URL_STORAGE;
  }

  public get currentChannelValue(): Channel {
    return this.currentChannelSubject.value;
  }

  public get currentStatsChannelValue(): Stats {
    return this.currentStatsChannelSubject.value;
  }

  GETChannelById(id: string) {
    this.crudService.GETWithOutAuth(api.getChannelURL(), id)
      .pipe(first()).subscribe(response => {
      const channel = response.channel;
      this.currentChannelSubject.next(channel);
      return channel;
    });
  }

  GETStatsOfChannelById(id: string) {
    this.crudService.GETWithOutAuth(api.getStatsChannelURL(), id)
      .pipe(first()).subscribe(response => {
      const stats: Stats = {
        stats: response.stats,
        advanced_stats: response.advanced_stats,
        storage_size: [response.storage_size / 1024 / 1024 / 1024, fileSize(response.storage_size, {
          round: 2,
          output: 'array'
        })]
      };
      this.currentStatsChannelSubject.next(stats);
      return stats;
    });
  }

  GETCountVideoByCategories() {
    return this.crudService.GETWithOutAuth(api.getCountVideoByCategoriesURL())
      .pipe(first());
  }

  UpdateChannel(channel: Channel) {
    this.currentChannelSubject.next(channel);
  }

  UpdateStatsChannel(stats: Stats) {
    this.currentStatsChannelSubject.next(stats);
  }

  getUnknownUserAvatar() {
    return this.URL_STORAGE + '/MjWkc4qXcxodYil5bkGWLqwMHatCZ6N9Vu6j058U.png';
  }
}
