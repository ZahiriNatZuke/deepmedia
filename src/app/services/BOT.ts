import {environment} from '../../environments/environment.prod';
import {HttpHeaders} from '@angular/common/http';

export class BOT {
  public URL_BOT: string;

  constructor() {
    this.URL_BOT = environment.URL_BOT;
  }

  getBugsURL(): string {
    return this.URL_BOT + 'bug';
  }

  getSuggestionsURL(): string {
    return this.URL_BOT + 'sugg';
  }

  getGrantPermissionsURL(): string {
    return this.URL_BOT + 'grant';
  }

  getHeadersWithAuth(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      'X-Authentication-JWT': sessionStorage.getItem('X-Authentication-JWT'),
      'X-Encode-ID': sessionStorage.getItem('X-Encode-ID')
    });
  }
}
