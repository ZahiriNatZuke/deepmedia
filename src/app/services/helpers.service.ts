import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API} from "./API";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";

const api = new API();

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  URL_STORAGE: string;

  constructor(private httpClient: HttpClient) {
    this.URL_STORAGE = environment.URL_STORAGE;
  }

  getAuthUser(): Observable<any> {
    return new Observable(observer => {
      observer.next(JSON.parse(sessionStorage.getItem('User-Auth')));
    });
  }

  getUnknownUserAvatar() {
    return this.URL_STORAGE + '/MjWkc4qXcxodYil5bkGWLqwMHatCZ6N9Vu6j058U.png';
  }

}
