import {environment} from "../../environments/environment.prod";
import {HttpHeaders} from "@angular/common/http";

export class API {
  public URL_API: string;

  constructor() {
    this.URL_API = environment.URL_API;
  }

  getLoginURL(): string {
    return this.URL_API + 'user/login';
  }

  getLogOutURL(): string {
    return this.URL_API + 'user/logout';
  }

  getRegisterURL(): string {
    return this.URL_API + 'user/register';
  }

  getRefreshJwtURL(): string {
    return this.URL_API + 'user/jwt/refresh';
  }

  getUserURL(): string {
    return this.URL_API + 'user/';
  }

  getVideoURL(): string {
    return this.URL_API + 'video/';
  }

  getStatsVideoByIdURL(): string {
    return this.URL_API + 'video/stats/';
  }

  getVideosByCategoryURL(): string {
    return this.URL_API + 'video/by/';
  }

  getStoreVideoURL(): string {
    return this.URL_API + 'video';
  }

  getCommentURL(): string {
    return this.URL_API + 'comment/';
  }

  getChannelURL(): string {
    return this.URL_API + 'channel/';
  }

  getStatsChannelURL(): string {
    return this.URL_API + 'channel/stats/';
  }

  getLikeURL(): string {
    return this.URL_API + 'like/';
  }

  getFavoriteURL(): string {
    return this.URL_API + 'favorite/';
  }

  getMyfavoritesURL(): string {
    return this.URL_API + 'my_favorites';
  }

  getCountVideoByCategoriesURL(): string {
    return this.URL_API + 'count_video_by_categories';
  }

  getHeadersWithOutAuth(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json'
    });
  }

  getHeadersWithAuth(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      'X-Authentication-JWT': localStorage.getItem('X-Authentication-JWT'),
      'X-Encode-ID': localStorage.getItem('X-Encode-ID')
    });
  }

  getHeadersForLogout(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      'X-Authentication-JWT': localStorage.getItem('X-Authentication-JWT'),
      'X-Encode-ID': localStorage.getItem('X-Encode-ID'),
      'X-Refresh-JWT': localStorage.getItem('X-Refresh-JWT')
    });
  }

  getHeadersForRefreshJWT(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      'X-Refresh-JWT': localStorage.getItem('X-Refresh-JWT')
    });
  }

}
